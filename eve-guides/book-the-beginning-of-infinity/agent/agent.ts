import { defineAgent, defineDynamic } from 'eve';

export default defineAgent({
  defaultTools: false,
  model: defineDynamic({
    events: {
      'session.started': () => {
        throw new Error("Eve runtime not enabled for book:the-beginning-of-infinity: verify source grounding, auth, entitlement and approved model routing before activation.");
      },
    },
  }),
});
