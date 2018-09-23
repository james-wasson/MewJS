import utils from '../utils';
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
            if (!prop.$hasDep((dep) => typeChecker.isObject(dep) && dep.node === node && dep.attribute === attribute)) {
                var $destroyable = { $destroy() { this.$isDestroyed = true }, $isDestroyed: false };
                prop.$addDep({ $destroyable: $destroyable, node: node, attribute: attribute, $run: performEval});
                self.$destroyable.push($destroyable);
            }
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
    self.$nodes.splice(self.$nodes.indexOf(node), 1, newNode);
    var nodeList = [newNode];

    var addDeps = function(propName, prop) {
        if (typeChecker.isProp(prop)) {
            if (!prop.$hasDep((dep) => typeChecker.isObject(dep) && dep.guid === guid && dep.attribute === 'text')) {
                var destroyable = { $isDestroyed: false, $destroy: function() { this.$isDestroyed = true } }
                prop.$addDep({ $destroyable: destroyable, guid: guid, attribute: 'text', $run: performEval});
                self.$destroyable.push(destroyable)
            }
        }
    }

    var getterFun = GetEvalFunctionInSelf(self, '`'+ text + '`', addDeps);

    var performEval = function() {
        var evalObj = getterFun();

        // remove from self node list
        nodeList.forEach(node => self.$nodes.splice(self.$nodes.indexOf(node), 1));
        var first = nodeList.shift();
        var parentNode = first.parentNode;
        var placeholder = PLACE_HOLDER_COMMENT();

        parentNode.replaceChild(placeholder, first);

        nodeList.forEach(node => parentNode.removeChild(node));
        nodeList = [];
        // reverse because there is no insert after function
        var elements = [...utils.getDocument(evalObj).content.childNodes].reverse();

        if (elements.length > 0) {
            var first = elements.shift();
            parentNode.replaceChild(first, placeholder);
            nodeList = [first];
            self.$nodes.push(first);
            
            elements.forEach(element => {
                parentNode.insertBefore(element, nodeList[nodeList.length - 1]);
                nodeList.push(element);
                self.$nodes.push(first);
            });
        } else {
            nodeList = [placeholder];
        }
    };

    return performEval;
}

function onComponentChange(self, parentNode, componentId, componentNameId, compDescriptions) {
    // remove previous components
    self.$children.$activeComponents = self.$children.$activeComponents.filter(comp => {
        if (comp.$componentId == componentId) {
            parentNode.removeChild(comp.$childNode);
            comp.$component.$destroy();
            return false;
        }
        return true;
    });
    compDescriptions.forEach(description => {
        var component = description.$definition.$create(parentNode);
        self.$children.$activeComponents = self.$children.$activeComponents.concat(transferComponents(component, componentId, componentNameId, description, parentNode));
    });
}

function transferComponents(component, componentId, componentNameId, description, parentNode) {
    var childNodes = [...component.$templateHtml.content.children]; // conversion from htmlNodeList to array
    if (description.$prepend === true)
        childNodes.reverse();
    var accumulator = childNodes.map(child => {
        if (description.$prepend === true) {
            parentNode.prepend(child);
        } else {
            parentNode.appendChild(child);
        }

        return {
            $component: component,
            $parentNode: parentNode,
            $childNode: child,
            $componentId: componentId,
            $componentNameId: componentNameId
        };
    });
    callMountedHooks(component);
    return accumulator;
};

function processHtmlRecursively(self, parentNode) {
    var textNodeSum = ''; // for multiline html generation
    for (var node of parentNode.childNodes) {
        self.$nodes.push(node);
        if (typeChecker.isTextNode(node)) {
            if (node.nodeValue.trim().length > 0) {
                var litRegex = /{{([^}}]+)}}/g;// includes ${} template literal syntax
                var text = textNodeSum + node.nodeValue;
                var found = text.match(litRegex);
                if (found && found.length > 0) {
                    // replaces the matches with template literal syntax
                    for (var f of found) {
                        text = text.replace(f, '$' + f.trim().substr(1, f.length - 2));
                    }
                    self.$_onMounted.push(addInlineTextParser(self, node, text));
                }
            }
        } else if (typeChecker.isElementNode(node)) {
            textNodeSum = ''; // reset the text node summation for multiline html generation
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
                (function(componentNameId) {
                    var destroyableAllComponents = [];
                    addAttributeParser(self, node, "m-comp", "any", function(parentNode, componentNames) {
                        // destroy previous dependancies
                        self.$destroyable = self.$destroyable.filter(p => 
                            destroyableAllComponents.indexOf(p) == -1 && !p.$isDestroyed);
                        destroyableAllComponents.forEach(p => p.$destroy());
                        destroyableAllComponents = []

                        if (!typeChecker.isArray(componentNames)) componentNames = [componentNames];
                        // remove previous components
                        self.$children.$activeComponents = self.$children.$activeComponents.filter(comp => {
                            if (comp.$componentNameId == componentNameId) {
                                parentNode.removeChild(comp.$childNode);
                                comp.$component.$destroy();
                                return false;
                            }
                            return true;
                        });

                        // add new components
                        for (var componentName of componentNames) {
                            if (typeChecker.isString(componentName) && self.$children.$components.hasOwnProperty(componentName)) {
                                var componentProcessor = self.$children.$components[componentName];

                                if (!typeChecker.isArray(componentProcessor)) componentProcessor = [componentProcessor];
                                (function(componentId) {
                                    // add new active componenets for this node
                                    componentProcessor.forEach((processor) => {
                                        var buildComponent = function(compDescriptions) {
                                            onComponentChange(self, parentNode, componentId, componentNameId, compDescriptions);
                                        }
                                        var destroyable = { $isDestroyed: false, $destroy: function() {
                                            this.$isDestroyed = true; 
                                        } }
                                        processor.$addDep({ $destroyable: destroyable, $run: buildComponent });
                                        destroyableAllComponents.push(destroyable);
                                        self.$destroyable.push(destroyable);
                                        
                                        buildComponent(processor.$process());
                                    });
                                }(utils.uuidv4()))

                            } else {
                                console.error('Component "'+componentName+'" not found for node, name must be string: ', parentNode);
                            }
                        }
                    });
                }(utils.uuidv4()))
            }
        }
        processHtmlRecursively(self, node);
    }
}

function processTemplateHtml(html) {
    processHtmlRecursively(this, html.content);
}

export default processTemplateHtml;