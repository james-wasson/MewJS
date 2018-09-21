import { Component, ComputedProp } from 'Mew';
import reactiveTable from './reactiveTable'
import nameDisplay from './nameDisplay';

export default new Component({
    self: {
        template: `
            <div id="page-examples">
                <div class="columns">
                    <div class="column is-two-thirds">
                        <div class="box reactive-table-box" m-comp="'reactiveTable'"></div>
                    </div>
                    <div class="column">
                        code goes here
                    </div>
                </div>
                <div class="columns">
                    <div class="column is-two-thirds">
                        <div class="box name-display-box" m-comp="'nameDisplay'"></div>
                    </div>
                    <div class="column">
                        code goes here
                    </div>
                </div>
            </div>
        `,
    },
    children: {
        components: {
            reactiveTable: {
                definition : reactiveTable
            },
            nameDisplay: {
                definition : nameDisplay
            }
        }
    }
});
