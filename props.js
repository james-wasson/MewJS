/*
 * Start create Props
 */

/*
 * End create Props
 */

/*
 * Start ProxyContext
 */

/*
 * End ProxyContext
 */

/*
 * Start create Component 
 */

var childComp = createComponent({
    parent: {
        props: { 
            'prop2Child': 'prop2-rename'
        },
        emit: ['event1']
    },
    self: {
        props: {
            'prop2': {
                value: 2,
                type: 'number',
            }
        },
        template: '<p>c1</p>',
        watchers: {
            'prop2Child': function(newVal, oldVal) {
                this.$emit.event1('uno', 'dos');
            }
        }
    }
});

var rootComp = createComponent({
    parent: {
    },
    self: {
        props: {
            'prop2': {
                value: 2,
                type: 'number',
            },
            'prop1': {
                value: true,
                type: 'boolean',
            },
            prop3: {
                value: "black",
                type: "string"
            },
            prop4: {
                value: function() {
                    return 'black';
                }
            },
            prop5: {
                value: function(e) { console.log('event called: ', e); }
            }
        },
        template: `
            <div  m-bind:style="{ 'color': prop4() }"
                m-show="true"
                m-if="prop1"
                m-on="{ 'click': prop5 }">
                asd
                <div m-comp="'component1'"></div>
            </div>`,
        watchers: {
            'prop2': function(newVal, oldVal) {
                console.log("root", oldVal, newVal);
            }
        }
    },
    children: {
        props: {
            'm-sub-top': {
                value: 2,
                type: 'number'
            }
        },
        components: {
            'component1': [{
                definition: childComp,
                props: {
                    'p-sub-bottom': {
                        value: 4,
                        type: 'number'
                    },
                    'prop2-rename': 'prop2'
                },
                listeners: {
                    'event1': function() {
                        console.log(arguments);
                    }
                }
            }]
        }
    }
});

document.addEventListener("DOMContentLoaded", function(event) { 
    addMountPoint('#mountPoint', rootComp);
});
