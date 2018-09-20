import { Component, ComputedProp } from 'Mew';
import imageSlider from './imageSlider';

export default new Component({
    self: {
        template: `
            <div id="page-home" m-comp="['imageSlider']">
                <div id="tile-info" class="tile is-ancestor">
                    <div class="tile is-4 is-parent">
                        <article class="tile is-child notification orange">
                            <span class="icon fa-stack fa-2x">
                                <i class="fab fa-js-square fa-2x"></i>
                            </span>
                            <p class="subtitle"><b>Vanilla JavaScript</b></p>
                            <p class="subtitle">No need for a Virtual/Shadow DOM and <b>can be run in a native browser</b></p>
                        </article>
                    </div>
                    <div class="tile is-4 is-parent blue">
                        <article class="tile is-child notification blue">
                            <span class="icon fa-stack fa-2x">
                                <i class="fas fa-sitemap fa-2x"></i>
                            </span>
                            <p class="subtitle"><b>Component based</b></p>
                            <p class="subtitle">Easy creation and low component overhead, <b>don't fear the component</b></p>
                        </article>
                    </div>
                    <div class="tile is-4 is-parent yellow">
                        <article class="tile is-child notification yellow">
                            <span class="icon fa-stack fa-2x">
                                <i class="far fa-square fa-2x"></i>
                                <strong class="fa-stack-1x icon-text">R</strong>
                            </span>
                            <p class="subtitle"><b>Reactive</b></p>
                            <p class="subtitle"><b>Automatic updates to the DOM</b> when component properties change</p>
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
