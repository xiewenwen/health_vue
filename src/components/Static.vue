<template>
  <div class="column-container">
    <el-breadcrumb separator="/">
      <!-- <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item> -->
      <el-breadcrumb-item>首页监控信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="20">
      <el-col :span="6"
        ><div class="grid-content bg-purple">
          <span>核酸过期人数：{{ healthNum }}</span>
        </div></el-col
      >
      <el-col :span="6"
        ><div class="grid-content bg-purple">
          <span>消息未处理：{{ applyNum }}</span>
        </div></el-col
      >
      <el-col :span="6"
        ><div class="grid-content bg-purple">
          <span v-for="item in genders" :key="item.index">
            <template v-if="item.gender == 0"
              >男性： {{ item.genderNum }}</template
            >
            <!-- 1是女性  0是男性 -->
            <template v-if="item.gender == 1"
              >女性：{{ item.genderNum }}</template
            >
          </span>
        </div></el-col
      >

      <el-col :span="6"
        ><div class="grid-content bg-purple">
          <span v-for="item in userOwner" :key="item.index">
            {{ item.ownerType }}:{{ item.ownerNum }}
          </span>
        </div></el-col
      >
    </el-row>
    <!-- <div
      ref="circle"
      class="echarts-box"
      style="width: 450px; height: 300px; border: 1px solid red"
    ></div> -->
  </div>
</template>

<script>
export default {
  name: "Static",
  data() {
    return {
      userInfo: "",
      genders: [],
      goods: [],
      healthNum: 0,
      userOwner: [],
      applyNum: 0,
    };
  },
  created() {
    // this.initMonthWorkOrder();
    // this.initcircle();
    this.getUserInfo();
    this.getHealthInfo();
    this.getApplyInfo();
  },
  methods: {
    async getUserInfo() {
      const { data: res } = await this.$http.get("/sta/user");
      this.genders = res.userGender;
      this.userOwner = res.userOwner;
      console.log(res);
      console.log(this.userInfo);
    },
    async getHealthInfo() {
      const { data: res } = await this.$http.get("/sta/health");
      this.healthNum = res.healthNum;
      console.log(res);
      console.log(this.healthNum);
    },
    async getApplyInfo() {
      const { data: res } = await this.$http.get("/sta/apply");
      this.applyNum = res.applyNum;
      console.log(res);
      console.log(this.applyNum);
    },

    // initcircle() {
    //   let myChart = this.$echarts.init(this.$refs.circle);
    //   let option = {
    //     series: [
    //       {
    //         type: "pie",
    //         data: [
    //           {
    //             value: 335,
    //             name: "直接访问",
    //           },
    //           {
    //             value: 234,
    //             name: "联盟广告",
    //           },
    //           {
    //             value: 1548,
    //             name: "搜索引擎",
    //           },
    //         ],
    //       },
    //     ],
    //   };
    //   myChart.setOption(option);
    // },
  },
};
</script>

<style>
.el-row {
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 4px rgba(0, 0, 0, 0.04); */
}
.bg-purple-dark {
  background: #dbe4a9;
}
.bg-purple {
  width: 23%;
  background: #e3e9c2;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  width: 100%;
  height: 110px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
