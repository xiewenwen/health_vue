<template>
  <div class="login_container">
    <div style="display: flex; height: 100px">
      <!-- <transition name="el-zoom-in-center">
        <div v-show="show2" class="transition-box">never</div>
      </transition>

      <transition name="el-zoom-in-top">
        <div v-show="show2" class="transition-box">stop</div>
      </transition>

      <transition name="el-zoom-in-bottom">
        <div v-show="show2" class="transition-box">stop</div>
      </transition> -->
    </div>
    <div class="login_box"></div>
    <div class="login_form">
      <el-form
        class="form_style"
        ref="form"
        :model="form"
        label-width="60px"
        size="medium"
      >
        <el-form-item prop="username">
          <el-input v-model="form.username"
            ><i slot="prefix" class="el-input__icon el-icon-search"></i
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登录</el-button>
          <el-button @click="reset">重置</el-button>
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
        username: "ashin",
        password: "123456",
      },
      show2: false,
    };
  },
  methods: {
    onSubmit() {
      //验证前端的输入
      this.$refs.form.validate(async (valid) => {
        console.log(valid);
        //解析服务端得到的返回数据
        const { data: res } = await this.$http.post("login", this.form);
        console.log("收到返回值=====" + res);
        //通过返回值来确定是否
        if (res.code === 200) {
          this.$message.success("success");
          localStorage.setItem("user", res.user);
          //控制路由跳转到对应home组件下
          this.$router.push({ path: "/home" });
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    reset() {
      //重置表表单需要在表单item下指定props的名字
      this.$refs.form.resetFields();
    },
  },
  mounted() {
    setInterval(() => {
      this.show2 = true;
    }, 800);
  },
};
</script>

<style lang="less">
.login_form {
  width: 338px;
  height: 360px;
  // background-color: skyblue;
  position: absolute;
  left: 60%;
  margin-top: 10%;
  z-index: 999;
  border-radius: 15px;
  border: 2px solid white;
}

.form_style {
  margin-top: 80px;
  margin-right: 50px;
  padding: 0;
}

.login_box {
  width: 340px;
  height: 360px;
  left: 60%;
  margin-top: 10%;
  z-index: 1;
  position: absolute;
  background-color: #74759b;
  opacity: 0.5;
  // 毛玻璃控制效果
  filter: blur(5px);
}
.login_container {
  margin-top: 0px;
  height: 100%;
  width: 100%;
  background-image: linear-gradient(to right, #74afc7, #4f89b8, #299cdf);
}
.transition-box {
  margin-bottom: 0px;
  width: 200px;
  height: 100px;
  border-radius: 4px;
  background-color: #409eff;
  text-align: center;
  color: #fff;
  padding: 40px 20px;
  box-sizing: border-box;
  margin-right: 20px;
}
</style>
