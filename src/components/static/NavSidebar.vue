<template>
  <div class="nav-sidebar">
    <Search />
    <ul class="users-menu menu">
      <UserItem v-for="user in getUsers" :key="user.id" :user="user" />
    </ul>
    <AddUser />
  </div>
</template>

<script>
import Search from "./Search";
import UserItem from "./UserItem";
import AddUser from "./AddUser";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "NavSidebar",
  data() {
    return {
      users: [],
    };
  },
  async created() {
    const userRes = await this.fetchUsers({
      url: this.$api.USERS,
      method: "GET",
    });
    if (userRes) {
      this.fetchPosts({
        url: this.$api.POSTS,
        method: "GET",
      });
    }
  },
  methods: {
    ...mapActions(["fetchUsers", "fetchPosts"]),
  },
  computed: {
    ...mapGetters(["getUsers"]),
  },
  components: {
    Search,
    UserItem,
    AddUser,
  },
};
</script>
