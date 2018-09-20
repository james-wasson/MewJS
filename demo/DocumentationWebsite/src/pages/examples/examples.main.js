import { Component, ComputedProp } from 'Mew';
import reactiveTable from './reactiveTable'
import nameDisplay from './nameDisplay';

export default new Component({
    parent: {
    },
    self: {
        template: `
            <div id="page-examples">
                <div class="box reactive-table-box" m-comp="'reactiveTable'"></div>
                <div class="box name-display-box" m-comp="'nameDisplay'"></div>
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
