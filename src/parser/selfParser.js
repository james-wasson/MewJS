'use strict';

import {
    typeChecker,
} from '../typeManager';
import {
    propParser,
    PROCESS_PROP_OPTIONS,
} from './propParser';

function selfParser(selfDef) {
    if (selfDef.hasOwnProperty('props')) {
        propParser(PROCESS_PROP_OPTIONS.DEFINITION_OBJECT, this, selfDef.props, this)
    }

    if (selfDef.hasOwnProperty('watchers')) {
        if (!typeChecker.isObject(selfDef.watchers)) {
            console.error('watchers must be of type "object"');
        } else {
            var watchers = selfDef.watchers;
            for (var propName in watchers) {
                if (watchers.hasOwnProperty(propName)) {
                    if (!typeChecker.isFunction(watchers[propName])) {
                        console.error('Watcher must be of type "function".');
                    } else if (!typeChecker.isProp(this[propName])) {
                        console.error('Cannot watch "'+propName+'" because it is not a processed prop.');                        
                    } else {
                        var watchFun = watchers[propName];
                        watchFun = watchFun.bind(this.$proxy);
                        var $destroyable = { $isDestroyed: false, $destroy: function() { this.$isDestroyed = true; } };
                        this[propName].$addDep({ $destroyable: $destroyable, $run: watchFun });
                        this.$destroyable.push($destroyable);
                        this.$watchers[propName] = {
                            $onchange: watchFun,
                            $prop: this[propName]
                        }
                    }
                }
            }
        }
    }
}

export {
    selfParser,
};

export default selfParser;
