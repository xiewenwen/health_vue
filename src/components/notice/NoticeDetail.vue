<template>
  <div>
    <el-row>
      <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="22"
        ><div class="grid-content bg-purple">
          {{ notice.noticeText }}
        </div></el-col
      >
      <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
    </el-row>

    <div class="block">
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in applys"
          :key="index"
          icon="el-icon-more"
          type="primary"
          size="large"
          :timestamp="activity.createTime"
        >
          {{ activity.username }}评论：{{ activity.applyInfo }}
        </el-timeline-item>
      </el-timeline>
    </div>
    <el-row>
      <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="20"
        ><div class="grid-content bg-purple">
          <el-input
            type="textarea"
            :autosize="{ minRows: 1, maxRows: 2 }"
            placeholder="发布评论"
            v-model="info"
          >
          </el-input></div
      ></el-col>
      <el-col :span="3"
        ><div class="grid-content bg-purple">
          <el-button type="primary" @click="addApply">发布</el-button>
        </div></el-col
      >
    </el-row>
  </div>
</template>

<script>
export default {
  name: "NoticeDetail",
  data() {
    return {
      notice: null,
      applys: null,
      info: "",
    };
  },
  props: {
    id: Number,
    title: String,
  },
  created() {
    this.detail();
  },
  methods: {
    async detail() {
      const { data: res } = await this.$http.get("/notice/getDetail", {
        params: { id: this.id },
      });
      this.notice = res;
      this.applys = this.notice.list;
    },
    async addApply() {
      let userId = localStorage.getItem("userId");
      const { data: res } = await this.$http.post("/notice/apply", {
        noticeId: this.id,
        applyUserId: userId,
        applyInfo: this.info,
        note: null,
        applyTyle: 1,
      });
      if (res >= 1) {
        this.$message.success("回复成功");
        this.info = "";
        this.detail();
      } else {
        this.$message.error("回复失败");
      }
    },
  },
};
</script>

<style scoped>
.block {
  text-align: left;
  margin-top: 20px;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #e5e9f2;
}
.bg-purple {
  background: white;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f4f5f7;
}
</style>
