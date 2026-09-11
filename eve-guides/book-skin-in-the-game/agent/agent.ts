import { defineAgent, defineDynamic } from 'eve';

export default defineAgent({
  defaultTools: false,
  model: defineDynamic({
    events: {
      'session.started': () => {
        throw new Error("Eve runtime not enabled for book:skin-in-the-game: verify source grounding, auth, entitlement and approved model routing before activation.");
      },
    },
  }),
});
