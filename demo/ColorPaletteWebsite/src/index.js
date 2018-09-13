import { Component, MountComponent } from '../../../dist/bundle';

var Colors = {
    'DustBeach': {
        'light-backgroud': '#74c0e3',
        'dark-background': '#242938',
        'link-color': '#e6ae58',
        'text-color': '#0d8dd7',
        'white': '#d8dae5',
        'black': '#242938'
    }
}

new Component({
    self: {
        props: {
            'color': {
                value: Colors['DustBeach'],
                type: 'object'
            }
        },
        template: `
            <div id="topbar" m-comp></div>
        ` 
    },
    children: {

    }
})

console.log(Component, MountComponent);
