import { Component, ComputedProp } from 'Mew';

var FADEIN_TIME = 50;

// makes the element fade in
var fadeInElement = function(element) {
    element.style.opacity = "0";
    var currOpacity = 0;
    var interval = window.setInterval(function() {
        currOpacity += (1/FADEIN_TIME);
        if (currOpacity >= .98) { // .98 because of rounding errors
            element.style.opacity = '1';
            window.clearInterval(interval);
        } else {
            element.style.opacity = currOpacity.toString();
        }
    }, 1);
}

var fadeInElementArray = function(elements, timePerElement, overlap, callback) {
    var timePerEach = timePerElement - overlap > 0 ? timePerElement - overlap : 0;
    var currentInterval = window.setInterval(function() {
        fadeInElement(elements.shift(), timePerElement);
        if (elements.length <= 0) {
            window.clearInterval(currentInterval);
            callback();
        }
    }, timePerEach);
    return currentInterval;
}

function clearIntervalSetNull(interval) {
    if (interval) {
        window.clearInterval(interval);
    }
    return null;
}

export default new Component({
    parent: {
        props: ['wordString', 'isShown', 'durationPerWord', 'showOverlap']
    },
    self: {
        props: {
            currentInterval: {
                value: null
            },
            'wordComponents': new ComputedProp({
                compute: function() {
                    var words = this.wordString.split(' ').filter(w => w.trim().length > 0);
                    return words.reduce((s, w) => {
                        return s + '<span class="slow-show-text" style="opacity: 0;">'+w+' </span>';
                    }, '');
                },
                dynamic: true
            }),
            'onShown': {
                // if force is specified and isShown is true, all elements get opacity 1
                value: function(force) {
                    this.currentInterval = clearIntervalSetNull(this.currentInterval);
                    var elements = [...this.$rootNode.getElementsByClassName('slow-show-text')];
                    if (this.isShown) {
                        if (force) {
                            elements.forEach(el => el.style.opacity = "1");
                        } else {
                            this.currentInterval = fadeInElementArray(elements, this.durationPerWord, this.showOverlap, function() {
                                this.currentInterval = null;
                            }.bind(this));
                        }
                    } else {
                        elements.forEach(el => el.style.opacity = "0");
                    }
                },
                type: 'function',
                frozen: true
            }
        },
        watchers: {
            isShown: function() { this.onShown() },
            wordString: function() { this.onShown(true) }
        },
        template: `
            {{this.wordComponents}}
        `,
    }
});
