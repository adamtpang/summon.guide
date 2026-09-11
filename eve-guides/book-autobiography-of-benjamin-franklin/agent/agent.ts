import { defineAgent, defineDynamic } from 'eve';

export default defineAgent({
  defaultTools: false,
  model: defineDynamic({
    events: {
      'session.started': () => {
        throw new Error("Eve runtime not enabled for book:autobiography-of-benjamin-franklin: verify source grounding, auth, entitlement and approved model routing before activation.");
      },
    },
  }),
});
