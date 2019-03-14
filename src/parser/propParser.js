'use strict';

import isVarName from 'is-var-name';
import utils from '../utils';
import { 
    typeChecker,
    typeSafePropGetter,
} from '../typeManager';
import Prop from '../prop';

function definePropOnSelf(self, prop, value) {
    if (self.hasOwnProperty(prop)) {
        if (typeChecker.isProp(self[prop])) {
            console.warn('Redefinging prop "'+prop+'"');
        } else {
            console.error("Cannot redefine a public Api.");
            return;
        }
    }
    if(!value || !typeChecker.isProp(value)) {
        console.error("Value must be of type prop.");
        return;
    }

    self[prop] = value;
}

/**
 * Creates a list of props based on the inputs
 * Does some proxy mapping to make getting and setting the values easier
 * Values are mapped from the names => prop.value = valuePerName[name] || null
 * Dependencies are mapped from the names => prop.deps = depsPerName[name] || []
 * If value is already prop, just adds to the list and continues
 * @param {Array of Strings | String} names 
 * @param {Object} valuePerName 
 * @param {Object} depsPerName depsPerName[name] can return array or a single element
 * @returns {Object} 
 */
function CreateProps(propDescriptors) {
    if (!typeChecker.isObject(propDescriptors)) {
        console.warn('createProps expects an object as its\' first parameter');
        return {};
    }

    var props = {};
    for (name in propDescriptors) {
        if (propDescriptors.hasOwnProperty(name)) {
            var hasError = false;
            var propDescript = propDescriptors[name];
            if (!typeChecker.isObject(propDescript)) {
                console.warn('Property must be of type object to be processed, Property: ', propDescript);
                hasError = true;
            }
            if (!isVarName(name)) {
                console.error('Prop name must be a valid javascript variable name, Name: ', name);
                hasError = true;
            }
            if (hasError) continue;
            if (typeChecker.isProp(propDescript)) {
                if (typeChecker.isComputedProp(propDescript))
                    props[name] = propDescript.$clone();
                else
                    props[name] = propDescript;
                continue;
            }

            var value = typeChecker.isUndef(propDescript['value']) ? null : propDescript['value'];
            var type = typeSafePropGetter('string', propDescript, 'type', 'any');
            var shouldFreeze = typeSafePropGetter('bool', propDescript, 'freeze', false);

            // adds the prop to the prop array
            props[name] = new Prop(value, type, shouldFreeze);
        }
    }
    
    return props;
}

const PROCESS_PROP_OPTIONS = Object.freeze({
    ARRAY: 0,
    DEFINITION_OBJECT: 1,
    RENAME_OBJECT: 2
});

function propParser(processOption, self, propsObj, scope = {}, propCallback = null) {
    if (typeChecker.isArray(propsObj))
        propsObj = propsObj.slice();
    else if (typeChecker.isObject(propsObj))
        propsObj = Object.assign({}, propsObj);

    switch(processOption) {
        case PROCESS_PROP_OPTIONS.ARRAY:
            if (typeChecker.isArray(propsObj)) {
                for (var prop of propsObj) {
                    if (!typeChecker.isString(prop)) {
                        console.error("Props defined in Array for must be a string.");
                    } else if (!scope.hasOwnProperty(prop)) {
                        console.error('Prop "' + prop +'" definition not found.');
                    } else {
                        definePropOnSelf(self, prop, scope[prop]);
                        if (propCallback) propCallback(self, prop, scope[prop]);
                    }
                }
            } else {
                console.error("Error expected array for props.");
                return false;
            }
        return true;
        case PROCESS_PROP_OPTIONS.DEFINITION_OBJECT:
            if (!typeChecker.isObject(propsObj)) {
                console.error("Props definition must be of type object.");
                return false;
            } else {
                // turns string references into props under different name
                var stringObj = utils.objectFilter(propsObj, (key, value) => typeChecker.isString(value));
                for(var sKey in stringObj) {
                    if (scope.hasOwnProperty(stringObj[sKey])) propsObj[sKey] = scope[stringObj[sKey]];
                    else console.error('Could not find deffinition for "'+stringObj[sKey]+'" to rename as "'+sKey+'"');
                }
                var createdProps = CreateProps(propsObj);
                for(var prop in createdProps) {
                    definePropOnSelf(self, prop, createdProps[prop]);
                    if (propCallback) propCallback(self, prop, createdProps[prop]);
                }
            }
        return true;
        case PROCESS_PROP_OPTIONS.RENAME_OBJECT:
            if (propsObj && typeof propsObj === 'object') {
                for (var prop in propsObj) {
                    if (scope.hasOwnProperty(propsObj[prop])) {
                        var value = scope[propsObj[prop]];
                        definePropOnSelf(self, prop, value);
                        if (propCallback) propCallback(self, prop, value);
                    } else {
                        console.error('Prop "' + propsObj[prop] + '" defined as "'+ prop +'" but definition not found.');
                    }
                }
            } else {
                console.error("Error expected rename object for props.");
                return false;
            }
        return true;
        default:
            throw new Error("ProcessProps option not supported.");
    }
}

export { 
    PROCESS_PROP_OPTIONS, 
    propParser,
};

export default propParser;
