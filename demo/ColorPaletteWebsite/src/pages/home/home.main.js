import { Component, ComputedProp } from 'Mew';
import imageSlider from './imageSlider';

export default new Component({
    parent: {
    },
    self: {
        template: `
            <div id="page-home">
                <div id="intro" style="height: 100%; width: 100%;" m-comp="['imageSlider']">
                    <div id="cards" class="columns is-mobile is-multiline is-centered">
                        <div class="column is-half">
                            
                        </div>
                        <div class="column is-half">
                            
                        </div>
                        <div class="column is-half">
                            
                        </div>
                        <div class="column is-half">
                            
                        </div>
                        <div class="column is-half">
                            
                        </div>
                    </div>

                </div>
            </div>
        `,
    },
    children: {
        components: {
            imageSlider: {
                definition: imageSlider,
                prepend: true
            }
        }
    }
});
