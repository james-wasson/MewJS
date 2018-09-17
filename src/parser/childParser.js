import utils from './utils';
import { typeChecker } from '../typeManager';
import propParser from './propParser';
import { PROCESS_PROP_OPTIONS } from './propParser';

function processListener(listeners, callBack) {
    if (!typeChecker.isObject(listeners)) {
        console.error('Listeners on child must be in form of object.')
    } else {
        for (var eventName in listeners) {
            if (listeners.hasOwnProperty(eventName)) {
                if (!typeChecker.isFunction(listeners[eventName])) {
                    console.error('Listeners bound to an event must be of type "function"')
                } else {
                    callBack(eventName, listeners[eventName]);
                }
            }
        }
    }
}

function processChildren(self, childrenDef) {
    if (!typeChecker.isObject(childrenDef)) {
        console.error("Malformed children object.");
        return;
    }

    if (childrenDef.hasOwnProperty('props')) {
        if (Array.isArray(childrenDef.props)) {
            propParser(PROCESS_PROP_OPTIONS.ARRAY, self.$children, childrenDef.props, self)
        } else if (typeChecker.isObject(childrenDef.props)) {
            propParser(PROCESS_PROP_OPTIONS.DEFINITION_OBJECT, self.$children, childrenDef.props, self)
        } else {
            console.error('Child props must be of type Array or Object');
        }
    }

    if (childrenDef.hasOwnProperty('listeners')) {
        processListener(childrenDef.listeners, (eventName, eventHandler) => self.$listeners[eventName] = eventHandler);
    }

    if (childrenDef.hasOwnProperty('components')) {
        if (!typeChecker.isObject(childrenDef.components)) {
            console.error('components on children must be in form of object.');
        } else {
            var components = childrenDef.components;
            for (var componentName in components) {
                if (components.hasOwnProperty(componentName)) {
                    var compList = components[componentName];
                    if (!Array.isArray(compList))
                         compList = [compList];
                    for (var comp of compList) {
                        var rv = {};
                        if (!typeChecker.isObject(comp)) {
                            console.error('Individual components must either be object or Array of objects');
                            continue;
                        }
                        
                        if (comp.hasOwnProperty('definition') && typeChecker.isComponentFactory(comp.definition)) {
                            rv.$definition = comp.definition.$clone();
                        } else {
                            console.error('Component must have definition and it be constructed by component factory');
                            continue;
                        }

                        if (comp.hasOwnProperty('props')) {
                            if (Array.isArray(comp.props)) {
                                propParser(PROCESS_PROP_OPTIONS.ARRAY, rv, comp.props, Object.assign({}, self.$children, self))
                            } else if (typeChecker.isObject(comp.props)) {
                                propParser(PROCESS_PROP_OPTIONS.DEFINITION_OBJECT, rv, comp.props, Object.assign({}, self.$children, self));
                            } else {
                                console.error('Props on component expected to be of type "object" or an array');
                            }
                        }

                        rv.$listeners = {};
                        if (comp.hasOwnProperty('listeners')) {
                            processListener(comp.listeners, (eventName, eventHandler) => rv.$listeners[eventName] = eventHandler);
                        }

                        rv.$prepend = false;
                        if (comp.hasOwnProperty('prepend')) {
                            rv.$prepend = typeChecker.isBool(comp.prepend) ? comp.prepend : false;
                        }

                        var eventNames = Object.keys(self.$listeners).concat(Object.keys(rv.$listeners))
                                            .filter((value, index, self) => self.indexOf(value) === index); // get unique
                        var providedListeners = {};
                        for (var eventName of eventNames) {
                            providedListeners[eventName] = [];
                            if (rv.$listeners[eventName]) providedListeners[eventName].push(rv.$listeners[eventName]);
                            if (self.$listeners[eventName]) providedListeners[eventName].push(self.$listeners[eventName]);
                        }

                        rv.$definition.$addScope(componentName, { // leave null so we can pass the element
                            $props: utils.objectFilter(Object.assign({}, rv, self.$children, self), (key, value) => typeChecker.isProp(value)),
                            $parent: self,
                            $listeners: providedListeners                        
                        });

                        if (!self.$children.$components[componentName])
                            self.$children.$components[componentName] = []
                        self.$children.$components[componentName].push(rv);
                    }
                }
            }
        }
    }
}

export default processChildren;
