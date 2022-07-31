<template>
  <div>
    <el-breadcrumb separator="/">
      <!-- <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item> -->
      <el-breadcrumb-item>居民楼列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <el-card class="box-card">
        <el-row class="con">
          <el-col :span="6" class="con">
            <el-input
              placeholder="zhuang"
              v-model="queryInfo.zhuang"
              clearable
              @click="getBuildingList"
            >
            </el-input>
          </el-col>
          <el-col :span="2">
            <el-button type="danger" @click="getBuildingList">搜索</el-button>
          </el-col>
          <el-col :span="2">
            <el-button type="danger" @click="addDialogVisible = true"
              >新增</el-button
            >
          </el-col>
        </el-row>
        <template>
          <el-table :data="buildingList" border stripe>
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
        </template>
      </el-card>
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
        pageSize: 2,
        zhuang: "18幢",
      },
      //   buildings: {
      //     zhuang: "18栋",
      //   },
      //   input: "",
      //   pageNum: 1,
      //   pageSize: 2,
      //   zhuang: "18幢",
      buildingList: [],
      total: 0, //总数量
    };
  },
  created() {
    this.getBuildingList();
  },
  methods: {
    //获取的用户
    async getBuildingList() {
      console.log("获取所有的用户列表");
      console.log(this.queryInfo.pageSize);
      const { data: res } = await this.$http.post(
        "buildind/list",
        {
          //   queryInfo: this.queryInfo,
          //   buildings: this.buildings,
          pageNum: this.queryInfo.pageNum,
          pageSize: this.queryInfo.pageSize,
          zhuang: this.queryInfo.zhuang,
        }
        // params: { queryInfo: this.queryInfo, buildings: this.buildings },
      );
      this.buildingList = res.data;
      this.total = res.num;
      console.log(res);
    },
    searchUserList() {
      console.log("查询用户");
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
