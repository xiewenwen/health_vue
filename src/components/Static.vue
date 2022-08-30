<template>
  <div class="column-container">
    <el-breadcrumb separator="/">
      <!-- <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item> -->
      <el-breadcrumb-item>首页监控信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="12" style="margin-top: 7px">
      <el-col :span="6">
        <el-card
          shadow="always"
          class="my-card"
          style="border-top-color: rgb(236, 163, 114)"
        >
          <span>核酸检测人数</span>
          <br />
          <span class="my-card-item">10</span>
          <el-image
            class="myimg"
            :src="require('../assets/yellow.png')"
          ></el-image
          ><br />
          过期：<span class="" style="color: rgb(0, 0, 0)">{{ healthNum }}</span
          ><br />
          正常：<span class="" style="color: rgb(0, 0, 0)">10</span>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card
          shadow="always"
          class="my-card"
          style="border-top-color: #1e90ff"
        >
          <span>申请通知(条)</span>
          <br />
          <span class="my-card-item">10</span>
          <el-image
            class="myimg"
            :src="require('../assets/bule.png')"
          ></el-image
          ><br />
          已处理：<span class="" style="color: rgb(0, 0, 0)">3</span><br />
          未处理：<span class="" style="color: rgb(0, 0, 0)">{{
            applyNum
          }}</span>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card
          shadow="always"
          class="my-card"
          style="border-top-color: #00ced1"
        >
          <span>人口总数</span>
          <br />
          <span class="my-card-item">{{ menNum + ladyNum }}</span>
          <el-image
            class="myimg"
            :src="require('../assets/green.png')"
          ></el-image
          ><br />
          <span>
            男性：<span style="color: rgb(0, 0, 0)">{{ menNum }}</span
            ><br />
            女性：<span style="color: rgb(0, 0, 0)">{{ ladyNum }}</span>
          </span>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card
          shadow="always"
          class="my-card"
          style="border-top-color: #ff69b4"
        >
          <span>居住类别</span>
          <br />
          <span class="my-card-item">{{ menNum + ladyNum }}</span>
          <el-image class="myimg" :src="require('../assets/red.png')"></el-image
          ><br />
          <span v-for="item in userOwner" :key="item.index">
            {{ item.ownerType }}：<span style="color: rgb(0, 0, 0)">{{
              item.ownerNum
            }}</span
            ><br />
          </span>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">

  <el-col :span="12"><div class="grid-content bg-purple"><el-card class="box-card">
    <div slot="header" class="clearfix">
      <span v-for="item in sal" :key="item.index">{{item.name}}:{{item.value}}</span>
  </div>
  <el-table
      :data="users"
      style="width: 100%">
      <el-table-column
        prop="username"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="tel"
        label="电话">
      </el-table-column>
      <el-table-column
        prop="hsCode"
        label="健康码">
        <template slot-scope="scope">
            <el-tag v-show="scope.row.hsCode === '红码'" type="danger">{{scope.row.hsCode}}</el-tag>
            <el-tag v-show="scope.row.hsCode === '黄码'" type="warning">{{scope.row.hsCode}}</el-tag>
            <el-tag v-show="scope.row.hsCode === '绿码'" type="success">{{scope.row.hsCode}}</el-tag>
          </template>
      </el-table-column>
      <el-table-column
        prop="updatetime"
        label="检测时间">
      </el-table-column>
      <el-table-column
        prop="home"
        label="住址">
      </el-table-column>
    </el-table>
</el-card>
    </div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>物资库存</span>
  </div>
  <div
      ref="circle"
      style="width: 450px; height: 370px;"
    ></div>
</el-card></div>
</el-col>
</el-row>
    
    <!-- <div class="column-container">
    <div ref="monthWorkOrder" class="echarts-box" style="width: 600px; height: 300px; border: 1px solid red"></div>
  </div> -->
  </div>
</template>
<script>
// import * as echarts from 'echarts';
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
      menNum: 0,
      ladyNum: 0,
      goodsSum:[],
      sal:[],
      users:[],
      tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
    };
  },
  created() {
    //   this.initMonthWorkOrder();
    //  this.initcircle();
    this.getUserInfo();
    this.getHealthInfo();
    this.getApplyInfo();
    this.getGoodsInfo();
    this.getHealthCode();
  },
  mounted() {
    // this.initMonthWorkOrder();
    //要放到mounted下，creaed下无效
   
    // this.initcircle();
  },
  methods: {
    async getUserInfo() {
      const { data: res } = await this.$http.get("/sta/user");
      this.genders = res.userGender;
      this.userOwner = res.userOwner;
      console.log(res);
      //获得男女性别人数
      this.genders.forEach((element) => {
        console.log(element);
        if (element.gender === 0) {
          this.menNum = element.genderNum;
        }
        if (element.gender === 1) {
          this.ladyNum = element.genderNum;
        }
      });
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
    async getGoodsInfo() {
      const { data: res } = await this.$http.get("/sta/goodsSum");
      this.goodsSum = res;
      console.log(res);
      //拿到数据后，在这一步渲染图表
      this.initcircle();
    },
    async getHealthCode(){
      const {data:res}=await this.$http.get("/sta/healthCode");
      this.sal=res.sal;
      this.users=res.users; 
    },

    initcircle() {
      let myChart = this.$echarts.init(this.$refs.circle, null, {
        renderer: "canvas",
        useDirtyRect: false,
      });
      console.log("sdsdsdsd",this.goodsSum);
      var option = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
        },
        series: [
          {
            name: "物资数量",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            // data: [
            //   { value: 1048, name: "Search Engine" },
            //   { value: 735, name: "Direct" },
            //   { value: 580, name: "Email" },
            //   { value: 484, name: "Union Ads" },
            //   { value: 300, name: "Video Ads" },
            // ],
            data:this.goodsSum
          },
        ],
      };
      myChart.setOption(option);
    },
  },
};
</script>

<style scoped>
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
  height: 100%;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.my-card {
  font-size: 15px;
  margin: 4px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  color: rgb(148, 148, 155);
  border-top-style: solid;
  border-top-width: 2px;
  background-repeat: no-repeat;
  background-position: right bottom;
}
.my-card-item {
  font-size: 17px;
  margin-top: 10px;
  line-height: 2;
  color: rgb(0, 0, 0);
  font-weight: bold;
}
.myimg {
  /* margin-right: 5px; */
  float: right;
}
</style>
