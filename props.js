function copyInstance (original) {
    var copied = Object.assign(
      Object.create(
        Object.getPrototypeOf(original)
      ),
      original
    );
    return copied;
  }

/*
 * Start create Props
 */

/**
 * takes the deps, and returns an array of valid deps
 * @param {Array | Function | Object} deps
 * @returns {Array}
 */
function filterDependencies(deps) {
    if (!deps) return [];
    // checks to ensure dependents is of type array
    if (!typeChecker.isArray(deps)) deps = [deps];
    // filter out bad dependents
    deps = deps.filter(dep => {
        if (typeChecker.isFunction(dep)) return true;
        console.warn('Dependancy must be of type "function".\nInvalid Dependancy: ', dep);
        return false;
    });
    return deps;
}

/**
 * Stores the name, value, and any dependencies for the property
 * Assumes name is of type string
 * Value can be of nay type
 * Assumes all dependencies are either of tpye function or impliment the method ".run()"
 * It is probably easier to use the "createProps()" function
 */
class Prop {
    constructor(value, type, freezeValue) {
        this.deps = [];
        this.type = typeChecker.types.indexOf(type) > -1 ? type : 'any';
        // allow inital value to be set
        this.freezeValue = false;
        // sets the value
        var valueWasSet = this.setValue(value || null, false);
        if (typeChecker.isUndef(valueWasSet)) // there was some type error setting the value
            this.value = null;
        // set the value of freezeValue
        this.freezeValue = typeChecker.isBool(freezeValue) ? freezeValue : false;
    }

    $runDepsUpdate(newVal, oldVal) {
        if (this.type === 'prop') {
            this.value.$runDepsUpdate(newVal, oldVal);
        } else {
            for (var i = this.deps.length - 1; i > -1; i -= 1) {
                if (typeChecker.isFunction(this.deps[i]))
                    this.deps[i](newVal, oldVal, this.type);
                else if (this.deps[i] && typeChecker.isFunction(this.deps[i].$run)) {
                    this.deps[i].$run(newVal, oldVal, this.type);
                } else {
                    console.error('Bad dependancy encountered, a dependancy must either be a function or have "$run" as a function accessable.');
                }
            }
        }
    }

    $addDep(dep) {
        if (this.type === 'prop') {
            this.value.$addDep(dep);
        } else {
            this.deps.push(dep);
        }
    }

    $removeDep(checker) {
        if (this.type === 'prop') {
            this.value.$removeDep(dep);
        } else {
            if (typeChecker.isFunction(checker)) {
                this.deps =this.deps.filter(dep => checker(dep));
            } else {
                var index = this.deps.indexOf(checker);
                if (index > -1) this.deps.splice(index, 1);
            }
        }
    }

    $hasDep(checker) {
        if (typeChecker.isFunction(checker)) {
            return this.deps.some(dep => checker(dep));
        } else {
            return this.deps.indexOf(checker) > -1;
        }
    }

    setValue(newVal, runUpdate) {
        if (!this.freezeValue) {
            if (this.type === 'prop' && !typeChecker.isPropObj(newVal)) {
                return this.value.setValue(newVal, runUpdate);
            } else {
                if (!typeChecker.isType(this.type, newVal, true)) {
                    console.error('Cannot set value for prop because it doesn\'t meet type constraint of type "'+this.type+'"');
                    return;
                }
                // go down the props tree to get the lowest value that is not a prop
                if (typeChecker.isPropObj(newVal)) {
                    while (typeChecker.isPropObj(newVal.value)) {
                        newVal = newVal.value;
                    }
                }
                var oldVal = this.value;
                this.value = newVal;
                if (oldVal !== newVal && (!typeChecker.isBool(runUpdate) || runUpdate)) 
                    this.$runDepsUpdate(newVal, oldVal);
                return newVal;
            }
        } else {
            console.error('Cannot set value for prop because the value is frozen. Prop: ', this);
        }
    }

    getValue() {
        if (this.type === 'prop') {
            return this.value.getValue();
        }
        return this.value;
    }

    [Symbol.toPrimitive]() {
        return this.getValue();
    }
}

