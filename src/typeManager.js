'use strict';
function createTypeChecker(checker) {
    return function(obj, nullable = false) {
        if (typeof obj === 'undefined') return false;
        if (obj === null) return !!nullable;
        return checker(obj);
    }
}

var typeChecker = {
    types: ['any', 'bool', 'boolean', 'array', 'string', 'object', 'function', 'symbol', 'int', 'float',
            'number', 'prop', 'component', 'element-node', 'text-node'],
    isUndef: (obj) => typeof obj === 'undefined',
    isString: createTypeChecker((obj) => typeof obj === 'string'),
    isObject: createTypeChecker((obj) => typeof obj === 'object'),
    isFunction: createTypeChecker((obj) => typeof obj === 'function'),
    isBool: createTypeChecker((obj) => typeof obj === 'boolean'),
    isSymbol: createTypeChecker((obj) => typeof obj === 'symbol'),
    isArray: createTypeChecker((obj) => Array.isArray(obj)),
    isNumber: createTypeChecker((obj) => !isNaN(obj)),
    isInt: createTypeChecker((obj) => Number(obj) === obj && obj % 1 === 0),
    isFloat: createTypeChecker((obj) => Number(obj) === obj && obj % 1 !== 0),
    isPropStrict: createTypeChecker((obj) => typeChecker.isObject(obj) && obj.$className === 'Prop'),
    isProp: createTypeChecker((obj) => typeChecker.isPropStrict(obj) || typeChecker.isComputedProp(obj)),
    isComponent: createTypeChecker((obj) => typeChecker.isObject(obj) && obj.$className === 'Component'),
    isComponentFactory: createTypeChecker((obj) => typeChecker.isObject(obj) && obj.$className === 'ComponentFactory'),
    isGetRecorder: createTypeChecker((obj) => typeChecker.isObject(obj) && obj.$className === 'GetRecorder'),
    isComputedProp: createTypeChecker((obj) => typeChecker.isObject(obj) && obj.$className === 'ComputedProp'),
    isProxyContext: createTypeChecker((obj) => typeChecker.isObject(obj) && obj.$className === 'ProxyContext'),
    isComponentProcessor: createTypeChecker((obj) => typeChecker.isObject(obj) && obj.$className === 'ComponentProcessor'),
    isElementNode: createTypeChecker((obj) => typeChecker.isObject(HTMLElement) ? 
                                        obj instanceof HTMLElement : //DOM2
                                        typeChecker.isObject(obj) && obj.nodeType === Node.ELEMENT_NODE && typeChecker.isString(obj.nodeName)),
    isTextNode: createTypeChecker((obj) => typeChecker.isObject(obj) && obj.nodeType === Node.TEXT_NODE && typeChecker.isString(obj.nodeName))
}

var isType = function(type, obj, nullable = false) {
    if (typeof obj === 'undefined') return false;
    switch(type.toLowerCase()) {
        case 'any':
            if (typeof obj === 'undefined') return false;
            if (obj === null) return !!nullable;
            return true;
        case 'array':
            return typeChecker.isArray(obj, nullable);
        case 'string':
            return typeChecker.isString(obj, nullable);
        case 'object':
            return typeChecker.isObject(obj, nullable);
        case 'function':
            return typeChecker.isFunction(obj, nullable);
        case 'symbol':
            return typeChecker.isSymbol(obj, nullable);
        case 'int':
            return typeChecker.isInt(obj, nullable);
        case 'float':
            return typeChecker.isFloat(obj, nullable);
        case 'number':
            return typeChecker.isNumber(obj, nullable);
        case 'bool':
        case 'boolean':
            return typeChecker.isBool(obj, nullable);
        case 'prop':
            return typeChecker.isProp(obj, nullable);
        case 'computed-prop':
            return typeChecker.isComputedProp(obj, nullable);
        case 'element-node':
            return typeChecker.isElementNode(obj, nullable);
        case 'text-node':
            return typeChecker.isTextNode(obj, nullable);
        default:
            throw new Error('Type "'+type+'" is not supported.');
    }
}

var typeSafeGetter = function(type, value, defaultRv, nullable = false) {
    if (typeof value === 'undefined') return defaultRv;
    if(isType(type, value, nullable)) 
        return value;
    return defaultRv;
}

var typeSafePropGetter = function(type, obj, prop, defaultRv, nullable = false) {
    if (obj.hasOwnProperty(prop)) {
        return typeSafeGetter(type, obj[prop], defaultRv, nullable);
    }
    return defaultRv;
}

export {
    typeChecker,
    isType,
    typeSafeGetter,
    typeSafePropGetter
}
