import { typeChecker } from './typeManager';

/**
 * Returns a proxy for handling getting and setting props
 * This function also handles special props that start with '$'
 * @param {Object} props
 * @returns {Object} Proxy object
 */
function ProxyContext(context) {
    for (var $openApi in $openApis) {
        if (context.hasOwnProperty($openApi)) console.error('Cannot use an api specific property name "'+$openApi+'", refer to the docs.');
        context[$openApi] = $openApis[$openApi];
    }
    // returns a proxy to make getting and setting the values easier
    return new Proxy(context, {
        get: (props, prop, receiver) => {
            if (typeChecker.isUndef(props[prop])) {
                console.warn('Property "' + prop + '" does not exist on object. Cannot get value.');
                return;
            }

            if (typeChecker.isFunction(props[prop])) 
                return props[prop].bind(props);

            if (typeChecker.isPropObj(props[prop]))
                return props[prop].$getValue();

            return props[prop];
        },
        set: (props, prop, value) => {
            if (typeChecker.isUndef(props[prop])) {
                console.warn('Property "' + prop + '" does not exist on object. Cannot set value.');
                return;
            }
            if (typeChecker.isPropObj(props[prop])) {
                props[prop].$setValue(value);
            } else {
                console.error('Can only set value for type of prop.');
            }
        }
    });
}

var $openApis = {
    /**
     * Removes all dependencies from a prop
     * this -> props object
     * @param {String} prop property to add deps to
     */
    $forceDepsUpdate: function (prop) {
        if (typeChecker.isPropObj(this[prop])) 
            this[prop].$runDepsUpdate();
    },
    // Exposes the raw prop within a wrapped object
    $props: function(prop) {
        if (typeChecker.isPropObj(this[prop])) 
            return this[prop];
        return null;
    }
};

export default ProxyContext;