import utils from './utils';
import { typeChecker } from '../typeManager';
import { removeStyle, addStyle, setProperty, addClass, removeClass } from '../htmlPropertyManager';
import ProxyContext from '../proxyContext';

class GetRecorder {
    constructor(value, propName, onGet) {
        var self = this;

        this.value = value;
        this.onGet = typeChecker.isFunction(onGet) ? onGet : null;
        this.propName = propName;

        this.$className = 'GetRecorder'; // helps the type checker

        var baseValue = this.$getValue();

        if (typeChecker.isFunction(baseValue)) {
            return new Proxy(baseValue, {
                apply: (target, thisArg, argumentsList) => {
                    self.onGet();
                    return target.apply(thisArg || self, argumentsList);
                },
                $getValue: (getPropValue) => self.$getValue(getPropValue),
                $setValue: (value) => self.$setValue(value),
                $className: 'GetRecorder' // helps the type checker
            });
        } else if (typeChecker.isObject(baseValue)) {
            return new Proxy(this, {
                get: (obj, prop) => {
                    obj.onGet();
                    return obj.$getValue()[prop];
                },
                set: (obj, prop, value) => {
                    obj.$setValue(value)[prop];
                },
                $getValue: (getPropValue) => self.$getValue(getPropValue),
                $setValue: (value) => self.$setValue(value),
                $className: 'GetRecorder' // helps the type checker
            });
        }
    }

    $getValue(getPropValue) {
        if (getPropValue !== false && typeChecker.isPropObj(this.value))
            return this.value.$getValue();
        return this.value;
    }

    $setValue(value) {
        if (typeChecker.isPropObj(this.value)) {
            this.value.$setValue(value);
        } else {
            this.value = value;
        }
    }

    [Symbol.toPrimitive]() {
        this.onGet();
        return this.$getValue();
    }

    valueOf() {
        this.onGet();
        return this.$getValue();
    }
}

function GetEvalFunctionInSelf(self, evalScript, onGet) {
    self = Object.assign({},self);
    // we must maintain a sorted array in this case
    var keys = Object.keys(self); 
    keys.sort();

    self = ProxyContext(self);
    var evalFun = Function.apply(null, keys.concat(['"use strict";\nreturn ('+evalScript+');']));

    return function(self, keys, evalFun) {
        var orderedValues = keys.map(k => {
            if (self.$props(k)) 
                return new GetRecorder(self.$props(k), k, (function(propName, prop, onGet) { onGet(propName, prop); }).bind(self, k, self.$props(k), onGet));
            return self[k];
        });

        return evalFun.apply(null, orderedValues);
    }.bind(null, self, keys, evalFun)
}

function convertToActualParserValue(value, addDeps) {
    if (typeChecker.isGetRecorderObj(value)) {
        var valueOfWrapper = value.$getValue(false);
        // if it is a prop we need to be watching it
        if (typeChecker.isPropObj(valueOfWrapper)) {
            addDeps(value.propName, valueOfWrapper);
            return valueOfWrapper.$getValue();
        } else { // else just perform the action because it is a static object
            return valueOfWrapper;
        }
    } else {
        return value; 
    }
} 

function attributeObjectParser(evalObj, addDeps, performAction, node, attribute) {
    if (typeChecker.isObject(evalObj)) {
        for (var key in evalObj) {
            if (evalObj.hasOwnProperty(key)) {
                var value = convertToActualParserValue(evalObj[key], addDeps);
                performAction(node, key, value, attribute);
            }
        }
    } else if (!typeChecker.isUndef(evalObj, true)) {
        console.error(attribute + " is returning something other than object undefined or null on node: ", node);
    }
}

function attributeBoolParser(evalObj, addDeps, performAction, node, attribute) {
    var value = convertToActualParserValue(evalObj, addDeps);
    if (value) {
        performAction(node, true, attribute);
    } else {
        performAction(node, false, attribute);
    }
}

