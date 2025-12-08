
import rdf from '@lindas/env'
//import pretty from '@rdfjs-elements/formats-pretty'
import pretty from '@rdfjs/formats'
import Environment from '@lindas/env/Environment';
import FetchFactory from '@rdfjs/fetch-lite/Factory';


rdf.formats.import(pretty);

export const rdfEnvironment = new Environment([FetchFactory], {parent: rdf})
