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
            <el-input
              placeholder="请输入内容"
              v-model="queryInfo.query"
              clearable
              @click="getUserList"
            >
            </el-input>
          </el-col>
          <el-col :span="2">
            <el-button type="danger" @click="getUserList">搜索</el-button>
          </el-col>
          <el-col :span="2">
            <el-button type="danger" @click="addDialogVisible = true"
              >新增</el-button
            >
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
                ><el-switch
                  v-model="scope.row.state"
                  @change="userStateChange(scope.row)"
                ></el-switch
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
      <el-dialog
        title="添加用户"
        :visible.sync="addDialogVisible"
        width="50%"
        @close="addDialogClosed"
      >
        <el-form
          :model="addForm"
          :rules="adddFormrules"
          ref="addFormRef"
          label-width="70px"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="addForm.password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addForm.email"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addUser">确定</el-button>
        </span>
      </el-dialog>
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
      addDialogVisible: false,
      addForm: {
        username: "",
        passwrd: "",
        email: "",
      },
      adddFormrules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 5, max: 8, message: "长度在 5 到 8个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入passwrd", trigger: "blur" },
          { min: 5, max: 8, message: "长度在 5 到 8个字符", trigger: "blur" },
        ],
        email: [
          { required: true, email: "email", trigger: "blur" },
          { min: 5, max: 8, message: "长度在 5 到 8个字符", trigger: "blur" },
        ],
      },
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
    //修改每个分页的数量
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.queryInfo.pageSize = val;
      this.getUserList();
    },
    //翻到第几页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.queryInfo.pageNum = val;
      this.getUserList();
    },
    //修改用户的状态
    async userStateChange(userInfo) {
      const allInfo = await this.$http.put(
        `/user/state?id=${userInfo.id}&state=${userInfo.state}`
      );
      console.log(allInfo);
      if (allInfo.data.code === 200) {
        this.$message.success(allInfo.data.msg);
      } else {
        this.$message.error(allInfo.data.msg);
      }
    },
    //添加用户的功能
    addUser() {
      //表单先校验
      this.$refs.addFormRef.validate(async (valid) => {
        console.log(valid);
        const { data: res } = await this.$http.post("user/add", this.addForm);
        if (res.code === 200) {
          this.$message.success(res.msg);
          //添加成功后 关闭对话框
          this.addDialogVisible = false;
          //并且刷新当前列表
          this.getUserList();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //监听添加用户的
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
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
