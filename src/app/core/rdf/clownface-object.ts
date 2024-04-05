import { GraphPointer } from 'clownface';

import { rdfEnvironment } from './rdf-environment';

export abstract class ClownfaceObject {

    static getPredicatesForNode(node: GraphPointer): string[] {
        const predicateSet = new Set<string>([...node.dataset.match(rdfEnvironment.namedNode(node.value))].map(quad => quad.predicate.value));
        return [...predicateSet];
    }

    protected readonly _node: GraphPointer;

    constructor(node: GraphPointer) {
        this._node = node;
    }

    get iri(): string {
        return this._node.value;
    }

    availablePredicates(): string[] {
        return ClownfaceObject.getPredicatesForNode(this._node);
    }
}