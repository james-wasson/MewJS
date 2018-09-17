import { typeChecker } from './typeManager';
import { GetEvalFunctionInSelf } from './getRecorder';
import Prop from './prop';

export default class ComputedProp extends Prop {
    constructor(descriptor) {
        super(null, descriptor.type || 'any', true);

        this.$className = 'ComputedProp';
        if (!typeChecker.isFunction(descriptor.compute)) {
            throw new Error('Computed Properties must have a function registered under "compute".');
        }

        this.$computable = descriptor.compute;
        this.$watch = typeChecker.isArray(descriptor.watch) ? descriptor.watch : [];
        this.$dynamic = typeChecker.isBool(descriptor.dynamic) ? descriptor.dynamic : true;
        this.value = null;
    }

    $initalize(self) {
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

    $addWatcher(prop, propName) {
        if (!typeChecker.isProp(prop)) {
            console.error('Cannot set computed watch on non-prop object. PropName: ', propName);
        } else {
            if (!prop.$hasDep(dep => typeChecker.isObject(dep) && dep.This === this)) {
                prop.$addDep({ This: this, $run: this.$compute.bind(this) });
            } 
        }
    }

    $compute() {
        return this.$setValue(this.$evalFunction() || null, true, true);
    }
} 

