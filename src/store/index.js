import Vue from "vue";
import Vuex from "vuex";
import users from "./users";
import posts from "./posts";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    message: null,
  },
  actions: {
    async defaultFetch(ctx, { url, body = null, method }) {
      const headers = {
        "Content-type": "application/json",
      };
      body = body ? JSON.stringify(body) : null;

      const reqBody = {
        headers,
        body,
        method,
      };
      const req = await fetch(url, reqBody);
      let res;
      if (req.ok) {
        res = await req.json();
        return res;
      } else {
        return false;
      }
    },
  },
  mutations: {
    setMessage(s, v) {
      s.message = v;
    },
    clearMessage(s) {
      s.message = null;
    },
  },
  getters: {
    getMessage: (s) => s.message,
  },
  modules: {
    users,
    posts,
  },
});
