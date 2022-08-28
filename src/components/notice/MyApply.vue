<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>/我的申请</el-breadcrumb-item></el-breadcrumb
    >
    <!-- </el-breadcrumb>
    <div class="item">
      <el-select v-model="queryInfo.level" placeholder="消息等级">
        <el-option
          v-for="item in levels"
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
    </div> -->
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
        <el-table-column prop="applyName" label="标题"> </el-table-column>
        <el-table-column
          prop="applyInfo"
          label="申请内容"
          show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="applyCreateTime"
          label="申请日期"
          min-width="50px"
        ></el-table-column>
        <el-table-column prop="applyType" label="通知等级" min-width="50px">
          <template slot-scope="scope">
            <el-tag v-show="scope.row.applyType === 1" type="danger">{{
              fromFormatter(scope.row, applyType, scope.row.applyType)
            }}</el-tag>
            <el-tag v-show="scope.row.applyType === 2" type="warning">{{
              fromFormatter(scope.row, applyType, scope.row.applyType)
            }}</el-tag>
            <el-tag v-show="scope.row.applyType === 3" type="info">{{
              fromFormatter(scope.row, applyType, scope.row.applyType)
            }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作" min-width="50px" align="left">
          <template slot-scope="scope">
            <el-button
              @click="getDetail(scope.row.id, scope.row.applyType)"
              type="text"
              size="60%"
              >查看详情</el-button
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
        :title="title"
        :visible.sync="drawer"
        :direction="direction"
        :before-close="handleClose"
        size="60%"
        :destroy-on-close="true"
      >
        <NoticeDetail :id="id" />
      </el-drawer>
      <el-dialog title="发布消息" :visible.sync="addDialogVisible" width="40%">
        <AddNotice :msg="addDialogVisible" />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import AddNotice from "../notice/AddNotice.vue";
import NoticeDetail from "../notice/NoticeDetail.vue";

export default {
  name: "MyApply",
  components: {
    AddNotice,
    NoticeDetail,
  },
  data() {
    return {
      addDialogVisible: false,
      drawer: false,
      direction: "rtl",
      id: null,
      title: "",
      show: false,
      levels: [
        {
          value: null,
          label: "全部",
        },
        {
          value: 1,
          label: "紧急",
        },
        {
          value: 2,
          label: "严重",
        },
        {
          value: 3,
          label: "普通",
        },
      ],
      //查询信息实体
      queryInfo: {
        pageNum: 1,
        pageSize: 10,
        userId: null,
        applyType: null,
        opResult: null,
      },
      applys: [],
      total: 0,
      //   addDialogVisible: false,
      noticeStatus: null,
    };
  },
  created() {
    this.getMyApplyList();
  },
  methods: {
    async getMyApplyList() {
      this.userId = localStorage.getItem("userId");
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
    typeFormatter(row, column, cellValue) {
      return this.status.find((element) => element.value === cellValue).label;
    },
    fromFormatter(row, column, cellValue) {
      console.log(cellValue);
      return this.levels.find((element) => element.value === cellValue).label;
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
