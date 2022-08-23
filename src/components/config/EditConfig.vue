<template>
  <div style="width:600px">
      <el-form
          :model="addForm"
          ref="addForm"
          label-width="120px"
          style="text-align: left"
          label-position="right"
          
        >
          <el-form-item label="id" prop="id" v-show="false">
            <el-input
              v-model="addForm.goodName"
              style="width: 240px"
            ></el-input>
          </el-form-item>
          <el-form-item label="配置名称" prop="configName" :readonly="true">
            <el-input
              v-model="addForm.configName"
         
              label="配置名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="过期时间（小时）" prop="configHours">
            <el-input-number
              v-model="addForm.configHours"
              @change="handleChange"
              :min="1"
              :max="100"
              :readonly="true"
              label="过期时间(小时)"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="创建时间" prop="createTime">
            <el-date-picker v-model="addForm.createTime"  type="date" ></el-date-picker>
          </el-form-item>
          <el-form-item>
        <el-button type="primary" @click="updateConfig">保存</el-button>
        <el-button type="primary" @click="resetForm('addForm')">重置</el-button>
      </el-form-item>
        </el-form>
  </div>
</template>

<script>
export default {
    name:'EditConfig',
    data(){
        return{
            addForm:{}
        }
    },
    created() {
   this.getConfig();
  },
  methods:{
      async getConfig(){
         const { data: res } = await this.$http.get("system/getById", {
             params:{
                 id:1
             }
         });
       this.addForm=res;
      },
      async updateConfig(){
          const { data: res } = await this.$http.post("system/update", this.addForm);
      if (res >= 1) {
        
        this.$message.success("修改配置成功");
 
      } else {
        this.$message.error("修改配置失败");
      }
      },
      resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  }
    

}
</script>

<style>

</style>