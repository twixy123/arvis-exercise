<template>
  <div class="user-page-body router-page-body">
    <!-- фильтрация по постам -->
    <el-popover placement="right" width="400" trigger="click">
      <el-input
        placeholder="Впишите название поста"
        v-model="searchPosts"
        @input="querySearch"
      ></el-input>
      <i slot="reference" class="el-icon-search router-page-body__action"></i>
    </el-popover>
    <!-- фильтрация по постам -->
    <!-- изменение имени пользователя -->
    <UpdateItem
      :activeItemEssence="userName"
      :item="'user'"
      @renameUser="setUserName"
    />
    <!-- изменение имени пользователя -->
    <!-- Вывод постов для определенного пользователя -->
    <ul class="user-page-body__menu menu" v-if="posts.length > 0">
      <PostItem v-for="post in posts" :key="post.id" :post="post" />
    </ul>
    <!-- Вывод постов для определенного пользователя -->
    <!-- Добавить новый пост -->
    <AddPost />
    <!-- Добавить новый пост -->
  </div>
</template>

<script>
import PostItem from "@/components/users/PostItem";
import UpdateItem from "@/components/app/UpdateItem";
import AddPost from "@/components/posts/AddPost";
import { mapGetters } from "vuex";
export default {
  name: "User",
  data() {
    return {
      posts: [],
      userName: "",
      searchPosts: "",
    };
  },
  created() {
    this.searchPosts = "";
    this.findUser();
    this.setPosts(this.getPosts[`user_${this.$route.params.user_id}`]);
  },
  methods: {
    setPosts(posts) {
      if (posts && posts.length > 0) this.posts = posts;
      else this.posts = [];
    },
    findUser() {
      const user = this.getUsers.find(
        (user) => user.id == this.$route.params.user_id
      );
      this.setUserName(user ? user.name : "");
    },
    setUserName(userName) {
      this.userName = userName;
    },
    querySearch() {
      if (this.searchPosts == "") {
        this.setPosts(this.getPosts[`user_${this.$route.params.user_id}`]);
      } else {
        const posts = this.getPosts[`user_${this.$route.params.user_id}`].map(
          (e) => {
            return { ...e };
          }
        );
        this.setPosts(posts.filter(this.queryFilter(this.searchPosts)));
      }
    },
    queryFilter(str) {
      return (post) => {
        return post.title.toLowerCase().includes(str.toLowerCase());
      };
    },
  },
  computed: {
    ...mapGetters(["getPosts", "getFlagForPosts", "getUsers"]),
  },
  watch: {
    getFlagForPosts() {
      this.setPosts(this.getPosts[`user_${this.$route.params.user_id}`]);
    },
    getUsers() {
      this.findUser();
    },
    $route(to) {
      this.findUser();
      this.setPosts(this.getPosts[`user_${to.params.user_id}`]);
    },
  },
  components: {
    PostItem,
    UpdateItem,
    AddPost,
  },
};
</script>
