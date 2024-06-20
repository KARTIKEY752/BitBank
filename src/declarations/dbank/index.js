//dbank index.js  


import { Actor, HttpAgent } from "@dfinity/agent"; // Import Actor and HttpAgent
import { idlFactory } from './dbank.did.js';
export { idlFactory } from './dbank.did.js';

// CANISTER_ID is replaced by webpack based on node environment
export const canisterId = process.env.DBANK_CANISTER_ID;

/**
 * @param {string | import("@dfinity/principal").Principal} canisterId Canister ID of Agent
 * @param {{agentOptions?: import("@dfinity/agent").HttpAgentOptions; actorOptions?: import("@dfinity/agent").ActorConfig}} [options]
 * @return {import("@dfinity/agent").ActorSubclass<import("./dbank.did.js")._SERVICE>}
 */
export const createActorDbank = (canisterId, options) => {
  const agentOptions = {
    ...options?.agentOptions,
    verifyQuerySignatures: false,
  };
  const agent = new HttpAgent(agentOptions);

  if (process.env.NODE_ENV !== "production") {
    agent.fetchRootKey().catch(err => {
      console.warn("Unable to fetch root key. Check to ensure that your local replica is running");
      console.error(err);
    });
  }

  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...options?.actorOptions,
  });
};

/**
 * A ready-to-use actor for the dbank canister
 * @type {import("@dfinity/agent").ActorSubclass<import("./dbank.did.js")._SERVICE>}
 */
export const dbank = createActorDbank(canisterId);