function attributeStringParser(evalObj, addDeps, performAction, node, attribute) {
    var value = convertToActualParserValue(evalObj, addDeps);
    if (typeChecker.isString(value)) {
        performAction(node, value, attribute);
    } else {
        console.error(attribute + " is returning sometthing other than type 'string' on node: ", node);
    }
}

function addAttributeParser(self, node, attribute, evalType, performAction) {
    (function(self, node) {
        var addDeps = function(propName, prop) {
            if (!prop.$hasDep((dep) => typeChecker.isObject(dep) && dep.node === node && dep.attribute === attribute))
                prop.$addDep({ node: node, attribute: attribute, $run: performEval});
        }

        var getterFun = GetEvalFunctionInSelf(self, node.getAttribute(attribute), addDeps);
        node.removeAttribute(attribute); // clean up after ourselves

        var performEval = function() {
            var evalObj = getterFun();
            switch(evalType.toLowerCase()) {
                case "object":
                    return attributeObjectParser(evalObj, addDeps, performAction, node, attribute);
                case "bool":
                case "boolean":
                    return attributeBoolParser(evalObj, addDeps, performAction, node, attribute);
                case "string":
                    return attributeStringParser(evalObj, addDeps, performAction, node, attribute);
            }
        };
        performEval();
    }(self, node))
}

function processHtmlRecursively(self, parentNode) {
    for (var node of parentNode.childNodes) {
        if (typeChecker.isTextNode(node)) {
            //console.log(node) TEXT NODES GO HERE
        } else {
            if (node.getAttribute("m-bind:class")) {
                addAttributeParser(self, node, "m-bind:class", "object", function(node, className, value) {
                    if (value) addClass(node, className);
                    else removeClass(node, className);
                });

            }
            if (node.getAttribute("m-bind:style")) {
                addAttributeParser(self, node, "m-bind:style", "object", function(node, styleName, styleValue) {
                    if (typeChecker.isString(styleValue) && styleValue.length > 0) 
                        addStyle(node, styleName, styleValue);
                    else 
                        removeStyle(node, styleName);
                });
            }
            // must come after m-bind:style so it can override if needed
            if (node.getAttribute("m-show")) {
                addAttributeParser(self, node, "m-show", "bool", function(node, shouldShow) {
                    if (shouldShow) 
                        removeStyle(node, "display");
                    else
                        addStyle(node, "display", "none");
                });
            }

            if (node.getAttribute("m-on")) {
                addAttributeParser(self, node, "m-on", "object", function(node, eventName, fun) {
                    if (typeChecker.isFunction(fun)) {
                        if (!self.$htmlEvents[node]) self.$htmlEvents[node] = [];
                        if (!self.$htmlEvents[node].some(p => p.eventName === eventName && p.action === fun)) {
                            self.$htmlEvents[node].push({
                                eventName: eventName,
                                node: node,
                                action: fun
                            });
                            node.addEventListener(eventName, fun);
                        }
                    } else {
                        console.error("m-on events expect type of function as return value for an event");
                    }
                });
            }

            if (node.getAttribute("m-comp")) {
                addAttributeParser(self, node, "m-comp", "string", function(node, componentName) {
                    if (self.$children.$components.hasOwnProperty(componentName)) {
                        var components = self.$children.$components[componentName];
                        components.forEach(compDescription => {
                            var comp = compDescription.$definition.$create();
                            node.appendChild(comp.$templateHtml.content)
                        });
                    } else {
                        console.error('Component "'+componentName+'" not found for node: ', node);
                    }
                });
            }
        }
        processHtmlRecursively(self, node);
    }
}

function processTemplateHtml() {
    if (!this.$templateHtml && this.$templateHtml.content) return;
    if (!typeChecker.isElementNode(this.$templateHtml)) {
        console.error("Cannot parse templates html if not a dom element.");
        return;
    }

    processHtmlRecursively(this, this.$templateHtml.content);
}

export default processTemplateHtml;