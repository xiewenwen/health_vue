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
        <template>
          <el-table :data="userList" border stripe>
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="username" label="用户名"> </el-table-column>
            <el-table-column prop="email" label="邮件"> </el-table-column>
            <el-table-column prop="role" label="角色"> </el-table-column>
            <el-table-column prop="state" label="状态">
              <!-- 作用域插槽 控制状态-->
              <template slot-scope="scope"
                ><el-switch v-model="scope.row.state"></el-switch
              ></template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  @click="handleClick(scope.row)"
                  type="text"
                  size="small"
                  >修改</el-button
                >
                <el-button type="text" size="small">删除</el-button>
                <el-button type="text" size="small">权限</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pageNum"
            :page-sizes="[1, 2, 5, 100]"
            :page-size="queryInfo.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </template>
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
        query: "",
        pageNum: 1,
        pageSize: 10,
      },
      input: "",
      userList: [],
      total: 0, //总数量
      // currentPage4: 4,
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
    handleClick(row) {
      console.log(row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.queryInfo.pageSize = val;
      this.getUserList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.queryInfo.pageNum = val;
      this.getUserList();
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
