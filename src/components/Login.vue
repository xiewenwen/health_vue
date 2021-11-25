<template>
  <div class="login_container">
    <div class="avatat_box">
      <img src="../assets/logo.png"/>
    </div>
    <div class="login_form">
      <el-form ref="form" :model="form" label-width="80px" size="mini">
        <el-form-item label="用户名">
          <el-input v-model="form.username"
            ><i slot="prefix" class="el-input__icon el-icon-search"></i
          ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登录</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log(this.form.password);
    },
  },
};
</script>

<style lang="less" scoped>
.login_form {
  width: 340px;
  height: 300px;
  background-color: skyblue;
  position: absolute;
  left: 35%;
}
.login_box {
  width: 370px;
}
.login_container {
  background-color: skyblue;
  height: 100%;
}
</style>