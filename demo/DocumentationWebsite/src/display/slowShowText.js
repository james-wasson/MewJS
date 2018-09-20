import { Component, ComputedProp } from 'Mew';

var FADEIN_TIME = 50;

// makes the element fade in
var fadeInElement = function(self, element) {
    element.style.opacity = "0";
    var currOpacity = 0;
    var interval = window.setInterval(function() {
        if (!self.shouldShow) {
            window.clearInterval(interval);
            element.style.opacity = "0";
        }
        currOpacity += (1/FADEIN_TIME);
        if (currOpacity >= .98) { // .98 because of rounding errors
            element.style.opacity = '1';
            window.clearInterval(interval);
        } else {
            element.style.opacity = currOpacity.toString();
        }
    }, 1);
}

var slowShowTextComponent = new Component({
    parent: {
        props: ['word', 'shouldShow', 'waitBeforeShow']
    },
    self: {
        props: {
            timeout: {
                value: null,
            },
            fadeInElement: {
                value: function(force) {
                    var element = this.$nodes.filter(n => n.classList && n.classList.contains('slow-show-text'))[0];
                    if (force) {
                        fadeInElement(this, element);
                    } else {
                        this.timeout = window.setTimeout(function() {
                            if (this.shouldShow)
                                fadeInElement(this, element);
                            if (!this.shouldShow) {
                                window.clearInterval(this.timeout)
                                element.style.opacity = "0";
                            }
                        }.bind(this), this.waitBeforeShow)
                    }
                },
                type: 'function',
                frozen: true
            },
            hideElement: {
                value: function() {
                    window.clearTimeout(this.timeout);
                    var element = this.$nodes.filter(n => n.classList && n.classList.contains('slow-show-text'))[0];
                    element.style.opacity = "0";
                },
                type: 'function',
                frozen: true
            }
        },
        watchers: {
            'shouldShow': function(shouldShow) { 
                if (shouldShow) this.fadeInElement();
                else this.hideElement();
            }
        },
        template: '<span class="slow-show-text" style="opacity: 0;">{{this.word}} </span>'
    }
})

export default new Component({
    parent: {
        props: ['wordString', 'isShown', 'durationPerWord', 'showOverlap']
    },
    self: {
        template: `
            <span m-comp="'wordList'"></span>
        `,
    },
    children: {
        components: {
            'wordList': new ComputedProp({
                compute: function() {
                    var words = this.wordString.split(' ').filter(w => w.trim().length > 0);
                    var showOverlapSum = 0;
                    return words.map(word => {
                        var rv = {
                            definition: slowShowTextComponent,
                            props: {
                                word: {
                                    value: word,
                                    type: 'string'
                                },
                                shouldShow: 'isShown',
                                waitBeforeShow: {
                                    value: showOverlapSum
                                }
                            }
                        }
                        showOverlapSum += this.showOverlap;
                        return rv;
                    })
                },
                dynamic: true
            })
        }
    }
});
