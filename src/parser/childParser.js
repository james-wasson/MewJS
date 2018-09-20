import utils from '../utils';
import { typeChecker } from '../typeManager';
import propParser from './propParser';
import { PROCESS_PROP_OPTIONS } from './propParser';
import { Component } from './parser';

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

class ComponentProcessor {
    constructor(self, descriptor, componentName) {
        this.$self = self;
        this.$className = "ComponentProcessor";
        this.$componentName = componentName;
        this.deps = [];
        if (typeChecker.isComputedProp(descriptor)) {
            this.$descriptor = descriptor.$clone();
            this.$descriptor.$initalize(self);
        } else {
            this.$descriptor = descriptor
        }
    }
    $process() {
        var componentList;
        if (typeChecker.isComputedProp(this.$descriptor)) 
            var componentList = this.$descriptor.$getValue();
        else
            var componentList = this.$descriptor;

        if (!Array.isArray(componentList))
            componentList = [componentList];

        var rvList = [];
        for (var comp of componentList) {
            var rv = {};
            if (!typeChecker.isObject(comp) || typeChecker.isFunction(comp)) {
                console.error('Individual components must either be object or Array of objects');
                continue;
            }
            
            if (comp.hasOwnProperty('definition') && typeChecker.isComponentFactory(comp.definition)) {
                rv.$definition = comp.definition.$clone();
            } else {
                console.error('Component must have definition and it be constructed by component factory, be a function, or a string');
                continue;
            }

            if (comp.hasOwnProperty('props')) {
                if (typeChecker.isArray(comp.props)) {
                    propParser(PROCESS_PROP_OPTIONS.ARRAY, rv, comp.props, Object.assign({}, this.$self.$children, this.$self))
                } else if (typeChecker.isObject(comp.props)) {
                    propParser(PROCESS_PROP_OPTIONS.DEFINITION_OBJECT, rv, comp.props, Object.assign({}, this.$self.$children, this.$self));
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

            var eventNames = Object.keys(this.$self.$listeners).concat(Object.keys(rv.$listeners))
                                .filter((value, index, arry) => arry.indexOf(value) === index); // get unique
            var providedListeners = {};
            for (var eventName of eventNames) {
                providedListeners[eventName] = [];
                if (rv.$listeners[eventName]) providedListeners[eventName].push(rv.$listeners[eventName]);
                if (this.$self.$listeners[eventName]) providedListeners[eventName].push(this.$self.$listeners[eventName]);
            }

            var props = utils.objectFilter(Object.assign({}, rv, this.$self.$children), (key, value) => typeChecker.isProp(value));
            for (var pName in props) // i'm not sure where else to do this initalization
                if (typeChecker.isComputedProp(props[pName])) 
                    props[pName].$initalize(this.$self);
            rv.$definition.$addScope(this.$componentName, {
                $props: props,
                $parent: this.$self,
                $listeners: providedListeners                        
            });

            rvList.push(rv);
        }
        return rvList;
    }

    $addDep(dep) {
        if (typeChecker.isComputedProp(this.$descriptor)) {
            var self = this;
            this.$descriptor.$addDep({ $destroyable: dep.$destroyable, $run: function() { dep.$run(self.$process()) } });
        }
    }

    $destroy() {
        this.$isDestroyed = true;
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
                    var componentDef = components[componentName];
                    if (!typeChecker.isComputedProp(componentDef) && !typeChecker.isArray(componentDef) && !typeChecker.isObject(componentDef)) {
                        console.error('Components must either be of type array, object, or a computed property.');
                        continue;
                    }
                    if (!self.$children.$components[componentName]) self.$children.$components[componentName] = [];
                    self.$children.$components[componentName].push(new ComponentProcessor(self, componentDef, componentName));
                }
            }
        }
    }
}

export default processChildren;
