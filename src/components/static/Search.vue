<template>
  <div class="nav-search">
    <el-autocomplete
      class="nav-search__autocomplete-body"
      v-model="user"
      :fetch-suggestions="querySearch"
      placeholder="Users search"
      @select="handleSelect"
    ></el-autocomplete>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      users: [
        {
          name: "Петя",
        },
        {
          name: "Гриша",
        },
      ],
      user: "",
    };
  },
  methods: {
    querySearch(queryString, cb) {
      const users = this.users;
      const results = queryString
        ? users.filter(this.createFilter(queryString))
        : users;
      cb(results);
    },
    createFilter(queryString) {
      return (user) => {
        return user.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
      };
    },
    handleSelect(item) {
      console.log(item);
    },
  },
};
</script>
