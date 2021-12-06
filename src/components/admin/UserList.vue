<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <el-card class="box-card">
        <el-row class="con">
          <el-col :span="6" class="con">
            <el-input placeholder="请输入内容" v-model="input" clearable>
            </el-input>
          </el-col>
          <el-col :span="2">
            <el-button type="danger" @click="searchUserList">搜索</el-button>
          </el-col>
        </el-row>

        <!-- <div v-for="o in 2" :key="o" class="text item">
          {{ "列表内容 " + o }}
        </div> -->
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserList",
  data() {
    return {
      //查询信息实体
      queryInfo: {
        query: "admin",
        pageNum: 1,
        pageSize: 10,
      },
      input: "",
      userList: [],
      total: 0, //总数量
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    //获取的用户
    async getUserList() {
      console.log("获取所有的用户列表");
      const { data: res } = await this.$http.get("/user/all", {
        params: this.queryInfo,
      });
      this.userList = res.data;
      this.total = res.num;
      console.log(res);
    },
    searchUserList() {
      console.log("查询用户");
    },
  },
};
</script>

<style>
.text {
  font-size: 14px;
}
.con {
  height: 80px;
}
.item {
  margin-bottom: 8px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 1200px;
  margin-top: 18px;
  margin-left: 0px;
}
</style>
