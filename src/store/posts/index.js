export default {
  state: {
    posts: {},
    flagForPosts: false,
  },
  actions: {
    async fetchPosts({ commit, dispatch }, data) {
      try {
        const req = await dispatch("defaultFetch", data);
        if (req) {
          commit("setPosts", req);
          commit("changeFlagForPosts");
        } else {
          const er = new Error("Не удалось получить посты");
          throw er;
        }
      } catch (error) {
        commit("setMessage", error);
      }
    },
    async fetchToUpdatePost({ dispatch, commit }, data) {
      try {
        const req = await dispatch("defaultFetch", data);
        if (req) {
          commit("renamePost", req);
          commit("changeFlagForPosts");
        } else {
          const er = new Error("Не удалось переименовать пост");
          throw er;
        }
      } catch (error) {
        commit("setMessage", error);
        return false;
      }
    },
    async fetchAddPost({ dispatch, commit }, data) {
      try {
        console.log("-----------------");
        console.log(new Date());
        console.log("fetchAddPost", data);
        console.log("-----------------");
        const req = await dispatch("defaultFetch", data);
        if (req) {
          commit("addPost", req);
          commit("changeFlagForPosts");
        } else {
          const er = new Error("Не удалось добавить пост");
          throw er;
        }
      } catch (error) {
        commit("setMessage", error);
      }
    },
    async fetchDeletePost({ dispatch, commit }, { url, method, body }) {
      try {
        const req = await dispatch("defaultFetch", { url, method });
        if (req) {
          commit("deletePost", body);
          commit("changeFlagForPosts");
          return true;
        } else {
          const er = new Error("Не удалось удалить пост");
          throw er;
        }
      } catch (error) {
        commit("setMessage", error);
      }
    },
  },
  mutations: {
    setPosts(s, v) {
      v.forEach((post) => {
        addPost(s.posts, post);
      });
    },
    addPost(s, v) {
      addPost(s.posts, v);
    },
    changeFlagForPosts(s) {
      s.flagForPosts = !s.flagForPosts;
    },
    renamePost(s, v) {
      s.posts[`user_${v.userId}`].find((post) => post.id == v.id)[v.type] =
        v[v.type];
    },
    deletePost(s, v) {
      s.posts[`user_${v.userId}`] = s.posts[`user_${v.userId}`].filter(
        (post) => post.id != v.id
      );
    },
  },
  getters: {
    getPosts: (s) => s.posts,
    getFlagForPosts: (s) => s.flagForPosts,
  },
};

function addPost(posts, post) {
  if (!posts[`user_${post.userId}`]) posts[`user_${post.userId}`] = [];
  if (!posts[`user_${post.userId}`].some((p) => p.id == post.id)) {
    posts[`user_${post.userId}`].unshift(post);
  }
}
