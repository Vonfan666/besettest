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
          :header-cell-style="textStyle"
         :cell-style="textStyle"
          >
          <el-table-column
            prop="id"
            label="ID"
            width="150">
         </el-table-column>
          <el-table-column
            prop="name"
            label="用例名称"
            width="150">
         </el-table-column>
         <el-table-column
            prop="postMethod"
            label="请求类型"
            width="150">
         </el-table-column>
         <el-table-column
            prop="isInterface"
            label="所属接口"
            width="150">
         </el-table-column>
         <el-table-column
            prop="isClass"
            label="所属分类"
            width="150">
         </el-table-column>
         <el-table-column
            prop="detail"
            label="用例描述"
            width="150">
         </el-table-column>
         <el-table-column
            prop="user"
            label="创建人"
            width="150">
         </el-table-column>
         <el-table-column
            prop="createTime"
            label="创建时间"
            width="150">
         </el-table-column>
         <el-table-column
            prop="createTime"
            label="修改人"
            width="150">
         </el-table-column>
         <el-table-column
            prop="createTime"
            label="最后一次修改时间"
            width="150">
         </el-table-column>
         <el-table-column
            fixed="right"
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
                    id:"1",
                    name:"正常登陆",
                    postMethod:"POST",
                    isInterface:"登录注册",
                    isClass:"登录模块",
                    detail:"正常登陆",
                    user:"冯凡",
                    createTime:"2020-06-09 16:49:55",

                }
            ],
        }
    },
    methods:{
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
</style>>