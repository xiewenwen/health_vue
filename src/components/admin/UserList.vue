<template>
  <div style="height: 1280px">
    <el-breadcrumb separator="/">
      <!-- <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item> -->
      <el-breadcrumb-item>居民信息列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row style="height: 60px">
      <el-col :span="6"
        ><div class="grid-content bg-purple">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @click="getUserList"
          >
          </el-input></div
      ></el-col>
      <el-col :span="6"
        ><div class="grid-content bg-purple">
          <el-button type="danger" @click="addDialogVisible = true"
            >新增</el-button
          >
        </div></el-col
      >
      <el-col :span="6"
        ><div class="grid-content bg-purple">
          <el-button type="danger" @click="getUserList">搜索</el-button>
        </div></el-col
      >
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="24"></el-col>
    </el-row>
    <el-row style="height: 400px">
      <el-col :span="24" class="con"
        ><div class="grid-content bg-purple-dark">
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
                  @click="getUserInfo(scope.row.id)"
                  type="text"
                  size="small"
                  >修改</el-button
                >
                <el-button
                  type="text"
                  size="small"
                  @click="delUser(scope.row.id)"
                  >删除</el-button
                >
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
          </el-pagination></div
      ></el-col>
    </el-row>
    <div>
      <!-- <el-card class="box-card">
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
                  @click="getUserInfo(scope.row.id)"
                  type="text"
                  size="small"
                  >修改</el-button
                >
                <el-button
                  type="text"
                  size="small"
                  @click="delUser(scope.row.id)"
                  >删除</el-button
                >
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
        </template> -->
      <!-- </el-card>  -->
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

      <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="50%">
        <el-form :model="editForm" ref="editFormRef" label-width="70px">
          <el-form-item v-show="false" label="id" prop="id">
            <el-input v-model="editForm.id"></el-input>
          </el-form-item>
          <el-form-item label="用户名" prop="username">
            <el-input v-model="editForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="editForm.password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="editForm.email"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="updateUser">确定</el-button>
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
        pageSize: 2,
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

      editForm: { id: "", username: "", password: "", email: "" },
      editDialogVisible: false,
      // editFormrules: {
      //   username: [
      //     { required: true, message: "请输入用户名", trigger: "blur" },
      //     { min: 5, max: 8, message: "长度在 5 到 8个字符", trigger: "blur" },
      //   ],
      //   password: [
      //     { required: true, message: "请输入passwrd", trigger: "blur" },
      //     { min: 5, max: 8, message: "长度在 5 到 8个字符", trigger: "blur" },
      //   ],
      //   email: [
      //     { required: true, email: "email", trigger: "blur" },
      //     { min: 5, max: 8, message: "长度在 5 到 8个字符", trigger: "blur" },
      //   ],
      // },
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
    //按照id获取对应用的的信息 用于编辑页面展示
    async getUserInfo(id) {
      console.log(id);
      this.editDialogVisible = true;
      const { data: res } = await this.$http.get("/getUser", {
        params: { id: id },
      });
      console.log(res);
      if (res != null) {
        this.editForm.id = res.id;
        this.editForm.username = res.username;
        this.editForm.password = res.password;
        this.editForm.email = res.email;
      }
    },
    async updateUser() {
      console.log("修改用户信息");
      const { data: res } = await this.$http.post("/updateUser", this.editForm);
      if (res.code === 200) {
        this.$message.success(res.msg);
        //添加成功后 关闭对话框
        this.editDialogVisible = false;
        //并且刷新当前列表
        this.getUserList();
      } else {
        this.$message.error(res.msg);
      }
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
    //删除用户
    async delUser(id) {
      const result = await this.$confirm("是否删除该用户", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).catch((err) => err);
      if (result != "confirm") {
        return this.$message.info("已取消删除");
      }
      const { data: res } = await this.$http.delete("user/del?id=" + id);
      if (res.code === 200) {
        this.$message.success(res.msg);
        //并且刷新当前列表
        this.getUserList();
      } else {
        this.$message.error(res.msg);
      }
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
  width: 100%;
  margin-top: 18px;
  margin-left: 0px;
}
.el-row {
  margin-bottom: 2px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 3px 0;
  background-color: #f9fafc;
}
</style>