function checkCanRunOnProp(props, prop, functionCallName) {
    if (!props.hasOwnProperty(prop))
        console.warn('Prop does not exits on props object');
    else if (!typeChecker.isPropObj(props[prop]))
        console.warn('Cannot run ' + functionCallName + ' for types other than Prop.');
    else if (typeChecker.isFunction(props[prop][functionCallName]))
        console.warn('Prop doesn\'t impliment method "' + functionCallName + '"');
    else 
        return true;
    return false;
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
            var propDescript = propDescriptors[name];
            if (!typeChecker.isObject(propDescript)) {
                console.warn('Property must be of type object to be processed.');
                continue;
            }
            if (typeChecker.isPropObj(propDescript)) {
                props[name] = propDescript;
                continue;
            }

            var value = propDescript['value'] || null;
            var type = typeSafePropGetter('string', propDescript, 'type', 'any');
            var shouldFreeze = typeSafePropGetter('bool', propDescript, 'shouldFreeze', false);

            // adds the prop to the prop array
            props[name] = new Prop(value, type, shouldFreeze);
        }
    }
    
    return props;
}

/*
 * End create Props
 */

/*
 * Start ProxyContext
 */

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

            if (typeChecker.isPropObj(props[prop])) 
                return props[prop];

            if (typeChecker.isFunction(props[prop])) 
                return props[prop].bind(props);

            return props[prop].getValue();
        },
        set: (props, prop, value) => {
            if (typeChecker.isUndef(props[prop])) {
                console.warn('Property "' + prop + '" does not exist on object. Cannot set value.');
                return;
            }
            if (typeChecker.isPropObj(props[prop])) {
                props[prop].setValue(value);
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
        if (checkCanRunOnProp(this, prop, '$runDepsUpdate')) 
            this[prop].$runDepsUpdate();
    },
    // Exposes the raw prop within a wrapped object
    $props: function(prop) {
        if (typeChecker.isPropObj(this[prop])) 
            return this[prop];
        return null;
    }
};

/*
 * End ProxyContext
 */

/*
 * Start create Component 
 */

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

        if (!typeChecker.isObject(compDescriptor.self)) {
            throw new Error('Components must have self defined of type "object".');
        }

        if (compDescriptor.hasOwnProperty('parent'))
            (processParent.bind(this))(compDescriptor.parent, parentScope);

        (processSelf.bind(this))(compDescriptor.self);

        if (compDescriptor.hasOwnProperty('children'))
            (processChildren.bind(this))(compDescriptor.children);

        processTemplateHtml.bind(this)();
    }
}

function createComponentFactory(compDescriptor) {
    return (function() {
        var descriptor = compDescriptor;
        var rv = function(scopeAccess) {
            var component = new Component(descriptor, scopeAccess);
            return ProxyContext(component); // passing in parentProps freezes them only in this context
        };
        rv.prototype.constructor = { name: "ComponentFactory" };
        return rv;
    }());
}

function definePropOnSelf(self, prop, value) {
    if (self.hasOwnProperty(prop)) {
        if (typeChecker.isPropObj(self[prop])) {
            console.warn('Redefinging prop "'+prop+'"');
        } else {
            console.error("Cannot redefine a public Api.");
            return;
        }
    }
    if(!value || !typeChecker.isPropObj(value)) {
        console.error("Value must be of type prop.");
        return;
    }
    self[prop] = value;
}

const PROCESS_PROP_OPTIONS = Object.freeze({
    ARRAY: 0,
    DEFINITION_OBJECT: 1,
    RENAME_OBJECT: 2
});

