import utils from './utils';
import { typeChecker } from '../typeManager';
import propParser from './propParser';
import { PROCESS_PROP_OPTIONS } from './propParser';
import Prop from '../prop';

function freezePropOnSelf(self, prop) {
    if (!typeChecker.isPropObj(self[prop])) {
        console.error('Cannot freeze prop that is not constructed by "Prop"');
        return;
    }
    self[prop] = new Prop(self[prop], 'prop', true);
}

function processParent(parentDef, parentScopeAccess) {
    if (!parentDef || typeof parentDef !== 'object') {
        console.error("Malformed parent object.");
        return;
    }
    var parentScopeIsGood = parentScopeAccess && typeof parentScopeAccess === 'object';
    // pasrse the props object
    if (parentDef.hasOwnProperty('props')) {
        if (!parentScopeIsGood || !parentScopeAccess.$props || typeof parentScopeAccess.$props !== 'object') {
            console.error('Cannot inherit props from null parent props.');
        } else {
            var props = parentDef.props;
            if (Array.isArray(props)) {
                propParser(PROCESS_PROP_OPTIONS.ARRAY, this, props, parentScopeAccess.$props, function(self, prop) {
                    self.$inheritedProps.push(prop);
                    freezePropOnSelf(self, prop);
                })
            } else if (typeof props === 'object') {
                propParser(PROCESS_PROP_OPTIONS.RENAME_OBJECT, this, props, parentScopeAccess.$props, function(self, prop) { 
                    self.$inheritedProps.push(prop);
                    freezePropOnSelf(self, prop);
                })
            } else {
                console.error('Props on parent must be of type "object".')
            }
        }
    }

    if (parentDef.hasOwnProperty('slots')) {
        if (Array.isArray(parentDef.slots)) {
            console.error('slots on parent must be array of strings.')
        } else {
            for (var slot of parentDef.slots) {
                if (typeof slot !== 'string')
                    console.error('Only strings are allowed in slot array values.');
                else if (!parentScope.$slots || typeof parentScope.$slots !== 'object' || !parentScope.$slots[slot]) {
                    console.error('Slot "'+slot+'" doesn\' exist on parent');
                } else {
                    this.$slots[slot] = parentScope.$slots[slot];
                }
            }
        }
    }

    if (parentDef.hasOwnProperty('emit')) {
        if (Array.isArray(parentDef.emit)) {
            for(var eventName of parentDef.emit) {
                if (typeof eventName !== 'string') {
                    console.error('Each element in emit array must be string.');
                } else {
                    if (!parentScopeAccess.$listeners) parentScopeAccess.$listeners = {};
                    var listeners = parentScopeAccess.$listeners[eventName] || [];
                    this.$emit[eventName] =  (function(listeners, eventName){
                        var rv = function() {
                            for(var listener of listeners) {
                                if (typeof listener === 'function')
                                    listener.apply(arguments);
                                else
                                    console.error('Listener is not of type "function"')
                            }
                        };
                        rv.eventName = eventName;
                        return rv;
                    }.bind(this)(listeners, eventName));
                }
            }
        } else {
            console.error('Emit defined on parent must be array.');
        }
    }

    if (parentScopeAccess && parentScopeAccess.hasOwnProperty('$parent') && typeChecker.isComponentObj(parentScopeAccess.$parent)) {
        this.$parent = parentScopeAccess.$parent;
    }
}

export default processParent;
