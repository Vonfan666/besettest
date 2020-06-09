<template>
  <div class="runCase">
    <div class="runCase_context">
      <div class="run_title" >
        <el-button type="primary" size="small">新建执行</el-button>
      </div>
      <div class="run_body">
          <el-table 
          :data="tableData"
          style="width: 100%"
          max-height="250"
          >
          <el-table-column
            fixed
            prop="date"
            label="用例名称"
            width="150">
         </el-table-column>
         <el-table-column
            fixed
            prop="date"
            label="请求类型"
            width="150">
         </el-table-column>
         <el-table-column
            fixed
            prop="date"
            label="所属接口"
            width="150">
         </el-table-column>
         <el-table-column
            fixed
            prop="date"
            label="所属分类"
            width="150">
         </el-table-column>
         <el-table-column
            fixed
            prop="date"
            label="用例描述"
            width="150">
         </el-table-column>
         <el-table-column
            fixed
            prop="date"
            label="创建人"
            width="150">
         </el-table-column>
         <el-table-column
            fixed
            prop="date"
            label="创建时间"
            width="150">
         </el-table-column>
         <el-table-column
            fixed
            prop="date"
            label="操作"
            width="150">
         </el-table-column>
          </el-table>
      </div>
    </div>
  </div>
</template>
    
<script>
export default {
    data(){
        return {
            tableData:[
                {
                    name:"用例名称"
                }
            ],
        }
    }
    
};
</script>

<style lang="scss" scoped>
.runCase {
  width: 100%;
  height: 100%;
  background: #eee;
  .runCase_context {
    margin: 0 10px;
  }
  .run_title {
    width: 100%;
    text-align: left;
    padding: 20px 0;
  }
}
</style>>

