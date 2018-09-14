import { Component } from 'Mew';

export default new Component({
    parent: {
        props: ['colors', 'pickedColor', 'colorChoices'],
        emit: ['changeColor']
    },
    self: {
        template: `
            <div id="topbar-content">

            </div>
        `,

    }
});
