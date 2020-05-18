<template>
  <box v-slot:Cenvironment :styleCode="environmentStyle">
    <div class="all">
      <div class="environmenttitle">
        <h3>{{environmentTitle}}</h3>
      </div>
      <div class="environmentbody">
        <el-table :data="environmentList" style="width: 100%" v-if="statusIng.homePage">
          <el-table-column label="GlobarlName">
            <template slot-scope="scope">{{scope.row.name}}</template>
          </el-table-column>

          <el-table-column>
            <template slot-scope="scope">
              <el-button size="mini" @click="Edit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="Delete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div v-if="statusIng.globarlPage" class="globarl">
          <el-table :data="globarlsList" border>
            <el-table-column prop="key" label="Key">
              <template slot-scope="scope">
                <el-input
                  @change="changeInputPush(scope.$index)"
                  v-model="scope.row.key"
                  clearable
                  placeholder="请输入key"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="value" label="Value">
              <template slot-scope="scope">
                <el-input
                  @change="changeInputPush(scope.$index)"
                  :style="inputStyle"
                  v-model="scope.row.value"
                  clearable
                  placeholder="请输入value"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column width="35">
              <template slot-scope="scope">
                <span
                  v-if="scope.$index!==globarlsList.length-1"
                  class="el-icon-close"
                  @click="globarlRemove(scope.$index)"
                ></span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-if="statusIng.enviromentStatus" class="environments-c">
          <div class="envTitle" style="text-align:left;margin:10px 0">
            <b>Environment Name</b>
            <el-form :model="froms" :rules="rules" res="resEnvironmen">
              <el-form-item prop="environmenName">
                <el-input v-model="froms.environmenName"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="envBody">
            <el-table :data="addEnvironmentList" border>
              <el-table-column prop="key" label="Key">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.key"
                    clearable
                    placeholder="请输入key"
                    @change="EnchangeInputPush(scope.$index)"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="value" label="Value">
                <template slot-scope="scope">
                  <el-input
                    :style="inputStyle"
                    v-model="scope.row.value"
                    clearable
                    placeholder="请输入value"
                    @change="EnchangeInputPush(scope.$index)"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column width="35">
                <template slot-scope="scope">
                  <span
                    v-if="scope.$index!==addEnvironmentList.length-1"
                    class="el-icon-close"
                    @click="environmentRemove(scope.$index,addEnvironmentList)"
                  ></span>
                </template>
              </el-table-column>
            </el-table>
          </div>
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
      <div class="environmentFoot" v-if="statusIng.homePage">
        <el-button type="primary" size="small" @click="close()">关闭</el-button>
        <el-button type="primary" size="small" @click="globarlButton()">全局变量</el-button>
        <el-button type="primary" size="small" @click="environmentButton()">环境变量</el-button>
      </div>
      <div class="environmentFoot" v-if="statusIng.globarlPage">
        <el-button type="primary" size="small" @click="close()">关闭</el-button>
        <el-button type="primary" size="small" @click="globarlBackHome()">返回</el-button>
        <el-button type="primary" size="small" @click="glovarlSave()">保存</el-button>
      </div>
      <div class="environmentFoot" v-if="statusIng.enviromentStatus">
        <el-button type="primary" size="small" @click="close()">关闭</el-button>
        <el-button type="primary" size="small" @click="environmentBackHome()">返回</el-button>
        <el-button type="primary" size="small" @click="environmentSave()">保存</el-button>
      </div>
    </div>
  </box>
</template>

<script>
import { EnvironmentsAdd, EnvironmentsSelect } from "../../axios/api";

