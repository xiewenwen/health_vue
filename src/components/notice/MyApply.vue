<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>/我的申请</el-breadcrumb-item></el-breadcrumb
    >
    <div class="item">
      <el-select v-model="queryInfo.applyType" placeholder="申请类型">
        <el-option
          v-for="item in types"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button
        type="primary"
        plain
        icon="el-icon-search"
        @click="getMyApplyList"
        >搜索</el-button
      >
      <el-button type="primary" plain @click="addDialogVisible = true"
        >添加申请</el-button
      >
    </div>
    <div>
      <el-table
        :data="applys"
        class="tableStyle"
        border
        stripe
        max-height="480"
        size="mini"
      >
        <el-table-column prop="id" label="编号" min-width="20px">
        </el-table-column>
        <el-table-column prop="applyUserName" label="申请人"> </el-table-column>
        <!-- <el-table-column
          prop="applyInfo"
          label="申请内容"
          show-overflow-tooltip="true"
        >
        </el-table-column> -->
        <el-table-column
          prop="applyCreateTime"
          label="申请日期"
          min-width="50px"
        ></el-table-column>
        <el-table-column
          prop="applyType"
          label="申请类型"
          min-width="50px"
          :formatter="typeFormatter"
        >
        </el-table-column>
        <el-table-column
          prop="opDate"
          label="处理日期"
          min-width="50px"
        ></el-table-column>
        <el-table-column
          prop="opResult"
          label="处理结果"
          :formatter="resultFormatter"
          min-width="50px"
        ></el-table-column>
        <el-table-column label="操作" min-width="50px" align="left">
          <template slot-scope="scope">
            <el-button
              @click="getDetail(scope.row.id, scope.row.applyType)"
              type="text"
              size="60%"
              >{{
                scope.row.opResult == 3 && roleId == 1 ? "审批" : "查看详情"
              }}</el-button
            >
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
      <el-drawer
        title="申请详情"
        :visible.sync="drawer"
        :direction="direction"
        size="40%"
        :before-close="handleClose"
        :destroy-on-close="true"
      >
        <ApplyDetail :id="id" :roleId="roleId" />
      </el-drawer>
      <el-dialog title="添加申请" :visible.sync="addDialogVisible" width="70%">
        <AddApply />
      </el-dialog>
    </div>
  </div>
</template>

<script>
// import AddNotice from "../notice/AddNotice.vue";
// import NoticeDetail from "../notice/NoticeDetail.vue";
import ApplyDetail from "../notice/ApplyDetail.vue";
import AddApply from "../notice/AddApply.vue";

export default {
  name: "MyApply",
  components: {
    // AddNotice,
    // NoticeDetail,
    ApplyDetail,
    AddApply,
  },
  data() {
    return {
      addDialogVisible: false,
      drawer: false,
      direction: "rtl",
      id: null,
      title: "",
      show: false,
      roleId: 0,
      types: [
        {
          value: null,
          label: "全部",
        },
        {
          value: 1,
          label: "增加居住人",
        },
        {
          value: 2,
          label: "访客报备",
        },
        {
          value: 3,
          label: "社区物资申请",
        },
        {
          value: 4,
          label: "其他",
        },
      ],
      results: [
        {
          value: null,
          label: "全部",
        },
        {
          value: 1,
          label: "审批通过",
        },
        {
          value: 0,
          label: "审批不通过",
        },
        {
          value: 3,
          label: "审批未处理",
        },
      ],
      //查询信息实体
      queryInfo: {
        pageNum: 1,
        pageSize: 10,
        userId: 0,
        applyType: null,
        opResult: null,
      },
      applys: [],
      total: 0,
      //   addDialogVisible: false,
      noticeStatus: null,
      userId: 0,
    };
  },
  created() {
    this.getMyApplyList();
  },
  methods: {
    async getMyApplyList() {
      this.userId = localStorage.getItem("userId");
      this.roleId = localStorage.getItem("roleId");
      if (this.roleId == 1) {
        this.queryInfo.userId = null;
      } else {
        this.queryInfo.userId = this.userId - 0;
      }

      const { data: res } = await this.$http.post("/user/applys", {
        pageNum: this.queryInfo.pageNum,
        pageSize: this.queryInfo.pageSize,
        userId: this.queryInfo.userId,
        applyType: this.queryInfo.applyType,
        opResult: this.queryInfo.opResult,
      });
      this.applys = res.data;
      this.total = res.num;
    },
    getDetail(id, title) {
      this.id = id;
      this.drawer = true;
      this.title = title;
    },

    handleClose(done) {
      this.$confirm("是否要退出申请详情？")
        .then(() => {
          this.getMyApplyList();
          done();
        })
        .catch(() => {});
    },
    closeDialog() {
      // this.addDialogVisible=false;
      this.getMyApplyList();
    },
    closeDrawer() {},
    async edit() {},
    //删除消息
    async del() {},
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.queryInfo.pageSize = val;
      this.getMyApplyList();
    },
    //翻到第几页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.queryInfo.pageNum = val;
      this.getMyApplyList();
    },
    resultFormatter(row, column, cellValue) {
      return this.results.find((element) => element.value === cellValue).label;
    },
    typeFormatter(row, column, cellValue) {
      console.log(cellValue);
      return this.types.find((element) => element.value === cellValue).label;
    },
    async updateStatus(id) {
      const result = await this.$confirm("是否发布该消息", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).catch((err) => err);
      if (result != "confirm") {
        return this.$message.info("已取消发布");
      }
      const { data: res } = await this.$http.get("notice/updateStatus", {
        params: {
          id: id,
          status: 1,
        },
      });
      if (res >= 1) {
        this.$message.success("发布成功");
        //并且刷新当前列表
        this.getMyApplyList();
      } else {
        this.$message.error("发布失败");
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
  padding-right: 4px;
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
  /* height: 500px; */
  width: 100%;
}
.block {
  text-align: right;
}
</style>
