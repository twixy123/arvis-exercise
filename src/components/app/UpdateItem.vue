<template>
  <input
    v-if="item != 'postBody'"
    type="text"
    v-model="localEssence"
    ref="updateItemInput"
    class="router-page-body__name"
    @blur="updateItem"
    @keypress.enter="$refs.updateItemInput.blur()"
  />
  <textarea
    v-else
    placeholder="Начните писать..."
    ref="updateItemtextArea"
    v-model="localEssence"
    class="router-page-body__body"
    @blur="updateItem"
    @keypress.enter.exact="$refs.updateItemtextArea.blur()"
  ></textarea>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    activeItemEssence: {
      type: String,
      required: true,
    },
    item: [String],
  },
  data() {
    return {
      localEssence: "",
    };
  },
  created() {
    this.localEssence = this.activeItemEssence;
  },
  methods: {
    ...mapActions(["fetchToRenameUser", "fetchToUpdatePost"]),
    async updateItem() {
      if (this.activeItemEssence != this.localEssence) {
        if (this.item == "user") {
          this.fetchToRenameUser({
            url: `${this.$api.USERS}/${this.$route.params.user_id}`,
            method: "PUT",
            body: {
              id: this.$route.params.user_id,
              name: this.localEssence,
            },
          });
          this.$emit("renameUser", this.localEssence);
        } else if (this.item.includes("post")) {
          const body = {
            id: this.$route.params.post_id,
            userId: this.$route.params.user_id,
          };
          if (this.item == "postTitle") {
            body.title = this.localEssence;
            body.type = "title";
          } else if (this.item == "postBody") {
            body.body = this.localEssence;
            body.type = "body";
          }
          const res = await this.fetchToUpdatePost({
            url: `${this.$api.POSTS}/${this.$route.params.post_id}`,
            method: "PUT",
            body,
          });
          if (!res) {
            this.localEssence = this.activeItemEssence;
          }
        }
      }
    },
  },
  watch: {
    activeItemEssence(e) {
      this.localEssence = e;
    },
  },
};
</script>
