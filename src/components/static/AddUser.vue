<template>
  <div class="add-user-wrapper">
    <el-button
      type="text"
      @click="dialogFormVisible = true"
      class="add-user-wrapper__btn"
    >
      Добавить пользователя
    </el-button>

    <el-dialog
      title="Добавить пользователя"
      :visible.sync="dialogFormVisible"
      class="add-user-wrapper__dialog"
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="Имя пользователя" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="Email пользователя" prop="email">
          <el-input v-model="form.email" type="email"></el-input>
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
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: "",
        email: "",
      },
      rules: {
        email: [
          {
            required: true,
            message: "Заполните поле.",
            trigger: "blur",
          },
          {
            type: "email",
            message: "Введите корректный email адрес.",
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "Заполните поле.",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.$root.$on("openAddUserWrapper", () => {
      this.dialogFormVisible = true;
    });
  },
  methods: {
    ...mapActions(["fetchToAddUser"]),
    submitForm(refName) {
      this.$refs[refName].validate((valid) => {
        if (valid) {
          this.fetchToAddUser({
            method: "POST",
            body: {
              name: this.form.name,
              email: this.form.email,
            },
            url: this.$api.USERS,
          });
          this.dialogFormVisible = false;
        }
      });
    },
  },
  computed: {
    ...mapGetters(["getUsers"]),
  },
};
</script>
