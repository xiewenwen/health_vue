<template>
<div>
     
        <el-form
          :model="addForm"
          :rules="adddFormrules"
          ref="addFormRef"
          label-width="70px"
        >
          <el-form-item label="幢" prop="zhuang">
            <el-input v-model="addForm.zhuang"></el-input>
          </el-form-item>
          <el-form-item label="单元" prop="danYuan">
            <el-input v-model="addForm.danYuan"></el-input>
          </el-form-item>
          <el-form-item label="门牌号" prop="bianHao">
            <el-input v-model="addForm.bianHao"></el-input>
          </el-form-item>
          <el-form-item label="居住人" prop="liveUserId">
            <el-select
              v-model="addForm.liveUserId"
              multiple
              placeholder="请选择"
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
        </el-form>
        <!-- <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addBuilding">确定</el-button>
        </span>
      </el-dialog> -->
</div>
  
</template>

<script>
export default {
    name:'AddNotice',
    data(){
        return{
            addDialogVisible:false,
            addForm:{},

        }
    },
    props: {
    msg: Boolean
   },
    created(){

    },
    methods:{

    }
    

}
</script>

<style>

</style>