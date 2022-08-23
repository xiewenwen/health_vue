<template>
<div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>/申请列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="item">
      <el-select v-model="queryInfo.level" placeholder="消息等级">
        <el-option
          v-for="item in levels"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-select v-model="queryInfo.status" placeholder="发布状态">
        <el-option
          v-for="item in status"
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
        @click="getNoticeList"
        >搜索</el-button
      >
      <el-button type="primary" @click="addDialogVisible = true"
        >新增</el-button
      >
    </div>
    <div>
      <el-table :data="noticeList" class="tableStyle" border stripe max-height="480" size="mini">
        <!-- <el-table-column type="index"></el-table-column> -->
        <el-table-column prop="id" label="编号" min-width="20px"> </el-table-column>
        <el-table-column prop="noticeTitle" label="标题"> </el-table-column>
        <el-table-column prop="noticeText" label="正文内容" show-overflow-tooltip="true"> </el-table-column>
        <!-- <el-table-column prop="noticeLevel" label="通知等级" :formatter="fromFormatter">

        </el-table-column> -->
        <el-table-column prop="noticeDate" label="发布日期" min-width="50px"></el-table-column>
        <el-table-column prop="noticeLevel" label="通知等级" min-width="50px">
          <template slot-scope="scope">
            <el-tag v-show="scope.row.noticeLevel === 1" type="danger">{{
              fromFormatter(scope.row, noticeLevel, scope.row.noticeLevel)
            }}</el-tag>
            <el-tag v-show="scope.row.noticeLevel === 2" type="warning">{{
              fromFormatter(scope.row, noticeLevel, scope.row.noticeLevel)
            }}</el-tag>
            <el-tag v-show="scope.row.noticeLevel === 3" type="info">{{
              fromFormatter(scope.row, noticeLevel, scope.row.noticeLevel)
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="发布状态" min-width="50px">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status === 1 ? 'success' : ''">{{
              typeFormatter(scope.row, status, scope.row.status)
            }}</el-tag>
          </template>
        </el-table-column>
        
        <el-table-column label="操作" min-width="50px" align="left">
          <template slot-scope="scope">
            <!--  0 未发布  1.已发布-->
            <el-button
              @click="updateStatus(scope.row.id)"
              type="text"
              size="small"
              v-show="scope.row.status === 0"
              >发布</el-button
            >
            <el-button
              @click="edit(scope.row.id)"
              type="text"
              size="small"
              v-show="scope.row.status === 0"
              >编辑</el-button
            >
            <el-button type="text" size="small" @click="del(scope.row.id)"
              >删除</el-button
            >
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
      <el-dialog title="发布消息" :visible.sync="addDialogVisible" width="40%" @close="closeDialog">
        <AddNotice :msg="addDialogVisible" />
      </el-dialog>
    </div>
</div>
  
</template>

<script>
export default {
    name:'ApplyInfo',
    data(){
        return{

        }
    },created(){

    },
    methods:{

    }
}
</script>

<style>

</style>