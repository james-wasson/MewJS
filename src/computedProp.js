import { typeChecker } from './typeManager';
import { GetEvalFunctionInSelf } from './getRecorder';
import Prop from './prop';
import utils from './utils';


function initalizeComputedComponent(self) {
    var initalize = function(obj, propName) {
        for (var propName in obj) 
            if (typeChecker.isComputedProp(obj[propName]))
                obj[propName].$initalize(self);
    }
    initalize(self);
    initalize(self.$children);
    for (var compName in self.$children.$components) {
        for (var comp of self.$children.$components[compName]) {
            initalize(comp.$descriptor.props);
        }
    }
}

class ComputedProp extends Prop {
    constructor(descriptor) {
        super(null, descriptor.type || 'any', true);
        this.$watchId = utils.uuidv4();
        this.$isDestroyed = false;

        this.$className = 'ComputedProp';
        if (!typeChecker.isFunction(descriptor.compute)) {
            throw new Error('Computed Properties must have a function registered under "compute".');
        }

        this.$descriptor = descriptor;
        this.$computable = descriptor.compute;
        this.$watch = typeChecker.isArray(descriptor.watch) ? descriptor.watch : [];
        this.$dynamic = typeChecker.isBool(descriptor.dynamic) ? descriptor.dynamic : true;
        this.value = null;
        this.$isInitalized = false;
    }

    $initalize(self) {
        if (!this.$isInitalized) {
            self.$destroyable.push(this);
            this.$isInitalized = true;
            var isDynamic = this.$dynamic;
            var $addWatcher = this.$addWatcher.bind(this)
            this.$evalFunction = GetEvalFunctionInSelf(self, this.$computable, function(propName, prop) {
                if (isDynamic) {
                    $addWatcher(prop, propName);
                }
            });
            for (var w of this.$watch) {
                this.$addWatcher(self[w], w);
            }
            this.$compute();
        }
    }

    $addWatcher(prop, propName) {
        if (!typeChecker.isProp(prop)) {
            console.error('Cannot set computed watch on non-prop object. PropName: ', propName);
        } else {
            if (!prop.$hasDep(dep => typeChecker.isObject(dep) && dep.$id === this.$watchId)) {
                prop.$addDep({ $id: this.$watchId, $destroyable: this, $run: this.$compute.bind(this) });
            } 
        }
    }

    $compute() {
        if (this.$isInitalized) {
            var value = this.$evalFunction();
            return this.$setValue(value, true, true);
        }
    }

    $clone() {
        return new ComputedProp(this.$descriptor);
    }

    $destroy() {
        this.$isDestroyed = true;
    }
}

export {
    initalizeComputedComponent,
    ComputedProp
}

export default ComputedProp;

