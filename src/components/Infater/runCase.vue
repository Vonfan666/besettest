<template>
  <div class="runCase">
    <div class="runCase_context">
      <div class="run_title" >
        <el-button type="primary" size="small" class="el-icon-plus">新建测试计划</el-button>
      </div>
      <div class="run_body" >
          <el-table 
          :data="tableData"
          style="width: 100%"
          max-height="250"
          border
          
         :header-cell-style="textStyle"
         :cell-style="textStyle"
          >
          <el-table-column
            prop="id"
            label="Id"
            width="50">
         </el-table-column>
          <el-table-column
            prop="name"
            label="名称"
            width="150">
         </el-table-column>
         <el-table-column
            prop="cname"
            label="中文名称"
            width="160">
         </el-table-column>
         <el-table-column
            
            prop="runStartTime"
            label="执行开始时间"
            width="160">
         </el-table-column>
         <el-table-column
            prop="status"
            label="状态"
            width="150">
         </el-table-column>
         <el-table-column
            prop="runEndTime"
            label="执行完成时间"
            width="160">
         </el-table-column>
         <el-table-column
            prop="CaseCount"
            label="用例数量"
            width="100">
         </el-table-column>
         <el-table-column
            prop="user"
            label="创建人"
            width="150">
         </el-table-column>
         <el-table-column
            prop="createTime"
            label="创建时间"
            width="160">
         </el-table-column>
         <el-table-column
            prop="detail"
            label="备注"
            width="160">
         </el-table-column>
         <el-table-column
            fixed="right"
            label="操作"
            width="230"
            height="50"
            >
            <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">删除</el-button>
            <el-button type="text" size="small">执行</el-button>
            <el-button type="text" size="small">结果</el-button>
      </template>
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
                    id:"1",
                    name:"TestCase",
                    cname:"慧投1.01版接口",
                    runStartTime:"立即执行",
                    status:"未执行",
                    runEndTime:"-",
                    CaseCount:"888",
                    user:"冯凡",
                    createTime:"2020-06-09 16:49:55",
                    detail:"不要删除不要删除不要删除",

                }
            ],
        }
    },
    methods:{
        handleClick(){
            
        },
        textStyle({row, column, rowIndex, columnIndex}){
            return "text-align:center"
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

</style>

<style >
.TextCenter{
    text-align:center
}
</style>