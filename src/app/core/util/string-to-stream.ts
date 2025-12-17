import { Readable } from 'stream-browserify';

/**
 * Convert a string to a readable stream (browser-compatible)
 * Replaces the string-to-stream package which has Node.js dependencies
 */
export function stringToStream(str: string): Readable {
  const readable = new Readable({
    read() {
      this.push(str);
      this.push(null);
    }
  });
  return readable;
}
