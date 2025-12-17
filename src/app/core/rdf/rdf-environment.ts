import rdf from '@lindas/env'
import Environment from '@lindas/env/Environment';
import FetchFactory from '@rdfjs/fetch-lite/Factory';
import formats from '@lindas/formats-lazy';

const env = new Environment([FetchFactory], {parent: rdf})

// Import parsers and serializers from @lindas/formats-lazy
env.formats.import(formats)

export const rdfEnvironment = env
