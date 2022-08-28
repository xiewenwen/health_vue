<template>
  <div>
    <el-breadcrumb separator="/">
      <!-- <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item> -->
      <el-breadcrumb-item>/居住成员</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <el-table :data="userList" class="tableStyle" border stripe>
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="username" label="用户名"> </el-table-column>

        <el-table-column
          prop="gender"
          label="性别"
          :formatter="genderFormatter"
        >
        </el-table-column>
        <el-table-column prop="cardId" label="身份证"> </el-table-column>
        <el-table-column prop="tel" label="电话"> </el-table-column>
        <el-table-column prop="owner" label="身份"> </el-table-column>
        <el-table-column prop="huji" label="户籍"> </el-table-column>
        <el-table-column prop="xueLi" label="学历"> </el-table-column>
        <el-table-column prop="zhiYe" label="职业"> </el-table-column>
        <el-table-column prop="workPlace" label="工作地点"> </el-table-column>
        <el-table-column prop="liveInDate" label="入住日期"> </el-table-column>

        <!-- <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="getUserInfo(scope.row.id)"
              type="text"
              size="small"
              >查看险情</el-button
            >
          </template>
        </el-table-column> -->
      </el-table>
    </div>
    <div>
      <!-- <el-dialog
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
      </el-dialog> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeUser",
  data() {
    return {
      //查询信息实体
      queryInfo: {
        userId: null,
      },
      genders: [
        {
          value: 0,
          label: "男",
        },
        {
          value: 1,
          label: "女",
        },
      ],
      input: "",
      userList: [],
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    //获取的用户
    async getUserList() {
      this.queryInfo.userId = localStorage.getItem("userId");

      const { data: res } = await this.$http.get("/user/home", {
        params: this.queryInfo,
      });
      this.userList = res;

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
    //监听添加用户的
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    genderFormatter(row, column, cellValue) {
      console.log(cellValue);
      return this.genders.find((element) => element.value == cellValue).label;
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
  height: 500px;
  width: 100%;
}
.block {
  text-align: right;
}
</style>
