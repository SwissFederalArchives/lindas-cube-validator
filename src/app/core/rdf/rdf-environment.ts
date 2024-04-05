
import rdf from '@zazuko/env'
import pretty from '@rdfjs-elements/formats-pretty'


rdf.formats.import(pretty);

export const rdfEnvironment = rdf;
