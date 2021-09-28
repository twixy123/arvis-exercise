<template>
  <div class="add-user-wrapper">
    <el-button
      type="text"
      @click="dialogFormVisible = true"
      class="add-user-wrapper__btn"
    >
      Add User
    </el-button>

    <el-dialog
      title="Shipping address"
      :visible.sync="dialogFormVisible"
      class="add-user-wrapper__dialog"
    >
      <el-form :model="form">
        <el-form-item label="Promotion name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">
          Confirm
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: "",
      },
    };
  },
};
</script>
