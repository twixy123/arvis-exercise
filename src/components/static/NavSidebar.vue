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
  created() {
    this.fetchUsers({
      url: this.$api.GET_USERS,
      method: "GET",
    });
  },
  methods: {
    ...mapActions(["fetchUsers"]),
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
