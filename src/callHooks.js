function recurseThroughComponentTree(root, callBack) {
    var component = root.$component;
    callBack(root.$component);
    if (root.$component.$children && root.$component.$children.$activeComponents)
        root.$component.$children.$activeComponents.forEach(c => recurseThroughComponentTree(c, callBack));
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