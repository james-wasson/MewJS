import { Component, ComputedProp } from "Mew";

export default new Component({
    parent: {
        props: ['disableUp', 'disableDown'],
        emit: ['up', 'down']
    },
    self: {
        template: `
        <div class="up-down-buttons">
            &nbsp; <!-- Needed so we can insert into a table -->
            <div class="up-button" m-bind:class="{ disabled: this.disableUp === true }"
                m-on="{ click: function() { if (!this.disableUp) this.$emit.up(); } }">
            </div>
            <i class="fas fa-sort-up up-icon" m-bind:class="{ disabled: this.disableUp === true }"></i>

            <div class="down-button" m-bind:class="{ disabled: this.disableDown === true }"
                m-on="{ click: function() { if (!this.disableDown) this.$emit.down(); } }">
            </div>
            <i class="fas fa-sort-down down-icon" m-bind:class="{ disabled: this.disableDown === true }"></i>
        </div>`
    }
});