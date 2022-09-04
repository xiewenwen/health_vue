<template>
  <div>
    <el-tabs v-model="applyType" type="card" @tab-click="handleClick">
      <el-tab-pane label="居住人添加" name="1">
        <div style="width: 500px">
          <el-form
            :label-position="labelPosition"
            label-width="80px"
            :model="user"
            size="mini"
          >
            <el-form-item label="姓名">
              <el-input v-model="user.username"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio v-model="user.gender" label="1" size="medium"
                >男</el-radio
              >
              <el-radio v-model="user.gender" label="0" size="medium"
                >女</el-radio
              >
            </el-form-item>
            <el-form-item label="身份证">
              <el-input v-model="user.cardId"></el-input>
            </el-form-item>
            <el-form-item label="电子邮件">
              <el-input v-model="user.email"></el-input>
            </el-form-item>
            <el-form-item label="手机">
              <el-input v-model="user.tel"></el-input>
            </el-form-item>
            <el-form-item label="居住房屋">
              <el-input v-model="user.livePlace" disabled></el-input>
            </el-form-item>
            <el-form-item label="户籍">
              <el-input v-model="user.huji"></el-input>
            </el-form-item>
            <el-form-item label="职业">
              <el-input v-model="user.zhiYe"></el-input>
            </el-form-item>
            <el-form-item label="工作地址">
              <el-input v-model="user.workPlace"></el-input>
            </el-form-item>
            <el-form-item label="学历">
              <el-select v-model="user.xueLi">
                <el-option label="小学" value="小学"></el-option>
                <el-option label="初中" value="初中"></el-option>
                <el-option label="高中" value="高中"></el-option>
                <el-option label="专科" value="专科"></el-option>
                <el-option label="本科" value="本科"></el-option>
                <el-option label="硕士" value="硕士"></el-option>
                <el-option label="博士" value="博士"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="居住类型">
              <el-select v-model="user.owner">
                <el-option label="业主" value="0"></el-option>
                <el-option label="租客" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addApply()">提交申请</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="物资申请" name="3">物资申请</el-tab-pane>
      <el-tab-pane label="访客登记" name="2">访客登记</el-tab-pane>
      <el-tab-pane label="社区意见" name="4">社区意见</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "AddApply",
  data() {
    return {
      applyType: "1",
      applyInfo: {
        applyType: 0,
        applyInfo: "",
        applyUserId: 0,
        applyUserName: "",
      },
      bname: "",
      user: {
        username: "",
        email: "",
        tel: "",
        livePlace: null,
        gender: "0",
        cardId: "",
        huji: "",
        zhiYe: "",
        workPlace: "",
        xueLi: "",
        owner: "",
      },
    };
  },
  created() {
    this.getBuilding();
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    async getBuilding() {
      let buildingsId = localStorage.getItem("buildingsId");
      const { data: res } = await this.$http.get("building/findById", {
        params: { id: buildingsId },
      });
      if (res != null) {
        let bname = res.zhuang + res.danYuan + res.bianHao;
        this.bname = bname;
      }
      this.user.livePlace = this.bname;
    },
    async addApply() {
      this.applyInfo.applyType = this.applyType;
      this.user.livePlace = localStorage.getItem("buildingsId");
      this.applyInfo.applyInfo = JSON.stringify(this.user);
      this.applyInfo.applyUserId = localStorage.getItem("userId");
      this.applyInfo.applyUserName = localStorage.getItem("username");
      const { data: res } = await this.$http.post("applys/add", this.applyInfo);
      if (res >= 1) {
        this.$message.success(res.msg);
        //添加成功后 关闭对话框

        //并且刷新当前列表
        // this.getBuildingList();
      } else {
        this.$message.error(res.msg);
      }
    },
  },
};
</script>

<style></style>
