'use strict';

import {
    typeChecker,
} from '../typeManager';
import {
    propParser,
    PROCESS_PROP_OPTIONS,
} from './propParser';
import Prop from '../prop';

function freezePropOnSelf(self, prop) {
    if (!typeChecker.isProp(self[prop])) {
        console.error('Cannot freeze prop that is not constructed by "Prop"');
        return;
    }
    self[prop] = new Prop(self[prop], 'prop', true);
}

function parentParser(self, parentDef, parentScopeAccess) {
    if (!typeChecker.isObject(parentDef)) {
        console.error("Malformed parent object.");
        return;
    }

    if (!typeChecker.isObject(parentScopeAccess)) return;

    // parsse the props object
    if (parentDef.hasOwnProperty('props')) {
        if (typeChecker.isObject(parentScopeAccess.$props)) {
            var props = parentDef.props;
            if (Array.isArray(props)) {
                propParser(PROCESS_PROP_OPTIONS.ARRAY, self, props, parentScopeAccess.$props, function(self, prop) {
                    self.$inheritedProps.push(prop);
                    freezePropOnSelf(self, prop);
                });
            } else if (typeof props === 'object') {
                propParser(PROCESS_PROP_OPTIONS.RENAME_OBJECT, self, props, parentScopeAccess.$props, function(self, prop) { 
                    self.$inheritedProps.push(prop);
                    freezePropOnSelf(self, prop);
                });
            } else {
                console.error('Props on parent must be of type "object".')
            }
        } else {
            console.error('Cannot inherit props from null parent props.');
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
                    self.$emit[eventName] =  (function(self, listeners){
                        var rv = function() {
                            for(var listener of listeners) {
                                if (typeChecker.isFunction(listener)) {
                                    listener.apply(self.$parent.$proxy, arguments);
                                } else {
                                    console.error('Listener is not of type "function"')
                                }
                            }
                        };
                        rv.eventName = eventName;
                        return rv;
                    })(self, listeners);
                }
            }
        } else {
            console.error('Emit defined on parent must be array.');
        }
    }

    if (hasParentScope && typeChecker.isComponent(parentScopeAccess.$parent)) {
        self.$parent = parentScopeAccess.$parent;
    }
}

export {
    parentParser,
};

export default parentParser;
