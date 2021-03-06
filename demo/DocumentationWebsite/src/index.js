import { Component, MountComponent, ComputedProp } from 'Mew';
import navbar from './navbar';
import footer from './footer';
import home from './pages/home/home.main';
import examples from './pages/examples/examples.main';
import docs from './pages/docs/docs.main';

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
            }.bind(this, body), 50);
        }
    },
    self: {
        props: {
            pageName: {
                value: 'home',
                type: 'string'
            },
            hasScrollbar: {
                value: false,
                type: 'bool'
            }
        },
        // here we specify navbar, body, and footer
        template: `
            <div id="content">
                <div id="navbar" m-comp="'navbar'"></div>
                <div id="body">
                    <div id="inner-content"
                        class="collapse-for-scroll"
                        m-bind:class="{ 'no-scroll': !this.hasScrollbar }" 
                        m-comp="this.pageName">
                    </div>
                </div>
                <div id="footer" class="footer" m-comp="'footer'"></div>
            </div>
        ` 
    },
    children: {
        components: {
            'navbar': { 
                definition: navbar,
                listeners: {
                    'changePage': function(pageChoice) {
                        this.pageName = pageChoice;
                    }
                },
            },
            footer: {
                definition: footer
            },
            'home': { 
                definition: home,
            },
            'documentation': {
                definition: docs,
            },
            'examples': {
                definition: examples,
            }
        }
    }
});

// Mount the Component
var comp = MountComponent('#main-mount-point', BaseComponent);
