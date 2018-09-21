import { Component } from 'Mew';

export default new Component({
    self: {

        template: `
        <div class="level">
            <div class="level-left">
                <div class="level-item">Maintainer:</div>
                <div class="level-item">James Wasson</div>
                <div class="level-item github-link">
                    <a href="https://github.com/james-wasson/" target="_blank">
                        <span class="icon">
                            <i class="fab fa-github"></i>
                        </span>
                        <span>GitHub</span>
                    </a>
                </div>
            </div>
            <div class="level-right">
                <a id="made-with-bulma" class="level-item" href="https://bulma.io/" target="_blank"><img src="https://bulma.io/images/made-with-bulma.png"></img></a>
            </div>
        </div>
        `,
    }
});
