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

        <div v-for="o in 2" :key="o" class="text item">
          {{ "列表内容 " + o }}
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserList",
  data() {
    return {
      input: "",
    };
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
