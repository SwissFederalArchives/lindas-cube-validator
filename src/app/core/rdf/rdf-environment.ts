
import rdf from '@lindas/env'
import Environment from '@lindas/env/Environment';
import FetchFactory from '@rdfjs/fetch-lite/Factory';

export const rdfEnvironment = new Environment([FetchFactory], {parent: rdf})
