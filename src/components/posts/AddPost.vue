<template>
  <div>
    <el-button
      type="text"
      @click="dialogFormVisible = true"
      class="add-post-wrapper__btn"
    >
      Добавить пост
    </el-button>
    <el-dialog
      title="Добавить новый пост"
      :visible.sync="dialogFormVisible"
      class="add-post-wrapper__dialog"
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="Название нового поста" prop="name">
          <el-input placeholder="Название поста" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="Пост" prop="body">
          <el-input
            class="add-post-wrapper__dialog__textarea"
            type="textarea"
            placeholder="Напищите о чем думаете."
            v-model="form.body"
            :rows="3"
          ></el-input>
        </el-form-item>
        <el-form-item class="search" label="Выберите пользователя" prop="user">
          <el-autocomplete
            class="search__autocomplete-body"
            v-model="form.user"
            :fetch-suggestions="querySearch"
            placeholder="Поиск пользователя"
            popper-class="search__autocomplete-template"
            @select="handleSelect"
          >
            <template slot-scope="{ item }">
              <span class="search__autocomplete-item">
                {{ item.name }}
              </span>
            </template>
          </el-autocomplete>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Отмена</el-button>
        <el-button type="primary" @click="submitForm('form')">
          Подтвердить
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      dialogFormVisible: false,
      selectedUser: {},
      form: {
        name: "",
        user: "",
        body: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "Заполните поле.",
            trigger: "blur",
          },
        ],
        user: [
          {
            required: true,
            message: "Выберите пользователя.",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions(["fetchAddPost"]),
    submitForm(refName) {
      this.$refs[refName].validate((valid) => {
        if (valid) {
          this.fetchAddPost({
            url: this.$api.POSTS,
            body: {
              title: this.form.name,
              userId: this.selectedUser.id,
              body: this.form.body,
            },
            method: "POST",
          });
          this.form.name = "";
          this.form.user = "";
          this.selectedUser = {};
          this.dialogFormVisible = false;
        }
      });
    },
    querySearch(queryString, cb) {
      const users = this.getUsers;
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
    handleSelect(user) {
      this.form.user = user.name;
      this.selectedUser = user;
    },
  },
  computed: {
    ...mapGetters(["getUsers"]),
  },
};
</script>
