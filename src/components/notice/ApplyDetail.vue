<template>
  <div>
    <el-descriptions>
      <el-descriptions-item label="申请人">{{
        apply.applyUserName
      }}</el-descriptions-item>
      <el-descriptions-item label="申请时间">{{
        apply.applyCreateTime
      }}</el-descriptions-item>
      <el-descriptions-item label="申请类型">{{
        types.find((element) => element.value === apply.applyType).label
      }}</el-descriptions-item>
      <el-descriptions-item label="处理状态">
        <!-- <el-tag size="small">学校</el-tag> -->
        {{ results.find((element) => element.value === apply.opResult).label }}
      </el-descriptions-item>
    </el-descriptions>
    <el-descriptions
      class="margin-top"
      title=""
      :column="3"
      :size="size"
      border
      v-show="showGoods"
    >
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          物资名称
        </template>
        {{ goods.goodName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone"></i>
          申请数量
        </template>
        {{ goodsUse.changeNum }}
      </el-descriptions-item>
    </el-descriptions>
    <el-descriptions
      class="margin-top"
      title=""
      :column="3"
      :size="size"
      border
      v-show="showUser"
    >
      <el-descriptions-item>
        <template slot="label">
          <!-- <i class="el-icon-user"></i> -->
          用户姓名
        </template>
        {{ user.username }}
      </el-descriptions-item>
      <!-- <el-descriptions-item>
        <template slot="label">
         
          申请数量
        </template>
        {{ goodsUse.changeNum }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location-outline"></i>
          居住地
        </template>
        苏州市
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          备注
        </template>
        <el-tag size="small">学校</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          联系地址
        </template>
        江苏省苏州市吴中区吴中大道 1188 号
      </el-descriptions-item> -->
    </el-descriptions>
    <!-- <div v-show="apply.opResult == 3">
      <el-button type="success" plain @click="deal(1)">同意申请</el-button>
      <el-button type="danger" plain @click="deal(0)">拒绝申请</el-button>
    </div> -->
    <div v-show="apply.opResult == 3 && roleId == 1" style="margin-top: 20px">
      <el-radio v-model="resu" label="1" size="medium">同意申请</el-radio>
      <el-radio v-model="resu" label="0" size="medium">拒绝申请</el-radio>
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入备注"
        v-model="note"
      >
      </el-input>
      <el-button type="primary" plain @click="deal()">提交</el-button>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-input v-model="note" label="备注"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ApplyDetail",
  data() {
    return {
      apply: {},
      //   applyDetail: {},
      goods: {},
      user: {
        username: "",
      },
      goodsUse: {},
      showGoods: false,
      showUser: false,
      atype: 0,
      note: "",
      dialogVisible: false,
      resu: "1",
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
    };
  },
  props: {
    id: Number,
    roleId: Number,
  },
  created() {
    this.detail();
  },
  methods: {
    async detail() {
      const { data: res } = await this.$http.get("/apply/getById", {
        params: { id: this.id },
      });
      this.apply = res.applyInfo;
      this.atype = this.apply.applyType;
      if (this.atype == 3) {
        this.showGoods = true;
        this.goods = res.goods;
        this.goodsUse = res.goodsUse;
      }
      if (this.atype == 1) {
        this.showUser = true;
        this.user = JSON.parse(this.apply.applyInfo);
      }
    },
    async deal() {
      const { data: res } = await this.$http.get("/apply/deal", {
        params: {
          id: this.id,
          result: this.resu,
          userId: localStorage.getItem("userId"),
          note: this.note,
        },
      });
      if (res.code >= 1) {
        this.$message.success(res.msg);
        //并且刷新当前列表
        this.detail();
      } else {
        this.$message.error(res.msg);
      }
    },
  },
};
</script>

<style>
/* .block {
  text-align: left;
  margin-top: 20px;
} */
</style>
