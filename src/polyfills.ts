// Set up global and process BEFORE any imports that might need them
(window as any).global = window;
(window as any).process = require('process/browser');

(window as any).global.Buffer =
    (window as any).global.Buffer || require('buffer').Buffer;

// Provide browser-compatible util shim to suppress warnings
// The util npm package requires process, so we provide a minimal shim instead
(window as any).global.util = {
    debuglog: () => () => {},
    inspect: (obj: unknown) => JSON.stringify(obj, null, 2),
    deprecate: <T extends Function>(fn: T) => fn,
    promisify: <T extends Function>(fn: T) => fn,
};

