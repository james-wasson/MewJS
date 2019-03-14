'use strict';

function recurseThroughComponentTree(root, callBack) {
    var component = root.$component;
    callBack(component);
    if (component.$children && component.$children.$activeComponents)
        component.$children.$activeComponents.forEach(c => recurseThroughComponentTree(c, callBack));
}

function callMountedHooks(component) {
    recurseThroughComponentTree({ $component: component }, (comp) => {
        // when we figure out why mounted is call twice remove || statment
        comp.$_onMounted.forEach(p => p());
        if (comp.$hooks && comp.$hooks.$mounted) comp.$hooks.$mounted.call(comp.$proxy);
    });
}

export {
    callMountedHooks
};

export default {
    callMountedHooks
};
