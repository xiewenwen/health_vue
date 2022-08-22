<template>
  <div>
    <!-- <el-dialog :title="物资出库" :visible.sync="msg" width="40%"> -->
    <el-form
      :model="addForm"
      :rules="adddFormrules"
      ref="addForm"
      label-width="70px"
    >
      <el-form-item label="公告标题" prop="noticeTitle">
        <el-input v-model="addForm.noticeTitle"></el-input>
      </el-form-item>
      <el-form-item label="等级" prop="noticeLevel">
        <el-select v-model="addForm.noticeLevel" placeholder="请选择">
          <el-option label="严重" value="1"></el-option>
          <el-option label="普通" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="正文" prop="noticeText">
        <el-input
          type="textarea"
          :rows="7"
          v-model="addForm.noticeText"
        ></el-input>
      </el-form-item>
      <el-form-item label="配图" prop="noticePic">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          list-type="picture"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
        <!-- <el-input v-model="addForm.noticePic"></el-input> -->
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="addNotice">保存</el-button>
        <el-button type="primary" @click="resetForm('addForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- <span slot="footer" class="dialog-footer">
      <el-button @click="msg = false">取消</el-button>
      <el-button type="primary" @click="addBuilding">确定</el-button>
    </span> -->
    <!-- </el-dialog> -->
  </div>
</template>

<script>
export default {
  name: "AddNotice",
  data() {
    return {
      addDialogVisible: false,
      // fileList: [
      //   {
      //     name: "food.jpeg",
      //     url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
      //   },
      //   {
      //     name: "food2.jpeg",
      //     url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
      //   },
      // ],
      addForm: {
        noticeTitle: "",
        noticeLevel: null,
        opName: "",
        noticePic: "",
        noticeText: "",
      },
    };
  },
  props: {
    msg: Boolean,
  },
  created() {
    console.log(this.fileList);
  },
  methods: {
    async addNotice() {
      const { data: res } = await this.$http.post("notice/add", this.addForm);
      if (res >= 1) {
        this.$message.success(res.msg);
        //添加成功后 关闭对话框
        this.addDialogVisible = false;
        //并且刷新当前列表
      } else {
        this.$message.error(res.msg);
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
  },
};
</script>

<style></style>
