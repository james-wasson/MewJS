import utils from '../utils';
import childParser from './childParser';
import parentParser from './parentParser';
import selfParser from './selfParser';
import htmlParser from './htmlParser';
import hooksParser from './hooksParser';
import proxyContext from '../proxyContext';
import { typeChecker } from '../typeManager';
import { callMountedHooks } from '../callHooks';
import { initalizeComputedComponent } from '../computedProp';

class Component {
    constructor(compDescriptor, html, parentScope, parentNode, componentName) {
        this.$isDestroyed = false;
        this.$componentName = componentName;
        this.$proxy = proxyContext(this);
        this.$className = "Component";
        this.$rootNode = parentNode;
        this.$slots = {};
        this.$emit = {};
        this.$parent = null;
        this.$watchers = {};
        this.$listeners = {};
        this.$inheritedProps = [];
        this.$children = {
            $listeners: {},
            $components: {},
            $activeComponents: []
        }
        this.$htmlEvents = {};
        this.$hooks = {
            $created: null,
            $mounted: null
        }
        this.$nodes = [];
        this.$_onMounted = [];
        this.$destroyable = [];
        this.$templateHtml = html;

        if (!typeChecker.isObject(compDescriptor.self)) {
            throw new Error('Components must have self defined of type "object".');
        }

        if (compDescriptor.hasOwnProperty('parent'))
            parentParser.call(this, this, compDescriptor.parent, parentScope);

        selfParser.call(this, this, compDescriptor.self);

        if (compDescriptor.hasOwnProperty('children'))
            childParser.call(this, this, compDescriptor.children);

        
        if (compDescriptor.hasOwnProperty('hooks'))
            hooksParser.call(this, compDescriptor.hooks);
        
        
        htmlParser.call(this, html);


        initalizeComputedComponent(this);

    }

    $destroy() {
        this.$isDestroyed = true;
        this.$destroyable.forEach(p => p.$destroy());
        this.$children.$activeComponents.forEach(comp => comp.$component.$destroy());
    }
}

class ComponentFactory {
    constructor(compDescriptor) {
        if (typeChecker.isObject(compDescriptor) && typeChecker.isObject(compDescriptor.self) && typeChecker.isString(compDescriptor.self.template))
            this.$templateHtml = utils.getDocument(compDescriptor.self.template);
        else
            throw new Error('Self must have a string called template defined on it.');
        
        this.$descriptor = compDescriptor;
        this.$className = "ComponentFactory";
    }

    $addScope(componentName, parentScope) {
        this.$parentScope = parentScope;
        this.$componentName = componentName;
    }

    $create(parentNode) {
        var component = new Component(this.$descriptor, this.$templateHtml.cloneNode(true), this.$parentScope, parentNode, this.$componentName);
                
        if (component.$hooks.$created)
            component.$hooks.$created.call(component.$proxy);

        

        return component.$proxy;
    }

    $clone() {
        return new ComponentFactory(this.$descriptor);
    }
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

        var instance = componentFactory.$create(node);
        node.appendChild(instance.$templateHtml.content);
        // calls the mounted hook
        callMountedHooks(instance);
        return instance;

    } else {
        console.error('mount point expects valid html id or node type');
        return null;
    }
}

export { 
    ComponentFactory as Component,
    MountComponent
}