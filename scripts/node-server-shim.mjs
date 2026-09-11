// Lets plain Node import Next.js server modules for scripts and smoke tests:
// resolves the `server-only` marker to an empty module and lets extensionless
// relative imports fall back to their `.ts` file, which Next's bundler
// resolution already allows.
//
//   node --experimental-transform-types --import ./scripts/node-server-shim.mjs scripts/<script>.mjs
import { register } from "node:module";

const hooks = `
export async function resolve(specifier, context, next) {
  if (specifier === "server-only") {
    return { url: "data:text/javascript,export {};", shortCircuit: true };
  }
  try {
    return await next(specifier, context);
  } catch (error) {
    if (specifier.startsWith(".") && !/\\.[a-z]+$/i.test(specifier)) {
      return next(specifier + ".ts", context);
    }
    throw error;
  }
}
`;

register(`data:text/javascript,${encodeURIComponent(hooks)}`, import.meta.url);