function processProps(processOption, self, propsObj, scope = {}, propCallback = null) {
    switch(processOption) {
        case PROCESS_PROP_OPTIONS.ARRAY:
            if (Array.isArray(propsObj)) {
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
                var stringObj = Object.filter(propsObj, (key, value) => typeChecker.isString(value));
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
                        return false;
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

function freezePropOnSelf(self, prop) {
    if (!typeChecker.isPropObj(self[prop])) {
        console.error('Cannot freeze prop that is not constructed by "Prop"');
        return;
    }
    self[prop] = new Prop(self[prop], 'prop', true);
}

function processParent(parentDef, parentScopeAccess) {
    if (!parentDef || typeof parentDef !== 'object') {
        console.error("Malformed parent object.");
        return;
    }
    var parentScopeIsGood = parentScopeAccess && typeof parentScopeAccess === 'object';
    // pasrse the props object
    if (parentDef.hasOwnProperty('props')) {
        if (!parentScopeIsGood || !parentScopeAccess.$props || typeof parentScopeAccess.$props !== 'object') {
            console.error('Cannot inherit props from null parent props.');
        } else {
            var props = parentDef.props;
            if (Array.isArray(props)) {
                processProps(PROCESS_PROP_OPTIONS.ARRAY, this, props, parentScopeAccess.$props, function(self, prop) {
                    self.$inheritedProps.push(prop);
                    freezePropOnSelf(self, prop);
                })
            } else if (typeof props === 'object') {
                processProps(PROCESS_PROP_OPTIONS.RENAME_OBJECT, this, props, parentScopeAccess.$props, function(self, prop) { 
                    self.$inheritedProps.push(prop);
                    freezePropOnSelf(self, prop);
                })
            } else {
                console.error('Props on parent must be of type "object".')
            }
        }
    }

    if (parentDef.hasOwnProperty('slots')) {
        if (Array.isArray(parentDef.slots)) {
            console.error('slots on parent must be array of strings.')
        } else {
            for (var slot of parentDef.slots) {
                if (typeof slot !== 'string')
                    console.error('Only strings are allowed in slot array values.');
                else if (!parentScope.$slots || typeof parentScope.$slots !== 'object' || !parentScope.$slots[slot]) {
                    console.error('Slot "'+slot+'" doesn\' exist on parent');
                } else {
                    this.$slots[slot] = parentScope.$slots[slot];
                }
            }
        }
    }

    if (parentDef.hasOwnProperty('emit')) {
        if (Array.isArray(parentDef.emit)) {
            for(var eventName of parentDef.emit) {
                if (typeof eventName !== 'string') {
                    console.error('Each element in emit array must be string.');
                } else {
                    if (!parentScopeAccess.$listeners) parentScopeAccess.$listeners = {};
                    var listeners = parentScopeAccess.$listeners[eventName] || [];
                    this.$emit[eventName] =  (function(listeners, eventName){
                        var rv = function() {
                            for(var listener of listeners) {
                                if (typeof listener === 'function')
                                    listener.apply(arguments);
                                else
                                    console.error('Listener is not of type "function"')
                            }
                        };
                        rv.eventName = eventName;
                        return rv;
                    }.bind(this)(listeners, eventName));
                }
            }
        } else {
            console.error('Emit defined on parent must be array.');
        }
    }

    if (parentScopeAccess && parentScopeAccess.hasOwnProperty('$parent') && typeChecker.isComponentObj(parentScopeAccess.$parent)) {
        this.$parent = parentScopeAccess.$parent;
    }
}

function processSelf(selfDef) {
    if (selfDef.hasOwnProperty('props')) {
        processProps(PROCESS_PROP_OPTIONS.DEFINITION_OBJECT, this, selfDef.props, this)
    }

    if (selfDef.hasOwnProperty('template')) {
        if (typeof selfDef.template === 'string') {
            this.$template = selfDef.template;
            this.$templateHtml = getDocument(this.$template);
            if (!checkDocumentIsHTML(this.$templateHtml, selfDef.template)) {
                console.warn("There might be something wrong with your HTML syntax. Will try to parse anyway.");
            }
        } else {
            console.error('template must be of type "string"');
        }
    }

    if (selfDef.hasOwnProperty('watchers')) {
        if (typeof selfDef.watchers !== 'object') {
            console.error('watchers must be of type "object"');
        } else {
            var watchers = selfDef.watchers;
            for (var propName in watchers) {
                if (watchers.hasOwnProperty(propName)) {
                    if (typeof watchers[propName] !== 'function') {
                        console.error('Watcher must be of type "function".');
                    } else if (!this.hasOwnProperty(propName) || !this[propName] || !this[propName].constructor || this[propName].constructor.name !== 'Prop') {
                        console.error('Cannot watch "'+propName+'" because it is not a processed prop.');                        
                    } else {
                        var watchFun = watchers[propName];
                        watchFun = watchFun.bind(this);
                        this[propName].$addDep(watchFun);
                        this.$watchers[propName] = {
                            $dependancy: watchFun,
                            $prop: this[propName]
                        }
                    }
                }
            }
        }
    }
}

var getDocument = function(html) {
    var doc = document.createElement('template');
    doc.innerHTML = html;
    return doc;
}

var checkDocumentIsHTML = function(doc, plainHtml, isInnerDoc = true) {
    var docString = '';
    if (isInnerDoc) docString = doc.innerHTML;
    else docString = doc.outerHTML;
    return docString === plainHtml;
}

Object.filter = function(obj, predicate) {
    var rv = Object.assign({}, obj);
    for (var key in rv) {
        if (obj.hasOwnProperty(key)) {
            if (!predicate(key, obj[key]))
                delete rv[key];
        }
    }
    return rv;
}

function processListener(listeners, callBack) {
    if (!listeners || typeof listeners !== 'object') {
        console.error('Listeners on child must be in form of object.')
    } else {
        for (var eventName in listeners) {
            if (listeners.hasOwnProperty(eventName)) {
                if (typeof listeners[eventName] !== 'function') {
                    console.error('Listeners bound to an event must be of type "function"')
                } else {
                    callBack(eventName, listeners[eventName]);
                }
            }
        }
    }
}

function processChildren(childrenDef) {
    if (!childrenDef || typeof childrenDef !== 'object') {
        console.error("Malformed children object.");
        return;
    }

    if (childrenDef.hasOwnProperty('props')) {
        if (Array.isArray(childrenDef.props)) {
            processProps(PROCESS_PROP_OPTIONS.ARRAY, this.$children, childrenDef.props, this)
        } else if (childrenDef.props && typeof childrenDef.props === 'object') {
            processProps(PROCESS_PROP_OPTIONS.DEFINITION_OBJECT, this.$children, childrenDef.props, this)
        } else {
            console.error('Child props must be of type Array or Object');
        }
    }

    this.$listeners = {};
    if (childrenDef.hasOwnProperty('listeners')) {
        processListener(childrenDef.listeners, (eventName, eventHandler) => this.$listeners[eventName] = eventHandler);
    }

    if (childrenDef.hasOwnProperty('components')) {
        if (!childrenDef.components || typeof childrenDef.components !== 'object') {
            console.error('components on children must be in form of object.');
        } else {
            var components = childrenDef.components;
            for (var componentName in components) {
                if (components.hasOwnProperty(componentName)) {
                    var compList = components[componentName];
                    if (!Array.isArray(compList))
                         compList = [compList];
                    for (var comp of compList) {
                        var rv = {};
                        if (!comp || typeof comp !== 'object') {
                            console.error('Individual components must either be object or Array of objects');
                            continue;
                        }

                        if (comp.hasOwnProperty('definition') && typeChecker.isComponentFactoryFunction(comp.definition)) {
                            rv.$definition = comp.definition;
                        } else {
                            console.error('Component must have definition and it be constructed by component factory');
                            continue;
                        }

                        if (comp.hasOwnProperty('props')) {
                            if (Array.isArray(comp.props)) {
                                processProps(PROCESS_PROP_OPTIONS.ARRAY, rv, comp.props, Object.assign({}, this.$children, this))
                            } else if (typeof comp.props === 'object') {
                                processProps(PROCESS_PROP_OPTIONS.DEFINITION_OBJECT, rv, comp.props, Object.assign({}, this.$children, this));
                            } else {
                                console.error('Props on component expected to be of type "object" or an array');
                            }
                        }

                        rv.$listeners = {};
                        if (comp.hasOwnProperty('listeners')) {
                            processListener(comp.listeners, (eventName, eventHandler) => rv.$listeners[eventName] = eventHandler);
                        }

                        var eventNames = Object.keys(this.$listeners).concat(Object.keys(rv.$listeners))
                                            .filter((value, index, self) => self.indexOf(value) === index); // get unique
                        var providedListeners = {};
                        for (var eventName of eventNames) {
                            providedListeners[eventName] = [];
                            if (rv.$listeners[eventName]) providedListeners[eventName].push(rv.$listeners[eventName]);
                            if (this.$listeners[eventName]) providedListeners[eventName].push(this.$listeners[eventName]);
                        }

                        rv.$component = rv.$definition({
                            $props: Object.filter(Object.assign({}, rv, this.$children, this), (key, value) => typeChecker.isPropObj(value)),
                            $parent: this,
                            $listeners: providedListeners
                        });

                        if (!this.$children.$components[componentName])
                            this.$children.$components[componentName] = []
                        this.$children.$components[componentName].push(rv);
                    }
                }
            }
        }
    }
}

function removeStyle(node, styleTag) {
    if (node.style.removeProperty) {
        node.style.removeProperty(styleTag);
    } else {
        node.style.removeAttribute(styleTag);
    }
}

function addStyle(node, styleTag, value) {
    if (node.style.setProperty) {
        node.style.setProperty(styleTag, value);
    } else {
        node.style.setAttribute(styleTag, value);
    }
}

function hasClass(ele,cls) {
    return !!ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}

function addClass(ele,cls) {
    if (!hasClass(ele,cls)) ele.className = (ele.className + " " + cls).trim();
}

function removeClass(ele,cls) {
    if (hasClass(ele,cls)) {
        var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
        ele.className = ele.className.replace(reg,'');
    }
}

function bindArrayArgs(fun, thisArg, arrayArgs) {
    return fun.bind.apply(fun, [thisArg].concat(arrayArgs));
}

class GetWrapper {
    constructor(value, onGet) {
        this.value = value;
        this.onGet = typeChecker.isFunction(onGet) ? onGet : null;
    }
    [Symbol.toPrimitive]() {
        if (this.onGet) this.onGet();
        if (typeChecker.isPropObj(this.value))
            return this.value.getValue();
        return this.value;
    }
}

function GetEvalFunctionInSelf(self, evalScript, onGet) {
    self= Object.assign({},self);
    // we must maintain a sorted array in this case
    var keys = Object.keys(self); 
    keys.sort();

    var orderedValues = keys.map(k => {
        if (typeChecker.isPropObj(self[k])) 
            return new GetWrapper(self[k], (function(propName) { onGet(propName, this[propName]) }).bind(self, k));
        return self[k];
    });

    self = ProxyContext(self);

    keys.push('"use strict";\nreturn ('+evalScript+');'); // add eval code

    return bindArrayArgs(Function.apply(null, keys), self, orderedValues);
}

function addClassListener(self, node) {
    (function(self, node) {
        var addWatcher = function(propName, prop) {
            if (!prop.$hasDep((dep) => typeChecker.isObject(dep) && dep.node === node))
                prop.$addDep({ node: node, $run: performClassEval});
        }

        var classEval = GetEvalFunctionInSelf(self, node.getAttribute("p-bind:class"), addWatcher);
        node.removeAttribute("p-bind:class"); // clean up after ourselves

        var performClassEval = function() {
            var eval = classEval();
            if (typeChecker.isObject(eval)) {
                for (var className in eval) {
                    var isOn = !!eval[className];
                    if (isOn) addClass(node, className);
                    else removeClass(node, className);
                }
            } else if (!typeChecker.isUndef(eval, true)) {
                console.error("p-bind:class is returning something other than object undefined or null on node: ", node);
            }
        };
        performClassEval();
    }(self, node))
}

function processHtmlRecursively(root) {
    for (var node of root.childNodes) {
        if (typeChecker.isTextNode(node)) {
            //console.log(node.wholeText) 
        } else {
            if (node.getAttribute("p-bind:class")) {
                addClassListener(this, node);
            } else if (node.getAttribute("p-bind:style")) {
                
            }
        }
        processHtmlRecursively(node);
    }
}

function processTemplateHtml() {
    if (!this.$templateHtml && this.$templateHtml.content) return;
    if (!typeChecker.isElementNode(this.$templateHtml)) {
        console.error("Cannot parse templates html if not a dom element.");
        return;
    }

    processHtmlRecursively.bind(this)(this.$templateHtml.content);
}

var childComp = createComponentFactory({
    parent: {
        props: { 
            'prop2Child': 'prop2-rename'
        },
        emit: ['event1']
    },
    self: {
        props: {
            'prop2': {
                value: 2,
                type: 'number',
            }
        },
        template: '<p>c1</p>',
        watchers: {
            'prop2Child': function(newVal, oldVal) {
                console.log("child1", oldVal, newVal);
            }
        }
    }
});

var comp = createComponentFactory({
    parent: {
    },
    self: {
        props: {
            'prop2': {
                value: 2,
                type: 'number',
            },
            'prop1': {
                value: true,
                type: 'boolean',
            }
        },
        template: '<p p-bind:class="{ \'hello1\': (function() { return prop2 * 2 }()) }">asd</p>',
        watchers: {
            'prop2': function(newVal, oldVal) {
                console.log("root", oldVal, newVal);
            }
        }
    },
    children: {
        props: {
            'p-sub-top': {
                value: 2,
                type: 'number'
            }
        },
        components: {
            'component1': [{
                definition: childComp,
                props: {
                    'p-sub-bottom': {
                        value: 4,
                        type: 'number'
                    },
                    'prop2-rename': 'prop2'
                },
                listeners: {
                    'event1': function() {
                        console.log(arguments);
                    }
                }
            }]
        }
    }
})();

console.log(comp);

comp.prop2 = 0;
