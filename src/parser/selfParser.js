import utils from './utils';
import { typeChecker } from '../typeManager';
import propParser from './propParser';
import { PROCESS_PROP_OPTIONS } from './propParser';

var getDocument = function(html) {
    var doc = document.createElement('template');
    doc.innerHTML = html;
    return doc;
}


function processSelf(selfDef) {
    if (selfDef.hasOwnProperty('props')) {
        propParser(PROCESS_PROP_OPTIONS.DEFINITION_OBJECT, this, selfDef.props, this)
    }

    if (selfDef.hasOwnProperty('template')) {
        if (typeChecker.isString(selfDef.template)) {
            this.$template = selfDef.template;

            this.$templateHtml = getDocument(this.$template);
        } else {
            console.error('template must be of type "string"');
        }
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
                    } else if (!typeChecker.isPropObj(this[propName])) {
                        console.error('Cannot watch "'+propName+'" because it is not a processed prop.');                        
                    } else {
                        var watchFun = watchers[propName];
                        watchFun = watchFun.bind(this);
                        this[propName].$addDep(watchFun);
                        this.$watchers[propName] = {
                            $dependancy: watchFun,
                            $prop: this[propName]
                        }
                    }
                }
            }
        }
    }
}

export default processSelf;
