<template>
  <div>
    <el-breadcrumb separator="/">
      <!-- <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item> -->
      <el-breadcrumb-item>/居民楼列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="item">
      <el-input
        placeholder="幢"
        v-model="queryInfo.zhuang"
        clearable
        style="width: 250px"
        @click="getBuildingList"
      >
      </el-input>
      <el-button type="primary" @click="addDialogVisible = true"
        >新增</el-button
      >

      <template>
        <el-table :data="buildingList" border stripe class="tableStyle">
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="zhuang" label="幢"> </el-table-column>
          <el-table-column prop="danYuan" label="单元"> </el-table-column>
          <el-table-column prop="bianHao" label="门牌号"> </el-table-column>
          <!-- <el-table-column prop="state" label="状态"> -->
          <!-- 作用域插槽 控制状态-->
          <!-- <template slot-scope="scope"
                ><el-switch
                  v-model="scope.row.state"
                  @change="userStateChange(scope.row)"
                ></el-switch
              ></template> -->
          <!-- </el-table-column> -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                @click="getBuildingInfo(scope.row.id)"
                type="text"
                size="small"
                >修改</el-button
              >
              <el-button
                type="text"
                size="small"
                @click="delBuilding(scope.row.id)"
                >删除</el-button
              >
              <el-button type="text" size="small">权限</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pageNum"
            :page-sizes="[1, 10, 5, 100]"
            :page-size="queryInfo.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
      </template>
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
          <el-form-item label="幢" prop="zhuang">
            <el-input v-model="addForm.zhuang"></el-input>
          </el-form-item>
          <el-form-item label="单元" prop="danYuan">
            <el-input v-model="addForm.danYuan"></el-input>
          </el-form-item>
          <el-form-item label="门牌号" prop="bianHao">
            <el-input v-model="addForm.bianHao"></el-input>
          </el-form-item>
          <el-form-item label="居住人" prop="liveUserId">
            <el-select
              v-model="addForm.liveUserId"
              multiple
              placeholder="请选择"
            >
              <el-option
                v-for="item in userList"
                :key="item.id"
                :label="item.username"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addBuilding">确定</el-button>
        </span>
      </el-dialog>

      <el-dialog
        title="修改居民楼"
        :visible.sync="editDialogVisible"
        width="50%"
      >
        <el-form :model="editForm" ref="editFormRef" label-width="70px">
          <el-form-item v-show="false" label="id" prop="id">
            <el-input v-model="editForm.id"></el-input>
          </el-form-item>
          <el-form-item label="幢" prop="zhuang">
            <el-input v-model="editForm.zhuang"></el-input>
          </el-form-item>
          <el-form-item label="单元" prop="danYuan">
            <el-input v-model="editForm.danYuan"></el-input>
          </el-form-item>
          <el-form-item label="门牌号" prop="bianHao">
            <el-input v-model="editForm.bianHao"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="updateBuilding">确定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "BuildingList",
  data() {
    return {
      //查询信息实体
      queryInfo: {
        pageNum: 1,
        pageSize: 10,
        zhuang: null,
      },
      buildingList: [],
      userList: [],
      total: 0, //总数量
      editDialogVisible: false,
      editForm: {
        id: "",
        zhuang: "",
        danYuan: "",
        bianHao: "",
      },
      addDialogVisible: false,
      addForm: {
        zhuang: "",
        danYuan: "",
        bianHao: "",
        liveUserId: [],
        ownerId: 0,
        ownerName: "",
      },
      adddFormrules: {
        zhuang: [
          { required: true, message: "请输入居民楼编号", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2到 85字符", trigger: "blur" },
        ],
        danYuan: [
          { required: true, message: "请输入单元楼", trigger: "blur" },
          { min: 4, max: 6, message: "长度在 4 到 6个字符", trigger: "blur" },
        ],
        bianHao: [
          { required: true, email: "请输入门牌号", trigger: "blur" },
          { min: 4, max: 6, message: "长度在 4到 6个字符", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getBuildingList();
    this.getUserList();
  },
  methods: {
    async getUserList() {
      //先获取所有用户的列表
      const { data: res } = await this.$http.get("/user/list");
      this.userList = res.data;
      console.log(this.userList);
    },
    //获取的用户
    async getBuildingList() {
      console.log("获取所有单元楼列表");
      console.log(this.queryInfo.pageSize);
      const { data: res } = await this.$http.post("buildind/list", {
        pageNum: this.queryInfo.pageNum,
        pageSize: this.queryInfo.pageSize,
        zhuang: this.queryInfo.zhuang,
      });
      this.buildingList = res.data;
      this.total = res.num;
      console.log(res);
    },
    searchUserList() {
      console.log("查询用户");
    },

    //添加居民楼的功能
    addBuilding() {
      //表单先校验
      this.$refs.addFormRef.validate(async (valid) => {
        console.log(valid);
        let st = this.addForm.liveUserId.join(",");
        this.addForm.liveUserId = st;
        const { data: res } = await this.$http.post(
          "buildind/add",
          this.addForm
        );
        if (res.data >= 1) {
          this.$message.success(res.msg);
          //添加成功后 关闭对话框
          this.addDialogVisible = false;
          //并且刷新当前列表
          this.getBuildingList();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //监听添加用户的
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },

    async getBuildingInfo(id) {
      console.log(id);
      this.editDialogVisible = true;
      const { data: res } = await this.$http.get("building/findById", {
        params: { id: id },
      });
      console.log(res);
      if (res != null) {
        this.editForm.id = res.id;
        this.editForm.zhuang = res.zhuang;
        this.editForm.danYuan = res.danYuan;
        this.editForm.bianHao = res.bianHao;
      }
    },

    async updateBuilding() {
      console.log("修改居民楼信息");
      const { data: res } = await this.$http.post(
        "buildind/update",
        this.editForm
      );
      if (res.data >= 1) {
        this.$message.success(res.msg);
        //添加成功后 关闭对话框
        this.editDialogVisible = false;
        //并且刷新当前列表
        this.getBuildingList();
      } else {
        this.$message.error(res.msg);
      }
    },
    //删除用户
    async delBuilding(id) {
      const result = await this.$confirm("是否删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).catch((err) => err);
      if (result != "confirm") {
        return this.$message.info("已取消删除");
      }
      const { data: res } = await this.$http.post("buildind/del", {
        ids: [id],
      });
      if (res.data >= 1) {
        this.$message.success(res.msg);
        //并且刷新当前列表
        this.getBuildingList();
      } else {
        this.$message.error(res.msg);
      }
    },

    //修改每个分页的数量
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.queryInfo.pageSize = val;
      this.getBuildingList();
    },
    //翻到第几页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.queryInfo.pageNum = val;
      this.getBuildingList();
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
  width: 1200px;
  margin-top: 8px;
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
