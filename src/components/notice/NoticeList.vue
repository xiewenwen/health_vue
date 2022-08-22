<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>/消息公告</el-breadcrumb-item>
    </el-breadcrumb>
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
      <el-select v-model="queryInfo.status" placeholder="发布状态">
        <el-option
          v-for="item in status"
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
        @click="getNoticeList"
        >搜索</el-button
      >
      <el-button type="primary" @click="addDialogVisible = true"
        >新增</el-button
      >
    </div>
    <div>
      <el-table :data="noticeList" class="tableStyle" border stripe>
        <!-- <el-table-column type="index"></el-table-column> -->
        <el-table-column prop="id" label="编号"> </el-table-column>
        <el-table-column prop="noticeTitle" label="标题"> </el-table-column>
        <el-table-column prop="noticeText" label="正文内容"> </el-table-column>
        <!-- <el-table-column prop="noticeLevel" label="通知等级" :formatter="fromFormatter">

        </el-table-column> -->
        <el-table-column prop="noticeLevel" label="通知等级">
          <template slot-scope="scope">
            <el-tag v-show="scope.row.noticeLevel === 1" type="danger">{{
              fromFormatter(scope.row, noticeLevel, scope.row.noticeLevel)
            }}</el-tag>
            <el-tag v-show="scope.row.noticeLevel === 2" type="warning">{{
              fromFormatter(scope.row, noticeLevel, scope.row.noticeLevel)
            }}</el-tag>
            <el-tag v-show="scope.row.noticeLevel === 3" type="info">{{
              fromFormatter(scope.row, noticeLevel, scope.row.noticeLevel)
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="发布状态">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status === 1 ? 'success' : ''">{{
              typeFormatter(scope.row, status, scope.row.status)
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="noticeDate" label="发布日期"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!--  0 未发布  1.已发布-->
            <el-button
              @click="updateStatus(scope.row.id)"
              type="text"
              size="small"
              v-show="scope.row.status === 0"
              >发布</el-button
            >
            <el-button type="text" size="small" @click="del(scope.row.id)"
              >删除</el-button
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
      <el-dialog title="发布消息" :visible.sync="addDialogVisible" width="40%">
        <AddNotice :msg="addDialogVisible" />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import AddNotice from "../notice/AddNotice.vue";

export default {
  name: "NoticeList",
  components: {
    AddNotice,
  },
  data() {
    return {
      addDialogVisible: false,
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
      status: [
        {
          value: null,
          label: "全部",
        },
        {
          value: 1,
          label: "已发布",
        },
        {
          value: 0,
          label: "未发布",
        },
      ],
      //查询信息实体
      queryInfo: {
        pageNum: 1,
        pageSize: 10,
        level: null,
        status: null,
      },
      noticeList: [],
      total: 0,
      //   addDialogVisible: false,
      noticeStatus: null,
    };
  },
  created() {
    this.getNoticeList();
  },
  methods: {
    async getNoticeList() {
      const { data: res } = await this.$http.post("/notice/list", {
        pageNum: this.queryInfo.pageNum,
        pageSize: this.queryInfo.pageSize,
        noticeLevel: this.queryInfo.level,
        status: this.queryInfo.status,
      });
      this.noticeList = res.data;
      console.log(this.noticeList);
      this.total = res.num;
    },
    del(num) {
      alert(num);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.queryInfo.pageSize = val;
      this.getNoticeList();
    },
    //翻到第几页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.queryInfo.pageNum = val;
      this.getNoticeList();
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
        this.getNoticeList();
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
  height: 500px;
  width: 100%;
}
.block {
  text-align: right;
}
</style>
