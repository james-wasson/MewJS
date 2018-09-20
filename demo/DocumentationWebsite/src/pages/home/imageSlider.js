import { Component, ComputedProp } from 'Mew';
import slowShowWords from '../../display/slowShowText';
import redoButton from '../../standard/redoButton';

export default new Component({
    self: {
        props: {
            'active': {
                value: false,
                type: 'bool'
            },
            'wordString': {
                value: `MewJs is a reactive javascript framework designed to be low impact but still provide all 
                        the functionality of a full full-fledged component framework.`,
                type: 'string'
            },
        },
        template: `
            <div id="image-slider" class="box home-component" 
                m-bind:class="{ 'animation-active': this.active, 'redo-animation-active': this.active }" 
                m-on="{ mouseenter: () => this.active = true }">
                <div id="image-slider-container" style="position:relative" m-comp="'redoButton'">
                    <img id="image-slider-logo-img" src="/assets/LogoName.svg" alt="Logo of MewJS">
                    <div id="image-slider-letter-cover"></div>
                </div>

                <div id="image-slider-text" class="box">
                    <h5 class="title is-5" m-comp="'slowShowWords'"></h5>
                </div>
            </div>
        `,
    },
    children: {
        props: ['wordString'],
        components: {
            'slowShowWords': {
                definition: slowShowWords,
                props: {
                    'isShown': 'active',
                    durationPerWord: {
                        value: 80,
                        type: 'int'
                    },
                    showOverlap: {
                        value: 30,
                        type: 'int'
                    }
                }
            },
            'redoButton': {
                definition: redoButton,
                prepend: true,
                listeners: {
                    'redo': function() {
                        this.active = false;
                    },
                }
            }
        }
    }
});
