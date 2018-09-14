import { Component, MountComponent, ComputedProp } from 'Mew';
import topbar from './topbar/topbar.main';
import innerContent from './body/inner-content';

var initColor = 'DustBeach';

var BaseComponent = new Component({
    hooks: {
        mounted: function() {
            var body = document.getElementById('body');
            window.setInterval(function(body) {
                if (body.scrollHeight > body.offsetHeight) {
                    this.hasScrollbar = true;
                } else {
                    this.hasScrollbar = false;
                }
            }.bind(this, body), 300);
        }
    },
    self: {
        props: {
            hasScrollbar: {
                value: false,
                type: 'bool'
            },
            pickedColorKey: {
                value: initColor,
                type: 'string'
            },
            colors: {
                value: {
                    'DustBeach': {
                        'light-backgroud': '#74c0e3',
                        'dark-background': '#242938',
                        'link-color': '#e6ae58',
                        'text-color': '#0d8dd7',
                        'white': '#d8dae5',
                        'black': '#242938'
                    }
                },
                type: 'object'
            },
            colorKeys: new ComputedProp({
                compute: function () { 
                    return Object.keys(this.colors) },
                dynamic: true
            }),
            pickedColor: new ComputedProp({
                compute: function () {
                    return this.colors[this.pickedColorKey] },
                dynamic: true
            })
        },
        // here we specify topbar, body, and footer
        template: `
            <div id="content" m-bind:style="{ 'background-color': this.pickedColor['dark-background'] }">
                <div id="topbar" m-comp=""></div>
                <div id="body">
                    <div m-comp="'innerContent'"></div>
                </div>
                <div id="footer" m-comp=""></div>
            </div>
        ` 
    },
    children: {
        props: {
            'pickedColor': 'pickedColor',
            'colorChoices': 'colorKeys',
            'colors': 'colors'
        },
        components: {
            'topbar': { 
                definition: topbar,
                listeners: {
                    'changeColor': function(colorChoice) {
                        this.changeColor(colorChoice);
                    }
                },
            },
            'innerContent': { 
                definition: innerContent,
                listeners: {
                    'changeColor': function(colorChoice) {
                        this.changeColor(colorChoice);
                    }
                },
                props: ['hasScrollbar']
            }
        }
    }
});

// Mount the Component
document.addEventListener("DOMContentLoaded", function(){
    var comp = MountComponent('#main-mount-point', BaseComponent);
});
