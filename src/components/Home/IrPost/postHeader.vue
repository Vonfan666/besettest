<template>
  <div class="hd-header" >
      <el-table :data="tableData" style="wight:100%" border="">
          <el-table-column label="操作">
            <template slot-scope> 
                <span class="el-icon-close"></span>
                <span class="el-icon-plus" style="margin:0px  15px"></span>
                <span class="el-icon-rank"></span>
            </template>
          </el-table-column>

          <el-table-column prop="cname" label="参数名称">
              <template>
                   <input type="text" class="cname">
              </template>
          </el-table-column>
          
          <el-table-column prop="isrequired" label="是否必填">
              <template>
                  <el-select>
                      <el-option label="True" value="true"></el-option>
                      <el-option label="false" value="false"></el-option>
                  </el-select>
              </template>
          </el-table-column>

          <el-table-column prop="type" label="类型">
              <template>
                  <el-select>
                      <el-option label="True" value="true"></el-option>
                      <el-option label="false" value="false"></el-option>
                  </el-select>
              </template>
          </el-table-column>

          <el-table-column prop="detail" label="描述">
              <template>
                  <input type="text" class="cname">
              </template>
          </el-table-column>


      </el-table>

 
  </div>
</template>

<script>
export default {
    data(){
        return{
            tableData:[
                {prop:"test1",isrequired:"ture",type:"json",detail:"这是网站"},
                {prop:"test1",isrequired:"ture",type:"json",detail:"这是网站"},
                {prop:"test1",isrequired:"ture",type:"json",detail:"这是网站"},
                {prop:"test1",isrequired:"ture",type:"json",detail:"这是网站"},
                {prop:"test1",isrequired:"ture",type:"json",detail:"这是网站"},
                {prop:"test1",isrequired:"ture",type:"json",detail:"这是网站"},

            ]
        }
    }
}
</script>

<style lang="scss" scoped>

</style>

<style>
.hd-header{
    margin-top: 20px;

  
}
.hd-header .cell{
    text-align: center
}
.cname{
    position: relative;
    overflow: visible;
    border: 1px solid #ffffff;
    outline: none;
    width: 100%;
    height: 36px;
    margin-left: 0px;
    

}
.el-table__row:hover .cname{
    background: rgb(245, 247, 250);
    border: 2px solid rgb(245, 247, 250)
}



</style>