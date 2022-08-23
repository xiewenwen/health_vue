<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>/健康档案</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="item">
      <el-select v-model="queryInfo.isOut" placeholder="是否过期">
          <el-option
          label="全部"
          value=''
        >
        </el-option>
        <el-option
          label="过期"
          value="过期"
        >
        </el-option>
        <el-option
          label="正常"
          value="正常"
        >
        </el-option>
        
      </el-select>
      <el-select v-model="queryInfo.hsResult" placeholder="检测结果">
          <el-option
          label="全部"
          value=''
        >
        </el-option>
        <el-option
          label="绿码"
          value="绿码"
        >
        </el-option>
        <el-option
          label="红码"
          value="红码"
        >
        </el-option>
        <el-option
          label="黄码"
          value="黄码"
        >
        </el-option>
        
      </el-select>
     
        <el-input style="width:200px"  v-model="queryInfo.username" placeholder="姓名"></el-input>
       <el-input style="width:200px" v-model="queryInfo.tel" placeholder="手机号"></el-input>
      <el-button
        type="primary"
        plain
        icon="el-icon-search"
        @click="getHealthList"
        >搜索</el-button
      >
      <el-button type="primary" @click="addDialogVisible = true"
        >新增</el-button
      >
    </div>
    <div>
      <el-table :data="healthList" class="tableStyle" border stripe max-height="480" size="mini">
        <!-- <el-table-column type="index"></el-table-column> -->
        <el-table-column prop="id" label="用户编号" min-width="20px"> </el-table-column>
        <el-table-column prop="username" label="姓名" min-width="20px"> </el-table-column>
        <el-table-column prop="tel" label="手机" min-width="20px"> </el-table-column>
        <el-table-column prop="healthData.hsCreateTime" label="检测日期" min-width="50px"></el-table-column>
        <el-table-column prop="healthData.hsResult" label="核酸结果" min-width="50px">
            
          <template slot-scope="scope">
            <el-tag v-show="scope.row.healthData.hsResult === '红码'" type="danger">{{scope.row.healthData.hsResult}}</el-tag>
            <el-tag v-show="scope.row.healthData.hsResult === '黄码'" type="warning">{{scope.row.healthData.hsResult}}</el-tag>
            <el-tag v-show="scope.row.healthData.hsResult === '绿码'" type="success">{{scope.row.healthData.hsResult}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="healthData.isOutTime" label="核酸状态" min-width="50px">
          <template slot-scope="scope">
            <el-tag :type="scope.row.healthData.isOutTime === '正常' ? '' : 'danger'">{{scope.row.healthData.isOutTime}}</el-tag>
          </template>
        </el-table-column>
        
        <el-table-column label="操作" min-width="50px" align="left">
          <template slot-scope="scope">
            <!--  0 未发布  1.已发布-->
            <el-button
              @click="updateStatus(scope.row.id)"
              type="text"
              size="small"
              v-show="scope.row.status === 0"
              >发布</el-button
            >
            <el-button
              @click="edit(scope.row.id)"
              type="text"
              size="small"
              v-show="scope.row.status === 0"
              >编辑</el-button
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
      <el-dialog title="发布消息" :visible.sync="addDialogVisible" width="40%" @close="closeDialog">
        <AddNotice :msg="addDialogVisible" />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import AddNotice from "../notice/AddNotice.vue";

export default {
  name: "Health",
  components: {
    AddNotice,
  },
  data() {
    return {
      addDialogVisible: false,
      //查询信息实体
      queryInfo: {
        pageNum: 1,
        pageSize: 10,
        username: '',
        tel: '',
        isOut:'',
        hsResult:''
      },
      healthList: [],
      total: 0,
      //   addDialogVisible: false,
      noticeStatus: null,
    };
  },
  created() {
    this.getHealthList();
  },
  methods: {
    async getHealthList() {
      const { data: res } = await this.$http.post("/health/list", {
        pageNum: this.queryInfo.pageNum,
        pageSize: this.queryInfo.pageSize,
        tel: this.queryInfo.tel,
        username: this.queryInfo.username,
        isOut:this.queryInfo.isOut,
        hsResult:this.queryInfo.hsResult

      });
      this.healthList = res.data;
      console.log(this.healthList);
      this.total = res.num;
    },
    closeDialog(){
        // this.addDialogVisible=false;
        this.getHealthList();
    },
    //编辑消息
   async edit() {
      
      
    },
    //删除消息
    async del(){
    
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.queryInfo.pageSize = val;
      this.getHealthList();
    },
    //翻到第几页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.queryInfo.pageNum = val;
      this.getHealthList();
    },
    // typeFormatter(row, column, cellValue) {
    //   return this.status.find((element) => element.value === cellValue).label;
    // },
    // fromFormatter(row, column, cellValue) {
    //   console.log(cellValue);
    //   return this.levels.find((element) => element.value === cellValue).label;
    // },
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
        this.getHealthList();
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
