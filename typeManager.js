(function() {
    'use strict';
    function createTypeChecker(checker) {
        return function(obj, nullable = false) {
            if (typeof obj === 'undefined') return false;
            if (obj === null) return !!nullable;
            return checker(obj);
        }
    }
    window.typeChecker = {
        types: ['any', 'bool', 'boolean', 'array', 'string', 'object', 'function', 'symbol', 'int', 'float',
                'number', 'undefined', 'prop', 'component', 'component-factory', 'element-node', 'text-node'],
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
        isPropObj: createTypeChecker((obj) => typeChecker.isObject(obj) && obj.constructor && obj.constructor.name === 'Prop'),
        isComponentObj: createTypeChecker((obj) => typeChecker.isObject(obj) && obj.constructor && obj.constructor.name === 'Component'),
        isComponentFactoryFunction: createTypeChecker((obj) => typeChecker.isFunction(obj) && obj.prototype.constructor &&
                                                                obj.prototype.constructor.name === 'ComponentFactory'),
        isElementNode: createTypeChecker((obj) => typeof HTMLElement === "object" ? 
                                            obj instanceof HTMLElement : //DOM2
                                            typeChecker.isObject(obj) && obj.nodeType === Node.ELEMENT_NODE && typeof obj.nodeName==="string"),
        isTextNode: createTypeChecker((obj) => typeChecker.isObject(obj) && obj.nodeType === Node.TEXT_NODE && typeof obj.nodeName==="string"),
        isType: function(type, obj, nullable = false) {
            if (typeof obj === 'undefined') return false;
            switch(type.toLowerCase()) {
                case 'any':
                    if (typeof obj === 'undefined') return false;
                    if (obj === null) return !!nullable;
                    return true;
                case 'array':
                    return this.isArray(obj, nullable);
                case 'string':
                    return this.isString(obj, nullable);
                case 'object':
                    return this.isObject(obj, nullable);
                case 'function':
                    return this.isFunction(obj, nullable);
                case 'symbol':
                    return this.isSymbol(obj, nullable);
                case 'int':
                    return this.isInt(obj, nullable);
                case 'float':
                    return this.isFloat(obj, nullable);
                case 'number':
                    return this.isNumber(obj, nullable);
                case 'bool':
                case 'boolean':
                    return this.isBool(obj, nullable);
                case 'prop':
                    return this.isPropObj(obj, nullable);
                case 'component':
                    return this.isComponentObj(obj, nullable);
                case 'component-factory':
                    return this.isComponentFactoryFunction(obj, nullable);
                case 'html-element':
                    return this.isElementNode(obj, nullable);
                default:
                    throw new Error('Type "'+type+'" is not supported.');
            }
        }
    }
    
    window.typeSafeGetter = function(type, value, defaultRv, nullable = false) {
        if (typeof value === 'undefined') return defaultRv;
        if(typeChecker.isType(type, value, nullable)) 
            return value;
        return defaultRv;
    }
    
    window.typeSafePropGetter = function(type, obj, prop, defaultRv, nullable = false) {
        if (obj.hasOwnProperty(prop)) {
            return typeSafeGetter(type, obj[prop], defaultRv, nullable);
        }
        return defaultRv;
    }
}());
