<template>
  <div id="app">
    <el-row class="main">
      <el-col :span="6">
        <NavSidebar />
      </el-col>
      <el-col :span="18">
        <router-view />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import NavSidebar from "@/components/static/NavSidebar";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "App",
  methods: {
    ...mapMutations(["clearMessage"]),
  },
  computed: {
    ...mapGetters(["getMessage"]),
  },
  watch: {
    getMessage(e) {
      if (e) {
        this.$message.error(e);
      }
      this.clearMessage();
    },
  },
  components: {
    NavSidebar,
  },
};
</script>
