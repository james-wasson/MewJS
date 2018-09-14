import { typeChecker } from '../typeManager';
import { proxyContext } from '../proxyContext';

export default function(descriptor) {

    if (descriptor.hasOwnProperty('mounted')) {
        if (typeChecker.isFunction(descriptor.mounted)) {
            this.$hooks.$mounted = descriptor.mounted;
        } else {
            console.error('life cycle hooks must be of type function. At: ', descriptor);
        }
    }

    if (descriptor.hasOwnProperty('created')) {
        if (typeChecker.isFunction(descriptor.created)) {
            this.$hooks.$created = descriptor.created;
        } else {
            console.error('life cycle hooks must be of type function. At: ', descriptor);
        }
    }
}