<template>
  <div class="login_container">
    <div class="avatat_box">
      <img src="../assets/logo.png"/>
    </div>
    <div class="login_form">
      <el-form ref="form" :model="form" label-width="80px" size="mini">
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
        username: "admin",
        password: "123456"
      },
    };
  },
  methods: {
    onSubmit() {
        //验证前端的输入
        this.$refs.form.validate( async valid=>{
            console.log(valid)
            //解析服务端得到的返回数据
            const {data:res} = await this.$http.post("login",this.form)
            console.log('收到返回值====='+res)
            //通过返回值来确定是否
            if(res.code===200){
              this.$message.success("success")
               localStorage.setItem("user",res.user)               
                //控制路由跳转到对应home组件下
                this.$router.push({path:'/home'})               
            }else{
                this.$message.error(res.msg);
            }
        })
    },
    reset(){
        //重置表表单需要在表单item下指定props的名字 
        this.$refs.form.resetFields();
    }
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