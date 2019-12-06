<template>
  <div class="hd-header" >
      <el-table :data="tableData" style="wight:100%" border>
          <el-table-column label="操作">
            <template slot-scope="scope"> 
                <span class="el-icon-close" @click="removeTS(scope.$index)"></span>
                <span class="el-icon-plus" style="margin:0px  15px"  @click="addTS(scope.$index,$event)"></span>
                <span class="el-icon-rank"></span>
            </template>
          </el-table-column>

          <el-table-column label="参数名称">
              <template slot-scope="scope">
                   <input type="text" class="cname" v-model="tableData[scope.$index].cname" :style="{ 'text-indent':indent[scope.$index]+'px'}">
              </template>
          </el-table-column>
          
          <el-table-column  label="是否必填">
              <template slot-scope="scope">
                  <el-select v-model="tableData[scope.$index].isrequired">
                      <el-option label="True" value="true"></el-option>
                      <el-option label="false" value="false"></el-option>
                  </el-select>
              </template>
          </el-table-column>

          <el-table-column  label="类型">
              <template slot-scope="scope">
                  <el-select v-model="tableData[scope.$index].type">
                      <el-option label="True" value="true"></el-option>
                      <el-option label="false" value="false"></el-option>
                  </el-select>
              </template>
          </el-table-column>

          <el-table-column  label="描述">
              <template slot-scope="scope">
                  <input type="text" class="cname" v-model="tableData[scope.$index].detail"  @input="aa(scope.$index,scope.row.name)">
              </template>
          </el-table-column>

          


      </el-table>

 
  </div>
</template>

<script>
export default {
    data(){
        return{
            indent:[],  //输入框的边距
            tableData:[

                {test:"",cname:"a",isrequired:"ture",type:"ture",detail:"这是网站1"},
                {cname:"b",isrequired:"ture",type:"ture",detail:"这是网站2"},
                {cname:"c",isrequired:"ture",type:"ture",detail:"这是网站3"},
                {cname:"d",isrequired:"ture",type:"ture",detail:"这是网站4"},
                {cname:"e",isrequired:"ture",type:"ture",detail:"这是网站5"},
                {cname:"f",isrequired:"ture",type:"ture",detail:"这是网站6"},

            ]
        }
    },
    methods:{
        addTS(index,event){
            console.log(index)
            this.tableData.splice(index+1,0,{prop:"",isrequired:null,type:"",detail:""})
            var tt=this.indent[index]
            this.indent.splice(index+1,0,15+tt)

        },
        removeTS(index){
            this.tableData.splice(index,1);
            this.indent.splice(index,1)
        },
        isListData(){
            if(this.tableData.length==0){
                this.$set(this.tableData,0,
                    {prop:"",isrequired:null,type:"",detail:""}
                )
            }
        },
        aa(a,b){
            console.log(a,"a得知",typeof a)
            console.log(b,"b的值")
       
        },
        indentMarginLeft(){
            this.tableData.forEach((item,index)=>{
                console.log(index,item)
                this.indent[index]=0
            })
        }

    },
    created(){
        
        this.isListData() , //如果列表为空则自动添加一个
        this.indentMarginLeft()
        console.log(this.indent)
    },
    updated(){
        console.log(this.indent),
        console.log(this.tableData)
    }
}
</script>

<style lang="scss" scoped>

</style>

<style>
.hd-header{
    margin-top: 20px;
    min-width: 100px;

  
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
/* .el-table__row:hover .cname{
    background: rgb(245, 247, 250);
    border: 2px solid rgb(245, 247, 250)
} */



.el-table--enable-row-hover .el-table__body tr:hover>td{
background-color: #ffffff !important;
}
</style>