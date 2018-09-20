import { Component, ComputedProp } from 'Mew';
import imageSlider from './imageSlider';

export default new Component({
    self: {
        template: `
            <div id="page-home" m-comp="['imageSlider']">
                <div id="tile-info" class="tile is-ancestor">
                    <div class="tile is-4 is-parent">
                        <article class="tile is-child notification orange">
                            <span class="icon"><i class="fab fa-js-square"></i></span>
                            <p class="subtitle">Written using Vanilla JavaScript</p>
                        </article>
                    </div>
                    <div class="tile is-4 is-parent blue">
                        <article class="tile is-child notification blue">
                            <span class="icon"><i class="fas fa-sitemap"></i></span>
                            <p class="subtitle">Component based</p>
                        </article>
                    </div>
                    <div class="tile is-4 is-parent yellow">
                        <article class="tile is-child notification yellow">
                            <span class="icon"><i class="fab fa-js-square"></i></span>
                            <p class="subtitle">Written using Vanilla JavaScript</p>
                        </article>
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
