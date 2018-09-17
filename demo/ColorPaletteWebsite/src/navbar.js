import { Component } from 'Mew';

export default new Component({
    parent: {
        emit: ['changePage']
    },
    self: {
        props: {
            'isActive': {
                value: false,
                type: 'bool'
            },
        },
        template: `
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <div id="navbar-logo">
                    <img id="navbar-logo-img" src="/assets/LogoName.svg" alt="Logo of MewJS" m-on="{ click: () => this.$emit.changePage('home') }">
                </div>

                <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" m-bind:class="{ 'is-active': this.isActive }" m-on="{ click: () => this.isActive = !this.isActive }">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div class="navbar-menu"  m-bind:class="{ 'is-active': this.isActive }">
                <div class="navbar-end">
                    <a class="navbar-item button is-link" href="https://github.com/james-wasson/MewJS" target="_blank">
                        <span class="icon">
                            <i class="fab fa-github"></i>
                        </span>
                        <span>GitHub</span>
                    </a>

                    <a class="navbar-item button is-link" m-on="{ click: () => this.$emit.changePage('documentation') }">
                        <span class="icon">
                            <i class="fas fa-book"></i>
                        </span>
                        <span>Docs</span>
                    </a>

                    <nutton class="navbar-item button is-link" m-on="{ click: () => this.$emit.changePage('examples') }">
                        <span class="icon">
                            <i class="fas fa-code"></i>
                        </span>
                        <span>Examples</span>
                    </a>
                </div>
            </div>
        </nav> 
        `,
    }
});
