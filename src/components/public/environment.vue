<template>
  <box v-slot:Cenvironment :styleCode="environmentStyle">
    <div class="all">
      <div class="environmenttitle">
        <h3>{{environmentTitle}}</h3>
      </div>
      <div class="environmentbody">
        <el-table :data="environmentList" style="width: 100%" v-if="statusIng.homePage">
          <el-table-column prop="name">
            <template slot-scope="scope">{{scope.row.name}}</template>
          </el-table-column>

          <el-table-column>
            <template slot-scope="scope">
              <el-button size="mini" @click="Edit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="Delete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div v-if="statusIng.globarlPage">
             <el-form v-model="globarlsList" ref="refFrom" class="beforeFrom">
                      <div v-for="(item,index) in globarlsList" :key="index">
                        <el-form-item class="headerInput">
                          <el-input
                            v-model="item.key"
                            clearable
                            placeholder="请输入key"
                          ></el-input>
                        </el-form-item>
                        <el-form-item class="headerInput">
                          <el-input
                            v-model="item.value"
                            clearable
                            placeholder="请输入value"
                          ></el-input>
                        </el-form-item>
                       
                      
                      </div>
                    </el-form>
        </div>
      </div>

      <div class="environmentPage" v-if="statusIng.homePage">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :hide-on-single-page="numpage"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="allTotal"
        ></el-pagination>
      </div>
      <div class="environmentFoot">
        <el-button type="primary" size="small" @click="close()">关闭</el-button>
        <el-button type="primary" size="small" @click="globarlButton">全局变量</el-button>
        <el-button type="primary" size="small">环境变量</el-button>
      </div>
    </div>
  </box>
</template>

<script>
import { EnvironmentsAdd,EnvironmentsSelect } from "../../axios/api";

export default {
  components: {
    "box": () => import("./MessageBox.vue")
  },
  props: ["environmentList", "styleCode", "globarl"],
  data() {
    return {
      // environmentList.E_data
      // environmentList.G_data

      // [{token: "1423"}, {4423: "432"}]转化成key+value
      globarlsList:[

      ],

      statusIng: {
        homePage: true,
        globarlPage: false,
        environmentPage: false
      },
      numpage: "", //总共多少页
      allTotal: null, //总共多少数量
      environmentTitle: "环境变量", 
      environmentStyle: "height:700px;width:700px",
      currentPage: 1, //当前是第几页
      pagesize: 10, //每页展示多少个
    };
  },
  methods: {
    //________________________________________________________________________
    // EnvironmentsSelect(){
    //   EnvironmentsSelect().then(res=>{
    //     if(res.status===200){
    //       console.log(res.results)
    //       return  res.results
    //     }
    //   })
    // },


    // ___________________________________________________________________
    //选中每页展示多条，val是当前选中每页展示的条数
    //数据转换
    updateGlobarl(globarls){
      console.log(JSON.stringify(globarls),"33213")
      this.globarlsList.splice(0,this.globarlsList.length)
      var obj=globarls[0].value.forEach((item,index) => {
          var key=Object.keys(item)[0]
          var value=Object.values(item)[0]
          this.globarlsList.push({"key":key,"value":value})
      });
    },
    //还原globarl
    callbackGlobarls(){
      var submitGlobarlList=[]
      this.globarlsList.forEach((item,index)=>{
        var key=item.key
        var value=item.value
        submitGlobarlList.push({key:value})
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    //返回当前是第几页val是当前点击的椰树
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    //删除环境变量
    Delete(index, item) {
      console.log(index, item);
      this.environmentList.splice(index, 1);
      //删除之后跟新当前值
      this.allTotal = this.environmentList.length;
    },
    globarlButton() {
      this.statusIng.homePage = false;
      this.statusIng.globarlPage = true
      this.environmentTitle="全局变量"
      this.updateGlobarl(this.globarl)
    },
    close(){
        this.$parent.statusIng.enviromentStatus=!this.$parent.statusIng.enviromentStatus
    },
    Edit(index,item) {

    }
  },

  mounted() {
    console.log(":this.environmentList.length",this.environmentList.length)
    this.allTotal =parseInt(this.environmentList.length)
    // this.updateGlobarl(this.globarl)
    
  }
};
</script>

<style lang="scss"  scoped >
.all {
  //   background-color: red;
  margin: 10px;
}
.all .environmenttitle {
  text-align: center;

    border-bottom: 1px solid #c9b2b2;
}
.all .environmentbody {
  overflow-x: hidden;
  height: 520px;
}

.all .environmentPage {
  margin-top: 10px;
  text-align: center;
}

.all .environmentFoot {
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: 20px;
}
</style>>

<style >
.all .environmentbody .el-table__row td:nth-child(2) .cell {
  text-align: right !important;
}

.all .environmentbody .el-table__row td:nth-child(1) .cell {
  text-align: left !important;
}
</style>

