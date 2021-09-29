<template>
  <div class="router-page-body post-page-body">
    <!-- Удалить пост -->
    <i
      class="el-icon-delete router-page-body__delete router-page-body__action"
      @click="deletePost"
    ></i>
    <!-- Удалить пост -->
    <!-- Изменить название поста -->
    <UpdateItem
      :activeItemEssence="post.title ? post.title : ''"
      :item="'postTitle'"
    />
    <!-- Изменить название поста -->
    <!-- Изменить тело поста -->
    <UpdateItem
      :activeItemEssence="post.body ? post.body : ''"
      :item="'postBody'"
    />
    <!-- Изменить тело поста -->
  </div>
</template>

<script>
import UpdateItem from "@/components/app/UpdateItem";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Post",
  data() {
    return {
      post: {},
    };
  },
  created() {
    this.setPost();
  },
  methods: {
    ...mapActions(["fetchDeletePost"]),
    setPost() {
      if (this.getPosts[`user_${this.$route.params.user_id}`]) {
        const post = this.getPosts[`user_${this.$route.params.user_id}`].find(
          (post) => post.id == this.$route.params.post_id
        );
        if (post) this.post = post;
        else this.post = {};
      } else this.post = {};
    },
    async deletePost() {
      const res = await this.fetchDeletePost({
        url: `${this.$api.POSTS}/${this.$route.params.post_id}`,
        method: "DELETE",
        body: {
          userId: this.$route.params.user_id,
          id: this.$route.params.post_id,
        },
      });
      if (res) {
        this.$router.push(`/user/${this.$route.params.user_id}`);
      }
    },
  },
  computed: {
    ...mapGetters(["getPosts", "getFlagForPosts"]),
  },
  watch: {
    getFlagForPosts() {
      this.setPost();
    },
  },
  components: {
    UpdateItem,
  },
};
</script>
