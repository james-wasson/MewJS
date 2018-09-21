import { Component, ComputedProp } from 'Mew';

export default new Component({
    self: {
        props: {
            calcText: {
                value: function(e) {
                    var value = e.target.value.trim();
                    if (value && value.length > 0) {
                        this.nameText = "Hello " + value + "!";
                    } else {
                        this.nameText = '&nbsp';
                    }
                },
                type: 'function',
                frozen: true
            },
            nameText: {
                value: '&nbsp',
                type: 'string'
            }
        },
        template: `
            <h4 class="subtitle is-4">{{this.nameText}}</h4>
            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label" for="nameInput">Type Your Name: </label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <p class="control">
                            <input class="input" name="nameInput" id="nameInput" type="text"
                                m-on="{ input: this.calcText }">
                        </p>
                    </div>
                </div>
            </div>
        `,
    }
});
