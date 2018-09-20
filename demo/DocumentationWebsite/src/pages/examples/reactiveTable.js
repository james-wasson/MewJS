import { Component, ComputedProp } from 'Mew';
import upDownButtons from '../../standard/upDownButtons';
import redoButton from '../../standard/redoButton';

const DEFAULT_STATES = ["British Columbia", "Ontario", "Quebec"];

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
                    console.log(e);
                    e.stopPropagation();
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

var stateDropdown = new Component({
    parent: {
        props: ['pickedStates', 'allStates'],
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
            options: new ComputedProp({
                compute: function() {
                    return this.allStates.map(state => {
                        return {
                            definition: stateOption,
                            props: {
                                name: { value: state },
                                value: { value: state },
                                isSelected: { value: this.pickedStates.indexOf(state) > -1 }
                            }
                        }
                    })
                },
                dynamic: true
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
                    disableUp: new ComputedProp({
                        compute: function() { 
                            return this.index === 0; 
                        },
                        dynamic: true
                    }),
                    disableDown: new ComputedProp({
                        compute: function() { 
                            return this.index === this.maxIndex; 
                        },
                        dynamic: true
                    })
                }
            }
        }
    }
});

export default new Component({
    parent: {
    },
    self: {
        props: {
            states: {
                value: ["British Columbia", "Alberta", "Saskatchewan", "Manitoba", "Ontario", "Quebec", "New Brunswick", "Prince Edward Island", "Nova Scotia", "Newfoundland and Labrador", "Yukon", "Northwest Territories", "Nunavut"],
                type: 'array',
                frozen: true
            },
            pickedStates: {
                value: DEFAULT_STATES.slice(),
                type: 'array'
            },
            addState: {
                value: function(state) {
                    var newarray = this.pickedStates.slice();
                    newarray.push(state);
                    this.pickedStates = newarray;
                    this.actionWasTaken = true;
                }
            },
            removeState: {
                value: function(index) {
                    this.pickedStates = this.pickedStates.filter((p, i) => i !== index);
                    this.actionWasTaken = true;
                }
            },
            actionWasTaken: {
                value: false,
                type: 'bool'
            }
        },
        template: `
        <div id="reactive-table" 
            style="position: relative;" 
            m-comp="['stateDropdown', 'redoButton']"
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
                this.pickedStates = moveArrayItem(this.pickedStates, index, index + 1);
                this.actionWasTaken = true;
            },
            moveup: function(index) {
                this.pickedStates = moveArrayItem(this.pickedStates, index, index - 1);
                this.actionWasTaken = true;
            },
            delete: function(index) {
                this.removeState(index);
            }
        },
        components: {
            redoButton: {
                definition: redoButton,
                prepend: true,
                listeners: {
                    'redo': function() {
                        this.actionWasTaken = false;
                        this.pickedStates = DEFAULT_STATES.slice()
                    }
                }
            },
            stateDropdown: {
                definition: stateDropdown,
                prepend: true,
                props: {
                    'pickedStates': 'pickedStates',
                    'allStates': 'states'
                },
                listeners: {
                    selected: function(value, name) {
                        var index = this.pickedStates.indexOf(value);
                        if (index > -1) {
                            this.removeState(index);
                        } else {
                            this.addState(value, name)                            
                        }
                    }
                }
            },
            tableRows: new ComputedProp({
                compute: function() {
                    var lastIndex = this.pickedStates.length - 1;
                    return this.pickedStates.map((p, i) => {
                        return {
                            definition: tableRow,
                            props: {
                                name: {
                                    value: p,
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
                        }
                    })
                }
            })
        }
    }
});