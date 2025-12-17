
import rdf from '@lindas/env'
import Environment from '@lindas/env/Environment';
import FetchFactory from '@rdfjs/fetch-lite/Factory';

// Note: rdf.formats.import() was causing runtime errors with @rdfjs/formats v4
// The base formats from @lindas/env should be sufficient for SPARQL construct results

export const rdfEnvironment = new Environment([FetchFactory], {parent: rdf})
