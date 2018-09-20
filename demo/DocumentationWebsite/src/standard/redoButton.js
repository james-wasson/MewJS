import { Component } from "Mew";

export default new Component({
    parent: {
        emit: ['redo']
    },
    self: {
        template: `<div class="redo-button" m-on="{ click: () => this.$emit.redo() }"><i class="fas fa-redo"></i></div>`
    }
});