import childParser from './childParser';
import parentParser from './parentParser';
import selfParser from './selfParser';
import htmlParser from './htmlParser';
import hooksParser from './hooksParser';
import proxyContext from '../proxyContext';
import { typeChecker } from '../typeManager';

class Component {
    constructor(compDescriptor, parentScope) {
        if (!typeChecker.isObject(compDescriptor)) {
            console.warn('The component descriptor must be of type "object"');
            compDescriptor = {};
        }
        this.$className = "Component";
        this.$slots = {};
        this.$emit = {};
        this.$parent = null;
        this.$watchers = {};
        this.$inheritedProps = [];
        this.$children = {
            $listeners: {},
            $components: {},
        }
        this.$htmlEvents = {};
        this.$hooks = {
            $created: null,
            $mounted: null
        }

        if (!typeChecker.isObject(compDescriptor.self)) {
            throw new Error('Components must have self defined of type "object".');
        }

        if (compDescriptor.hasOwnProperty('parent'))
            parentParser.call(this, compDescriptor.parent, parentScope);

        selfParser.call(this, compDescriptor.self);

        if (compDescriptor.hasOwnProperty('children'))
            childParser.call(this, compDescriptor.children);

        for (var propName in this) 
            if (this.hasOwnProperty(propName) && typeChecker.isComputedProp(this[propName]))
                this[propName].$initalize(this);

        if (compDescriptor.hasOwnProperty('hooks'))
            hooksParser.call(this, compDescriptor.hooks);
        
        htmlParser.bind(this)();
    }
}

class ComponentFactory {
    constructor(compDescriptor) {
        this.descriptor = compDescriptor;
        this.$className = "ComponentFactory";
    }

    $create(parentScope) {
        var component = new Component(this.descriptor, parentScope);
        var proxy = proxyContext(component);

        if (component.$hooks.$created) 
            component.$hooks.$created.call(proxy);

        return proxy;
    }
}

function recurseThroughComponentTree(root, callBack) {
    callBack(root);
    if (root.$children && root.$children.$activeComponents)
        root.$children.$activeComponents.forEach(c => recurseThroughComponentTree(c, callBack));
}

function MountComponent(nodeOrId, componentFactory) {
    if (!typeChecker.isComponentFactory(componentFactory)) {
        console.error('Mount type expects type of componentFactory.');
        return null;
    }

    if (typeChecker.isString(nodeOrId))
        nodeOrId = document.getElementById(nodeOrId.replace('#', ''));
    
    if (typeChecker.isElementNode(nodeOrId)) {
        var node = nodeOrId;
        var instance = componentFactory.$create();
        node.appendChild(instance.$templateHtml.content);
        // calls the mounted hook
        recurseThroughComponentTree(instance, comp => {
            if (comp.$hooks.$mounted) comp.$hooks.$mounted.call(instance);
        });
        return instance;
    } else {
        console.error('mount point expects valid html id or node type');
        return null;
    }
}

export { 
    ComponentFactory as Component,
    MountComponent
};