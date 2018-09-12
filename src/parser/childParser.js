import utils from './utils';
import { typeChecker } from '../typeManager';
import propParser from './propParser';
import { PROCESS_PROP_OPTIONS } from './propParser';

function processListener(listeners, callBack) {
    if (!listeners || typeof listeners !== 'object') {
        console.error('Listeners on child must be in form of object.')
    } else {
        for (var eventName in listeners) {
            if (listeners.hasOwnProperty(eventName)) {
                if (typeof listeners[eventName] !== 'function') {
                    console.error('Listeners bound to an event must be of type "function"')
                } else {
                    callBack(eventName, listeners[eventName]);
                }
            }
        }
    }
}

function processChildren(childrenDef) {
    if (!childrenDef || typeof childrenDef !== 'object') {
        console.error("Malformed children object.");
        return;
    }

    if (childrenDef.hasOwnProperty('props')) {
        if (Array.isArray(childrenDef.props)) {
            propParser(PROCESS_PROP_OPTIONS.ARRAY, this.$children, childrenDef.props, this)
        } else if (childrenDef.props && typeof childrenDef.props === 'object') {
            propParser(PROCESS_PROP_OPTIONS.DEFINITION_OBJECT, this.$children, childrenDef.props, this)
        } else {
            console.error('Child props must be of type Array or Object');
        }
    }

    this.$listeners = {};
    if (childrenDef.hasOwnProperty('listeners')) {
        processListener(childrenDef.listeners, (eventName, eventHandler) => this.$listeners[eventName] = eventHandler);
    }

    if (childrenDef.hasOwnProperty('components')) {
        if (!childrenDef.components || typeof childrenDef.components !== 'object') {
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
                            rv.$definition = comp.definition;
                        } else {
                            console.error('Component must have definition and it be constructed by component factory');
                            continue;
                        }

                        if (comp.hasOwnProperty('props')) {
                            if (Array.isArray(comp.props)) {
                                propParser(PROCESS_PROP_OPTIONS.ARRAY, rv, comp.props, Object.assign({}, this.$children, this))
                            } else if (typeof comp.props === 'object') {
                                propParser(PROCESS_PROP_OPTIONS.DEFINITION_OBJECT, rv, comp.props, Object.assign({}, this.$children, this));
                            } else {
                                console.error('Props on component expected to be of type "object" or an array');
                            }
                        }

                        rv.$listeners = {};
                        if (comp.hasOwnProperty('listeners')) {
                            processListener(comp.listeners, (eventName, eventHandler) => rv.$listeners[eventName] = eventHandler);
                        }

                        var eventNames = Object.keys(this.$listeners).concat(Object.keys(rv.$listeners))
                                            .filter((value, index, self) => self.indexOf(value) === index); // get unique
                        var providedListeners = {};
                        for (var eventName of eventNames) {
                            providedListeners[eventName] = [];
                            if (rv.$listeners[eventName]) providedListeners[eventName].push(rv.$listeners[eventName]);
                            if (this.$listeners[eventName]) providedListeners[eventName].push(this.$listeners[eventName]);
                        }
                        
                        rv.$definition.$create = rv.$definition.$create.bind(rv.$definition, {
                            $props: utils.objectFilter(Object.assign({}, rv, this.$children, this), (key, value) => typeChecker.isPropObj(value)),
                            $parent: this,
                            $listeners: providedListeners                        
                        });

                        if (!this.$children.$components[componentName])
                            this.$children.$components[componentName] = []
                        this.$children.$components[componentName].push(rv);
                    }
                }
            }
        }
    }
}

export default processChildren;
