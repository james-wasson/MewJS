import { Component, ComputedProp } from 'Mew';

export default new Component({
    parent: {
        props: ['wordString', 'isShown', 'duration']
    },
    self: {
        props: {
            'wordComponents': new ComputedProp({
                compute: function() {
                    var words = this.wordString.split(' ').filter(s => s.trim().length > 0);
                    console.log(this);
                    return words.reduce((s, w) => {
                        return s + '<text>'+w+' </text>';
                    }, '');
                },
                dynamic: true
            })
        },

        template: `
            {{this.wordComponents}}
        `,
    }
});