export default {
  components: {
    box: () => import("./MessageBox.vue")
  },
  props: ["environmentList", "styleCode", "globarl"],
  data() {
    return {
      // environmentList.E_data
      // environmentList.G_data

      // [{token: "1423"}, {4423: "432"}]转化成key+value
      
      addEnvironmentList: [],
      globarlsList: [],
      froms: {
        environmenName: ""
      },
      statusIng: {
        homePage: true,
        globarlPage: false,
        environmentPage: false
      },
      numpage: "", //总共多少页
      allTotal: null, //总共多少数量
      environmentTitle: "环境变量",
      environmentStyle: "height:700px;width:1000px",
      currentPage: 1, //当前是第几页
      pagesize: 10, //每页展示多少个
      currentEnvironmentIndex:null,
      inputStyle: "border: none;",
      rules: {
        environmenName: [
          {
            required: true,
            message: "请填写环境名称"
          }
        ]
      }
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
    //如果用户操作最后一个输入框之后，就给他自动添加一个
    changeInputPush(index) {
      console.log(index);
      if (index + 1 === parseInt(this.globarlsList.length)) {
        this.globarlsList.push({
          key: "",
          value: ""
        });
      }
      //添加成功之后移除最后一个的删除按钮
    },
    EnchangeInputPush(index){
      if (index + 1 === parseInt(this.addEnvironmentList.length)) {
        this.addEnvironmentList.push({
          key: "",
          value: ""
        });
      }
    },
    //如果最后一个不为空则自动添加一个进去--让输入框自动添加一个
    globarlsListFromPush() {
      console.log(this.globarlsList);
      var obj = this.globarlsList[this.globarlsList.length - 1];
      console.log(obj);
      if (obj.key != "" || obj.value != "") {
        this.globarlsList.push({
          key: "",
          value: ""
        });
      }
    },
    environmenListFromPush() {
      var obj = this.addEnvironmentList[this.addEnvironmentList.length - 1];
      console.log(obj);
      if (obj.key != "" || obj.value != "") {
        this.addEnvironmentList.push({
          key: "",
          value: ""
        });
      }
    },

    //点击编辑进入新增环境变量
    Edit(index, row) {
      //点击编辑是 创建一个 name用于绑定--在返回时时需要清空
      this.froms.environmenName = row.name;  
      this.currentEnvironmentIndex=index; //获取当前编辑的索引
      var EnvCode = [];
      console.log("bianji", index, row);
      console.log(this.environmentList, "this.environmentList");
      this.environmentButton();
      this.addEnvironmentList.splice(0, this.addEnvironmentList.length);
      Array.isArray(row.value)
        ? ((EnvCode = row.value),
          console.log(this.addEnvironmentList),
          this.updateEnvironment(EnvCode))
        : null;
    },
    //环境变量数据转换
    updateEnvironment(list) {
      console.log(list, "list");

      if (list.length > 0) {
        var obj = list.forEach((item, index) => {
          var key = Object.keys(item)[0];
          var value = Object.values(item)[0];
          this.addEnvironmentList.push({ key: key, value: value });
        });
      }
      this.environmenListFromPush();
      // debugger
    },
    //环境变量数据还原
    callbackEnvironment() {
      var submitEnvironmentList = [];
      this.addEnvironmentList.forEach((item, index) => {
        var key = item.key;
        var value = item.value;
        submitEnvironmentList.push({ key: value });
      });
      return submitEnvironmentList;
    },
    //全局变量数据转换
    updateGlobarl(globarls) {
      this.globarlsList.splice(0, this.globarlsList.length);
      var obj = globarls[0].value.forEach((item, index) => {
        var key = Object.keys(item)[0];
        var value = Object.values(item)[0];
        this.globarlsList.push({ key: key, value: value });
      });
      this.globarlsListFromPush();
    },
    //还原globarl
    callbackGlobarls() {
      var submitGlobarlList = [];
      this.globarlsList.forEach((item, index) => {
        var key = item.key;
        var value = item.value;
        submitGlobarlList.push({ key: value });
      });
      return submitGlobarlList;
    },
    //选中每页展示多条，val是当前选中每页展示的条数
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

    //点击全局变量改成状态值
    globarlButton() {
      this.statusIng.homePage = false; //隐藏第一页
      this.statusIng.globarlPage = true; //打开全局变量页面
      this.environmentTitle = "全局变量"; //title改成全局变量
      this.updateGlobarl(this.globarl);
    },
    environmentButton() {
      this.statusIng.homePage = false; //隐藏第一页
      this.statusIng.enviromentStatus = true; //打开全局变量页面
      this.environmentTitle = "环境变量"; //title改成全局变量
    },
    close() {
      this.$parent.statusIng.enviromentStatus = !this.$parent.statusIng
        .enviromentStatus;
    },

    //全局变量保存
    glovarlSave() {
      console.log(this.globarlsList);
    },

    environmentSave() {
      console.log("环境变量保存");
      var  obj=this.callbackEnvironment()
      console.log(obj)
      console.log(this.environmentList)
      this.environmentList[this.currentEnvironmentIndex].value=obj
      this.environmentList[this.currentEnvironmentIndex].name=this.froms.environmenName
      console.log(this.environmentList)
    },
    //全局变量移除某个
    globarlRemove(a) {
      this.globarlsList.splice(a, 1);
    },
    environmentRemove(index,obj){
      obj.splice(index,1)
      console.log(this.addEnvironmentList)
    },
    globarlBackHome() {
      this.statusIng.homePage = true; //隐藏第一页
      this.statusIng.globarlPage = false; //打开全局变量页面
      this.environmentTitle = "环境列表"; //title改成全局变量
    },
    environmentBackHome() {
      this.statusIng.homePage = true; //隐藏第一页
      this.statusIng.enviromentStatus = false; //打开全局变量页面
      this.environmentTitle = "环境列表"; //title改成全局变量
      this.froms.environmenName = "";
      this.currentEnvironmentIndex=""
    }
  },
  updated() {},
  mounted() {
    console.log("传过来了", this.environmentList);
    this.allTotal = parseInt(this.environmentList.length);
  }
  // watch:{
  //   globarlsList(oldVALUE,NEVALUE){
  //     console.log(11111,oldVALUE,NEVALUE)
  //   }
  // }
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

.globarl .headerInput {
  display: inline-block;
}
</style>>

<style >
.all .environmentbody .el-table__row td:nth-child(2) .cell {
  text-align: right !important;
}

.all .environmentbody .el-table__row td:nth-child(1) .cell {
  text-align: left !important;
}
.globarl .el-table td,
.environments-c .el-table td {
  padding: 5px 0;
}
.globarl .el-input__clear,
.environments-c .el-input__clear {
  line-height: 30px !important;
}
.globarl .el-input__inner,
.environments-c .envBody .el-input__inner {
  border: none;
  /* background-color:whitesmoke; */
}
</style>

