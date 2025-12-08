import { GraphPointer } from "@lindas/clownface";
import { ClownfaceObject } from "../rdf/@lindas/clownface-object";

import { rdfEnvironment } from "../rdf/rdf-environment";
import { cube, sh } from "../rdf/namespace";


export class CubeDimension extends ClownfaceObject {
    constructor(node: GraphPointer) {
        super(node);
    }

    toRdf(): string {
        const dataset = rdfEnvironment.dataset([...this._node.dataset.match(this._node.term)]);
        return dataset.toCanonical();
    }
}

