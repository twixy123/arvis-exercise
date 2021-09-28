export default {
  state: {
    users: [],
  },
  actions: {
    async fetchUsers({ commit, dispatch }, data) {
      try {
        const req = await dispatch("defaultFetch", data);
        if (req) {
          commit("setUsers", req);
        } else {
          const er = new Error("Не удалось получить пользователей");
          throw er;
        }
      } catch (error) {
        commit("setMessage", error);
      }
    },
  },
  mutations: {
    setUsers(s, v) {
      s.users = v;
    },
    addNewUser(s, v) {
      s.users.push(v);
    },
  },
  getters: {
    getUsers: (s) => s.users,
  },
};
