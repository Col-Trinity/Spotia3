import * as server from "./.open-next/server-functions/default/index.mjs";

export default {
  async fetch(request, env, ctx) {
    return server.fetch(request, env, ctx);
  }
};
