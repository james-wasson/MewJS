import { typeChecker, isType } from './typeManager';

/**
 * Stores the name, value, and any dependencies for the property
 * Assumes name is of type string
 * Value can be of any type
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
        var valueWasSet = this.$setValue(value || null, false);
        if (typeChecker.isUndef(valueWasSet)) // there was some type error setting the value
            this.value = null;
        // set the value of freezeValue
        this.freezeValue = typeChecker.isBool(freezeValue) ? freezeValue : false;

        this.$className = 'Prop';
    }

    $runDepsUpdate(newVal, oldVal) {
        if (typeChecker.isProp(this.value)) {
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
        if (typeChecker.isProp(this.value)) {
            this.value.$addDep(dep);
        } else {
            this.deps.push(dep);
        }
    }

    $removeDep(checker) {
        if (typeChecker.isProp(this.value)) {
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

    $setValue(newVal, runUpdate, ignoreFrozen) {
        if (!this.freezeValue || ignoreFrozen === true) {
            if (typeChecker.isProp(this.value) && !typeChecker.isProp(newVal)) {
                return this.value.setValue(newVal, runUpdate);
            } else {
                if (!isType(this.type, newVal, true)) {
                    console.error('Cannot set value for prop because it doesn\'t meet type constraint of type "'+this.type+'"');
                    return;
                }
                // go down the props tree to get the lowest value that is not a prop
                if (typeChecker.isProp(newVal)) {
                    while (typeChecker.isProp(newVal.value)) {
                        newVal = newVal.value;
                    }
                }
                var oldVal = this.value;
                this.value = newVal;
                if (oldVal !== newVal && (typeChecker.isBool(runUpdate) ? runUpdate : true)) 
                    this.$runDepsUpdate(newVal, oldVal);
                return newVal;
            }
        } else {
            console.error('Cannot set value for prop because the value is frozen. Prop: ', this);
        }
    }

    $getValue() {
        if (typeChecker.isProp(this.value)) {
            return this.value.$getValue();
        }
        return this.value;
    }

    [Symbol.toPrimitive]() {
        return this.$getValue();
    }
}

export default Prop;