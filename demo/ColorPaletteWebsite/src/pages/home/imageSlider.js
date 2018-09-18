import { Component, ComputedProp } from 'Mew';
import slowShowWords from '../../display/slowShowText';

export default new Component({
    self: {
        props: {
            'imageSliderActive': {
                value: false,
                type: 'bool'
            },
            'wordString': {
                value: `MewJs is a reactive javascript framework designed on low startup cost (you don't event need a server) and simpicity of use.
                Our object is to provide an easy componentize framework for building lo`,
                type: 'string'
            },
        },
        template: `
            <div id="image-slider" class="home-component" m-bind:class="{ 'animation-active': this.imageSliderActive }" m-on="{ mouseenter: () => this.imageSliderActive = true }">
                <div style="position:relative">
                    <div class="redo-animation" m-on="{ click: () => this.imageSliderActive = false }"><i class="fas fa-redo"></i></div>
                    <img id="image-slider-logo-img" src="/assets/LogoName.svg" alt="Logo of MewJS">
                    <div id="image-slider-letter-cover"></div>
                </div>

                <div id="image-slider-text" class="container is-fluid">
                    <div class="box" m-comp="'slowShowWords'">
                        
                    </div>
                </div>
            </div>
        `,
    },
    children: {
        components: {
            'slowShowWords': {
                definition: slowShowWords,
                props: {
                    'isShown': 'imageSliderActive',
                    durationPerWord: {
                        value: 80,
                        type: 'int'
                    },
                    showOverlap: {
                        value: 20,
                        type: 'int'
                    }
                }
            }
        }
    }
});
