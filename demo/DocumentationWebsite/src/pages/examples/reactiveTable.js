import { Component, ComputedProp } from 'Mew';
import upDownButtons from '../../standard/upDownButtons';
import redoButton from '../../standard/redoButton';

const DEFAULT_OPTIONS = ["British Columbia", "Ontario", "Quebec"];

function moveArrayItem(array, from, to) {
    array = array.slice();
    array.splice(to, 0, array.splice(from, 1)[0]);
    return array;
};

var stateOption = new Component({
    parent: {
        props: ['name', 'value', 'isSelected'],
        emit: ['click']
    },
    self: {
        props: {
            handleClick: {
                value: function(e) {
                    this.$emit.click(this.value, this.name);
                }
            }
        },
        template: `
            <button class="button state-button" 
                m-on="{ click: this.handleClick }" 
                m-bind:class="{ selected: this.isSelected }">
                {{this.name}}
            </button>
        `
    }
})

var optionsPicker = new Component({
    parent: {
        props: ['pickedNames', 'allOptions'],
        emit: ['selected']
    },
    self: {
        template: `
        <div class="box state-container" m-comp="'options'">
            <h4 class="subtitle is-4">Select Provence/Territory</h4>
        </div>`
    },
    children: {
        listeners: {
            click: function(value, name){ this.$emit.selected(value, name); }
        },
        components: {
            options: new ComputedProp(function() {
                return this.allOptions.map(state => {
                    return {
                        definition: stateOption,
                        props: {
                            name: { value: state },
                            value: { value: state },
                            isSelected: { value: this.pickedNames.indexOf(state) > -1 }
                        }
                    }
                })
            })
        }
    }
})

var tableRow = new Component({
    parent: {
        props: ['name', 'index', 'maxIndex'],
        emit: ['delete', 'moveup', 'movedown']
    },
    self: {
        template: `
            <tr>
                <td m-comp="'upDownButtons'" style="padding: 0;"></td>
                <th>{{this.index + 1}}</th>
                <td>{{this.name}}</td>
                <td>
                    <span class="remove-button"
                        m-on="{ click: () => this.$emit.delete(this.index) }">
                        <i class="fas fa-times"></i>
                    </span>
                </td>
            </tr>
        `,
    },
    children: {
        components: {
            upDownButtons: {
                definition: upDownButtons,
                listeners: {
                    up: function() {
                        this.$emit.moveup(this.index)
                    },
                    down: function() {
                        this.$emit.movedown(this.index)
                    },
                },
                props: {
                    disableUp: new ComputedProp(function() { 
                        return this.index === 0; 
                    }, 'bool'),
                    disableDown: new ComputedProp(function() { 
                        return this.index === this.maxIndex; 
                    }, 'bool')
                }
            }
        }
    }
});

export default new Component({
    self: {
        props: {
            takeAction: {
                value: function() {
                    this.actionWasTaken = true;
                },
                type: 'function',
                frozen: true
            },
            actionWasTaken: {
                value: false,
                type: 'bool'
            },
            allOptions: {
                value: ["British Columbia", "Alberta", "Saskatchewan", "Manitoba", "Ontario", "Quebec", "New Brunswick", "Prince Edward Island", "Nova Scotia", "Newfoundland and Labrador", "Yukon", "Northwest Territories", "Nunavut"],
                type: 'array',
                frozen: true
            },
            pickedNames: {
                value: DEFAULT_OPTIONS.slice(),
                type: 'array'
            },
            addRow: {
                value: function(state) {
                    var newarray = this.pickedNames.slice();
                    newarray.push(state);
                    this.pickedNames = newarray;
                    this.takeAction();
                }
            },
            removeRow: {
                value: function(index) {
                    this.pickedNames = this.pickedNames.filter((p, i) => i !== index);
                    this.takeAction();
                }
            }
        },
        template: `
        <div id="reactive-table" 
            style="position: relative;" 
            m-comp="['optionsPicker', 'redoButton']"
            m-bind:class="{ 'redo-animation-active': this.actionWasTaken }">
            <table class="table is-striped is-fullwidth is-hoverable">
                <thead>
                    <th></th>
                    <th>Rank</th>
                    <th>Provence/Trritory</th>
                    <th>Remove</th>
                </thead>
                <tbody m-comp="'tableRows'"></tbody>
            </table>
        </div>
        `,
    },
    children: {
        listeners: {
            movedown: function(index) {
                this.pickedNames = moveArrayItem(this.pickedNames, index, index + 1);
                this.takeAction();
            },
            moveup: function(index) {
                this.pickedNames = moveArrayItem(this.pickedNames, index, index - 1);
                this.takeAction();
            },
            delete: function(index) {
                this.removeRow(index);
                this.takeAction();
            }
        },
        components: {
            redoButton: {
                definition: redoButton,
                prepend: true,
                listeners: {
                    'redo': function() {
                        this.actionWasTaken = false;
                        this.pickedNames = DEFAULT_OPTIONS.slice();
                    }
                }
            },
            optionsPicker: {
                definition: optionsPicker,
                prepend: true,
                props: ['pickedNames', 'allOptions'],
                listeners: {
                    selected: function(value, name) {
                        var index = this.pickedNames.indexOf(value);
                        if (index > -1) {
                            this.removeRow(index);
                        } else {
                            this.addRow(value, name)                            
                        }
                    }
                }
            },
            tableRows: new ComputedProp(function() {
                var lastIndex = this.pickedNames.length - 1;
                return this.pickedNames.map((state, i) => ({
                    definition: tableRow,
                    props: {
                        name: {
                            value: state,
                            type: 'string'
                        },
                        index: {
                            value: i,
                            type: 'int'
                        },
                        maxIndex: {
                            value: lastIndex,
                            type: 'int'
                        }
                    }
                }))
            })
        }
    }
});