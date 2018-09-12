import childParser from './childParser';
import parentParser from './parentParser';
import selfParser from './selfParser';
import htmlParser from './htmlParser';
import proxyContext from '../proxyContext';
import { typeChecker } from '../typeManager';

class Component {
    constructor(compDescriptor, parentScope) {
        if (!typeChecker.isObject(compDescriptor)) {
            console.warn('The component descriptor must be of type "object"');
            compDescriptor = {};
        }
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

        if (!typeChecker.isObject(compDescriptor.self)) {
            throw new Error('Components must have self defined of type "object".');
        }

        if (compDescriptor.hasOwnProperty('parent'))
            (parentParser.bind(this))(compDescriptor.parent, parentScope);

        (selfParser.bind(this))(compDescriptor.self);

        if (compDescriptor.hasOwnProperty('children'))
            (childParser.bind(this))(compDescriptor.children);

            htmlParser.bind(this)();

        this.$className = "Component";
    }
}

class ComponentFactory {
    constructor(compDescriptor) {
        this.descriptor = compDescriptor;
        this.$className = "ComponentFactory";
    }

    $create(parentScope) {
        var component = new Component(this.descriptor, parentScope);
        return proxyContext(component); // passing in parentProps freezes them only in this context
    }
}

function MountComponent(nodeOrId, componentFactory) {
    console.log(nodeOrId, componentFactory)
    if (!typeChecker.isComponentFactory(componentFactory)) {
        console.error('Mount type expects type of componentFactory.');
        return null;
    }

    if (typeChecker.isString(nodeOrId))
        nodeOrId = document.getElementById(nodeOrId.replace('#', ''));
    
    if (typeChecker.isElementNode(nodeOrId)) {
        var node = nodeOrId;
        node.appendChild(componentFactory.$create().$templateHtml.content);
    } else {
        console.error('mount point expects valid html id or node type');
    }
}

export { 
    ComponentFactory as Component,
    MountComponent
};