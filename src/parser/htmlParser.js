import utils from './utils';
import { typeChecker } from '../typeManager';
import { removeStyle, addStyle, setProperty, addClass, removeClass } from '../htmlPropertyManager';
import { GetEvalFunctionInSelf } from '../getRecorder';
import { callMountedHooks } from '../callHooks';

function attributeObjectParser(evalObj, performAction, node, attribute) {
    if (typeChecker.isObject(evalObj)) {
        for (var key in evalObj) {
            if (evalObj.hasOwnProperty(key)) {
                performAction(node, key, evalObj[key], attribute);
            }
        }
    } else if (!typeChecker.isUndef(evalObj, true)) {
        console.error('Attribute: "' + attribute + '" is returning something other than object undefined or null on node: ', node);
    }
}

function attributeBoolParser(evalObj, performAction, node, attribute) {
    if (evalObj) {
        return performAction(node, true, attribute);
    } else {
        return performAction(node, false, attribute);
    }
}

function attributeStringParser(evalObj, performAction, node, attribute) {
    if (typeChecker.isString(evalObj)) {
        return performAction(node, evalObj, attribute);
    } else {
        console.error(attribute + " is returning sometthing other than type 'string' on node: ", node);
    }
}

function addAttributeParser(self, node, attribute, evalType, performAction) {
    var addDeps = function(propName, prop) {
        if (typeChecker.isProp(prop)) {
            if (!prop.$hasDep((dep) => typeChecker.isObject(dep) && dep.node === node && dep.attribute === attribute))
                prop.$addDep({ node: node, attribute: attribute, $run: performEval});
        }
    }

    var getterFun = GetEvalFunctionInSelf(self, node.getAttribute(attribute), addDeps);
    node.removeAttribute(attribute); // clean up after ourselves

    var performEval = function() {
        var evalObj = getterFun();
        switch(evalType.toLowerCase()) {
            case "object":
                return attributeObjectParser(evalObj, performAction, node, attribute);
            case "bool":
            case "boolean":
                return attributeBoolParser(evalObj, performAction, node, attribute);
            case "string":
                return attributeStringParser(evalObj, performAction, node, attribute);
            case "any":
                return performAction(node, evalObj, attribute);
        }
    };
    performEval();
}

function stringParser(evalObj, performAction, node) {
    if (typeChecker.isString(evalObj)) {
        performAction(node, evalObj);
    } else {
        console.error('Template: "'+evalObj+'" is returning sometthing other than type "string" on node: ', node);
    }
}

var PLACE_HOLDER_COMMENT = () => utils.getDocument('<!-----   -----!>').content.childNodes[0];
function addInlineTextParser(self, node, text) {
    var guid = utils.uuidv4();
    var newNode = utils.getDocument('<span m-text-render-'+guid+'></span>').content.childNodes[0];
    node.parentNode.replaceChild(newNode, node);
    var nodeList = [newNode];
    var addDeps = function(propName, prop) {
        if (typeChecker.isProp(prop)) {
            if (!prop.$hasDep((dep) => typeChecker.isObject(dep) && dep.guid === guid && dep.attribute === 'text'))
                prop.$addDep({ guid: guid, attribute: 'text', $run: performEval});
        }
    }

    var getterFun = GetEvalFunctionInSelf(self, '`'+ text + '`', addDeps);

    var performEval = function() {
        var evalObj = getterFun();
        var first = nodeList.shift();
        var parentNode = first.parentNode;
        var placeholder = PLACE_HOLDER_COMMENT();
        parentNode.replaceChild(placeholder, first);
        nodeList.forEach(node => parentNode.removeChild(node));
        nodeList = [];
        // reverse because there is no insert after function
        var elements = [...utils.getDocument(evalObj).content.childNodes].reverse();

        if (elements.length > 1) {
            var first = elements.shift();
            parentNode.replaceChild(first, placeholder);
            nodeList = [first];
            elements.forEach(element => {
                parentNode.insertBefore(element, nodeList[nodeList.length - 1]);
                nodeList.push(element);
            });
        } else {
            nodeList = [placeholder];
        }
    };

    return performEval;
}

function processHtmlRecursively(self, parentNode) {
    for (var node of parentNode.childNodes) {
        self.$nodes.push(node);
        if (typeChecker.isTextNode(node)) {
            var litRegex = /{{([^}}]+)}}/g;// includes ${} template literal syntax
            var text = node.nodeValue;
            var found = text.match(litRegex);
            if (found && found.length > 0) {
                // replaces the matches with template literal syntax
                for (var f of found) {
                    text = text.replace(f, '$' + f.trim().substr(1, f.length - 2));
                }
                self.$_onMounted.push(addInlineTextParser(self, node, text));
            }
        } else if (typeChecker.isElementNode(node)) {
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
                        if (!self.$htmlEvents[node].some(p => p.eventName === eventName && (p.action === fun || p.action.toString() === fun.toString()))) {
                            self.$htmlEvents[node].push({
                                eventName: eventName,
                                node: node,
                                action: fun
                            });
                            node.addEventListener(eventName, fun.bind(self.$proxy));
                        }
                    } else {
                        console.error("m-on events expect type of function as return value for an event");
                    }
                });
            }

            if (node.getAttribute("m-comp")) {
                addAttributeParser(self, node, "m-comp", "any", function(node, componentNames) {
                    // remove previous active components for this node
                    self.$children.$activeComponents = self.$children.$activeComponents.filter(active => {
                        if (active.$parentNode === node) {
                            node.removeChild(active.$childNode); // remove the component node
                            return false; // filter the $activeComponent out
                        }
                        return true;
                    });
                    if (!typeChecker.isArray(componentNames)) componentNames = [componentNames];
                    for (var componentName of componentNames) {
                        if (typeChecker.isString(componentName) && self.$children.$components.hasOwnProperty(componentName)) {
                            var components = self.$children.$components[componentName];

                            if (!typeChecker.isArray(components)) components = [components];
                            // add new active componenets for this node
                            self.$children.$activeComponents = self.$children.$activeComponents.concat(
                                components.reduce((accumulator, compDescription) => {
                                    var comp = compDescription.$definition.$create(node);
                                    var childNodes = [...comp.$templateHtml.content.children]; // conversion from htmlNodeList to array
                                    accumulator = accumulator.concat(childNodes.map(child => {
                                        if (compDescription.$prepend === true) {
                                            node.prepend(child);
                                        } else {
                                            node.appendChild(child);
                                        }

                                        return {
                                            $component: comp,
                                            $parentNode: node,
                                            $childNode: child
                                        };
                                    }));
                                    callMountedHooks(comp);
                                    return accumulator;
                                }, [])
                            );
                        } else {
                            console.error('Component "'+componentName+'" not found for node: ', node);
                        }
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