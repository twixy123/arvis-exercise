<template>
  <div class="nav-search search">
    <el-autocomplete
      class="nav-search__autocomplete-body search__autocomplete-body"
      v-model="user"
      :fetch-suggestions="querySearch"
      placeholder="Поиск пользователя"
      popper-class="nav-search__autocomplete-template search__autocomplete-template"
    >
      <template slot-scope="{ item }">
        <router-link
          v-if="!item.no_user"
          :to="`/user/${item.id}`"
          class="nav-search__autocomplete-item search__autocomplete-item"
        >
          {{ item.name }}
        </router-link>
        <span
          v-else
          class="nav-search__autocomplete-item search__autocomplete-item"
          @click="$root.$emit('openAddUserWrapper')"
        >
          Пользователя с таким именем нет в базе, возможно вы хотите его
          добавить
        </span>
      </template>
    </el-autocomplete>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Search",
  data() {
    return {
      user: "",
    };
  },
  methods: {
    querySearch(queryString, cb) {
      const users = this.getUsers;
      const results = queryString
        ? users.filter(this.createFilter(queryString))
        : users;
      if (results.length > 0) cb(results);
      else cb([{ no_user: true }]);
    },
    createFilter(queryString) {
      return (user) => {
        return user.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
      };
    },
  },
  computed: {
    ...mapGetters(["getUsers"]),
  },
};
</script>
