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
          return true;
        } else {
          const er = new Error("Не удалось получить пользователей");
          throw er;
        }
      } catch (error) {
        commit("setMessage", error);
        return false;
      }
    },
    async fetchToAddUser({ dispatch, commit }, data) {
      try {
        const req = await dispatch("defaultFetch", data);
        if (req) {
          commit("addNewUser", req);
        } else {
          const er = new Error("Не удалось получить пользователей");
          throw er;
        }
      } catch (error) {
        commit("setMessage", error);
      }
    },
    async fetchToRenameUser({ dispatch, commit }, data) {
      try {
        const req = await dispatch("defaultFetch", data);
        if (req) {
          commit("renameUser", req);
        } else {
          const er = new Error("Не удалось переименовать пользователя");
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
      s.users.unshift(v);
    },
    renameUser(s, v) {
      s.users.find((user) => user.id == v.id).name = v.name;
    },
  },
  getters: {
    getUsers: (s) => s.users,
  },
};
