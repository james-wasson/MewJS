import { Component, MountComponent, ComputedProp } from 'Mew';


const WIDTH_OF_SCROLLBAR = '17px';

export default new Component({
    parent: {
        props: ['colors', 'pickedColor', 'colorChoices', 'hasScrollbar'],
        emit: ['changeColor']
    },
    self: {
        template: `
            <div id="inner-content" m-bind:class="{ 'collapse-for-scrollbar': this.hasScrollbar }">

            </div>
        `
    }
})