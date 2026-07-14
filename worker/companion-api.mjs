import { handleRequest } from './state-core.mjs';

export default {
  fetch(request, env) {
    return handleRequest(request, env);
  }
};
