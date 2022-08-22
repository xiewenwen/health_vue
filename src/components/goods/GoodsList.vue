<template>
  <div>
    <el-breadcrumb separator="/">
      <!-- <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item> -->
      <el-breadcrumb-item>/物资列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="item">
      <el-input
        placeholder="物资名称"
        v-model="queryInfo.goodsName"
        @click="getGoodsList"
        style="width: 250px"
        clearable
      >
      </el-input>

      <el-select v-model="queryInfo.goodsFrom" placeholder="物资来源">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-select v-model="queryInfo.goodsType" placeholder="物资类型">
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
        @click="getGoodsList"
        >搜索</el-button
      >

      <el-button type="primary" @click="addDialogVisible = true"
        >新增</el-button
      >
    </div>
    <div>
      <el-table :data="goodsList" class="tableStyle" border stripe>
        <!-- <el-table-column type="index"></el-table-column> -->
        <el-table-column prop="id" label="编号"> </el-table-column>
        <el-table-column prop="goodName" label="名称"> </el-table-column>
        <el-table-column prop="goodsBeginNum" label="入库数"> </el-table-column>
        <el-table-column prop="goodsNowNum" label="库存"> </el-table-column>
        <el-table-column prop="goodsFrom" label="物资来源" :formatter="fromFormatter"></el-table-column>
        <el-table-column prop="singlePrice" label="单价"> </el-table-column>
        <el-table-column prop="goodsType" label="类型" :formatter="typeFormatter"> </el-table-column>
        <el-table-column prop="createTime" label="入库日期"></el-table-column>

        <!-- 作用域插槽 控制状态-->
        <!-- <template slot-scope="scope"
            ><el-switch
              v-model="scope.row.state"
              @change="userStateChange(scope.row)"
            ></el-switch
          ></template> -->

        <el-table-column label="操作">
          <template slot-scope="scope">
            <!--  -->
            <!--  0 出库  1.入库-->
            <el-button
              @click="outGoods(scope.row.id, 1)"
              type="text"
              size="small"
              >入库</el-button
            >
            <el-button
              type="text"
              size="small"
              @click="outGoods(scope.row.id, 0)"
              >出库</el-button
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
        title="新物资入库"
        :visible.sync="addDialogVisible"
        width="40%"
        @close="addDialogClosed"
      >
        <el-form
          :model="addForm"
          ref="addFormRef"
          label-width="70px"
          style="text-align: right"
        >
          <el-form-item label="物资名称" prop="goodName">
            <el-input
              v-model="addForm.goodName"
              style="width: 240px"
            ></el-input>
          </el-form-item>
          <el-form-item label="入库数量" prop="goodsBeginNum">
            <el-input-number
              v-model="addForm.goodsBeginNum"
              @change="handleChange"
              :min="1"
              :max="9999"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="单价" prop="singlePrice">
            <el-input-number
              v-model="addForm.singlePrice"
              @change="handleChange"
              :min="1"
              :max="9999"
              label="单价"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="物资来源" prop="goodsFrom">
            <el-select v-model="addForm.goodsFrom" placeholder="物资来源">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="物资类型" prop="goodsType">
            <el-select v-model="addForm.goodsType" placeholder="物资类型">
              <el-option
                v-for="item in types"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addGoods">确定</el-button>
        </span>
      </el-dialog>
      <!-- //   0 出库  1.入库 -->
      <el-dialog
        :title="code === 0 ? '物资出库' : '物资入库'"
        :visible.sync="goodsOutDialogVisible"
        width="40%"
        @closed="goodsOutDialogVisibleClose"
      >
        <el-form :model="goodsOutForm" ref="goodsOutFormRef" label-width="90px">
          <h4>货物名称:{{ goodsName }}</h4>
          <h4>库存:{{ goodsNowNum }}</h4>

          <el-form-item v-show="false" label="goods_id" prop="goods_id">
            <el-input v-model="goodsOutForm.goods_id"></el-input>
          </el-form-item>

          <el-form-item
            :label="code === 0 ? '出库' : '入库' + '数量'"
            prop="changeNum"
          >
            <el-input-number
              v-model="goodsOutForm.changeNum"
              @change="handleChange"
              :min="1"
              :max="goodsNowNum"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
          <el-form-item v-show="code === 0" label="使用者" prop="useManId">
            <el-select
              v-model="goodsOutForm.useManId"
              placeholder="请选择用户"
              style="width: 260px"
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

          <el-form-item label="备注" prop="note">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
              placeholder="请输入内容"
              v-model="goodsOutForm.note"
              style="width: 260px"
            >
            </el-input>
            <!-- <el-input v-model="goodsOutForm.note"></el-input> -->
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="goodsOutDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="goodsUseAdd">确定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsList",
  data() {
    return {
      options: [
        {
          value: "",
          label: "全部",
        },
        {
          value: "FREE",
          label: "他人/机构捐赠",
        },
        {
          value: "BUY",
          label: "社区购入",
        },
        {
          value: "OTHER",
          label: "其他",
        },
      ],
      types: [
        {
          value: null,
          label: "全部",
        },
        {
          value: 1,
          label: "水/食品",
        },
        {
          value: 2,
          label: "社区耗材",
        },
        {
          value: 3,
          label: "办公用品",
        },
      ],
      //查询信息实体
      queryInfo: {
        pageNum: 1,
        pageSize: 10,
        goodsFrom: "",
        goodsType: null,
        goodsName: "",
      },
      goodsList: [],
      total: 0,
      addDialogVisible: false,
      addForm: {
        goodsFrom: "",
        goodsType: "",
        goodsName: "",
        goodsBeginNum: 1,
        singlePrice: null,
      },
      goodsOutForm: {
        goods_id: null,
        changeWay: 1,
        useManId: null,
        opMan: null,
        changeNum: 0,
      },
      goodsOutDialogVisible: false,
      goodsName: "",
      goodsNowNum: 0,
      code: 0,
      userList: [],
    };
  },
  created() {
    this.getGoodsList();
    this.getUserList();
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get("/user/list");
      this.userList = res.data;
    },
    async getGoodsList() {
      const { data: res } = await this.$http.post("/goods/list", {
        pageNum: this.queryInfo.pageNum,
        pageSize: this.queryInfo.pageSize,
        goodsFrom: this.queryInfo.goodsFrom,
        goodsType: this.queryInfo.goodsType,
        goodsName: this.queryInfo.goodsName,
      });
      this.goodsList = res.data;
      this.total = res.num;
    },
    searchGoodsList() {
      this.getGoodsList();
    },
    async addGoods() {
      const { data: res } = await this.$http.post("/goods/add", this.addForm);
      if (res.data >= 1) {
        this.$message.success(res.msg);
        //添加成功后 关闭对话框
        this.addDialogVisible = false;
        //并且刷新当前列表
        this.getGoodsList();
      } else {
        this.$message.error(res.msg);
      }
    },
    //监听添加用户的
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    goodsOutDialogVisibleClose() {
      this.$refs.goodsOutFormRef.resetFields();
    },

    async outGoods(goods_id, code) {
      this.goodsOutDialogVisible = true;
      console.log(goods_id);
      //   0 出库  1.入库
      this.code = code;
      const { data: res1 } = await this.$http.get("/goods/findById", {
        params: { id: goods_id },
      });
      console.log(res1);
      this.goodsOutForm.goods_id = res1.id;
      this.goodsName = res1.goodName;
      this.goodsNowNum = res1.goodsNowNum;
      this.goodsOutForm.changeWay = code;
    },
    async goodsUseAdd() {
      const { data: res } = await this.$http.post(
        "goods/outAndIn",
        this.goodsOutForm
      );
      if (res.data >= 1) {
        this.$message.success(res.msg);
        //添加成功后 关闭对话框
        this.goodsOutDialogVisible = false;
        this.getGoodsList();
      } else {
        this.$message.error("操作失败，请检查库存信息");
      }
    },

    handleChange(value) {
      console.log(value);
    },

        //修改每个分页的数量
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.queryInfo.pageSize = val;
      this.getGoodsList();
    },
    //翻到第几页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.queryInfo.pageNum = val;
      this.getGoodsList();
    },
    typeFormatter(row, column, cellValue){
      return this.types.find(element => element.value===cellValue).label;
    },
    fromFormatter(row, column, cellValue){
      console.log(cellValue);
      return this.options.find(element => element.value===cellValue).label;
    }

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
