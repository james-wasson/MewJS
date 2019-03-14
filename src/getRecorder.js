'use strict';

import {
    typeChecker,
} from './typeManager';
import ProxyContext from './proxyContext';

function GetEvalFunctionInSelf(self, evalScript, onGet) {
    var proxyGet;
    var evalFun;

    if (typeChecker.isProxyContext(self)) {
        proxyGet = ProxyContext(self.$component(), { onGet: onGet });
    } else {
        proxyGet = ProxyContext(self, { onGet: onGet });
    } 

    if (typeChecker.isFunction(evalScript)) {
        evalFun = evalScript;
    } else {
        evalFun = Function.call(null, '"use strict";\nreturn ('+evalScript+');');
    }
    
    return evalFun.bind(proxyGet);
}

export { 
    GetEvalFunctionInSelf,
};

export default GetEvalFunctionInSelf;
