<template>
  <div>
    <el-breadcrumb separator="/">
      <!-- <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item> -->
      <el-breadcrumb-item>/居民信息列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="item">
      <el-input
        placeholder="用户名"
        v-model="queryInfo.query"
        @click="getUserList"
        style="width: 230px"
        clearable
      >
      </el-input>
      <el-button type="primary" plain icon="el-icon-search" @click="getUserList"
        >搜索</el-button
      >
      <el-button type="primary" @click="addDialogVisible = true"
        >新增</el-button
      >
    </div>
    <div>
      <el-table :size="mini" :data="userList" style="width: 100%" border stripe>
        <!-- <el-table-column type="index"></el-table-column> -->
        <el-table-column fixed prop="username" label="用户名"> </el-table-column>
        <el-table-column fixed prop="cardId" label="身份证" width="120"> </el-table-column>
         <el-table-column prop="gender" label="性别">
           <template slot-scope="scope"
            >{{scope.row.gender==0?'男':'女'}}
          </template>
         </el-table-column>
         
         <el-table-column prop="tel" label="电话" width="120"> </el-table-column>
        <el-table-column prop="email" label="邮件" width="120"> </el-table-column>
        <el-table-column prop="owner" label="身份"> </el-table-column>
        <el-table-column prop="xueLi" label="学历"> </el-table-column>
        <el-table-column prop="zhiYe" label="职业"> </el-table-column>
        <el-table-column prop="huji" label="户籍"> </el-table-column>
        <el-table-column prop="workPlace" label="工作地址"> </el-table-column>
        <!-- <el-table-column prop="buildings.zhuang" :v-show="false"> </el-table-column>
        <el-table-column prop="buildings.danYuan" :v-show="false"> </el-table-column>
        <el-table-column prop="buildings.bianHao" :v-show="false"> </el-table-column> -->
        <el-table-column prop="buildings.bianHao" label="居住地" width="120" > 
          <template slot-scope="scope"
            >{{scope.row.buildings.zhuang}}{{scope.row.buildings.danYuan}}{{scope.row.buildings.bianHao}}
          </template>
        </el-table-column>
        <el-table-column prop="roleId" label="权限"><template slot-scope="scope"
            >{{scope.row.roleId==1?'管理员':'普通'}}
          </template> </el-table-column>
        <el-table-column prop="state" fixed="right" label="状态">
          <!-- 作用域插槽 控制状态-->
          <template slot-scope="scope"
            ><el-switch
              v-model="scope.row.state"
              @change="userStateChange(scope.row)"
            ></el-switch
          ></template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="120">
          <template slot-scope="scope">
            <el-button
              @click="getUserInfo(scope.row.id)"
              type="text"
              size="small"
              >修改</el-button
            >
            <el-button type="text" size="small" @click="delUser(scope.row.id)"
              >删除</el-button
            >
            <!-- <el-button type="text" size="small">权限</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pageNum"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="queryInfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
    <div>
      <el-dialog
        title="添加用户"
        :visible.sync="addDialogVisible"
        width="40%"
        @close="addDialogClosed"
      >
        <el-form
          :model="addForm"
          :rules="adddFormrules"
          ref="addFormRef"
          label-width="70px"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="addForm.username"
              style="width: 240px"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="addForm.password"
              style="width: 240px"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addForm.email" style="width: 240px"></el-input>
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

      editForm: { id: "", username: "", password: "", email: "" },
      editDialogVisible: false,
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
  margin-top: 8px;
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

.tableStyle {
  height: 100%;
  width: 100%;
}
.block {
  text-align: right;
}
</style>
