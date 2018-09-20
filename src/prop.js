import { typeChecker, isType } from './typeManager';

function checkIsDep(dep, silent) {
    silent = silent === true;
    if (typeChecker.isObject(dep)) {
        if (typeChecker.isFunction(dep.$run) && typeChecker.isObject(dep.$destroyable)) {
            if (typeChecker.isFunction(dep.$destroyable.$destroy) && typeChecker.isBool(dep.$destroyable.$isDestroyed)) {
                return true;
            } else {
                if (!silent) console.error('Destroyable objects must implement the $isDestroyed and $destry hooks');
            }
        } else {
            if (!silent) console.error('Dependencies must implement both the $run and $destroyable hooks');
        }
    } else {
        if (!silent) console.error('Dependencies must be of type object');
    }
    return false;
}

/**
 * Stores the name, value, and any dependencies for the property
 * Assumes name is of type string
 * Value can be of any type
 * Assumes all dependencies are either of tpye function or implement the method ".run()"
 * It is probably easier to use the "createProps()" function
 */
class Prop {
    constructor(value, type, freezeValue) {
        this.$className = 'Prop';
        this.deps = [];
        this.type = typeChecker.types.indexOf(type) > -1 ? type : 'any';
        // set the value of freezeValue
        this.freezeValue = typeChecker.isBool(freezeValue) ? freezeValue : false;
        // sets the value
        var valueWasSet = this.$setValue(value, false, true);
        if (typeChecker.isUndef(valueWasSet)) // there was some type error setting the value
            this.value = null;
    }

    $runDepsUpdate(newVal, oldVal) {
        if (typeChecker.isProp(this.value)) {
            this.value.$runDepsUpdate(newVal, oldVal);
        } else {
            this.deps = this.deps.filter(p => !p.$destroyable.$isDestroyed);
            var badDeps = [];
            for (var dep of this.deps) {
                if (dep && typeChecker.isFunction(dep.$run)) {
                    dep.$run(newVal, oldVal, this.type);
                } else {
                    badDeps.push(dep)
                    console.error('Bad dependancy encountered.');
                }
            }
            this.deps = this.deps.filter(p => !badDeps.includes(p));
        }
    }

    $addDep(dep) {
        if (checkIsDep(dep)) {
            if (typeChecker.isProp(this.value)) {
                this.value.$addDep(dep);
            } else {
                this.deps.push(dep);
            }
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
        if (typeChecker.isProp(this.value)) {
            return this.value.$hasDep(checker || null);
        } else {
            if (typeChecker.isFunction(checker)) {
                return this.deps.some(dep => checker(dep));
            } else {
                return this.deps.indexOf(checker) > -1;
            }
        }
    }

    $setValue(newVal, runUpdate, ignoreFrozen) {
        if (!this.freezeValue || ignoreFrozen === true) {
            if (typeChecker.isProp(this.value) && !typeChecker.isProp(newVal)) {
                return this.value.setValue(newVal, runUpdate, ignoreFrozen || false);
            } else {
                if (!isType(this.type, newVal, true)) {
                    console.error('Cannot set value for prop because it doesn\'t meet type constraint of type "'+this.type+'"');
                    return;
                }
                // go down the props tree to get the lowest value that is a prop
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