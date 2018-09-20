import { Component, ComputedProp } from 'Mew';
import reactiveTable from './reactiveTable'

export default new Component({
    parent: {
    },
    self: {
        template: `
            <div id="page-examples">
                <div class="box reactive-table-box" m-comp="'reactiveTable'"></div>
            </div>
        `,
    },
    children: {
        components: {
            reactiveTable: {
                definition : reactiveTable
            }
        }
    }
});
