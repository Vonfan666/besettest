 <template>
  <div class="home">
    <div class="left" v-if="leftStatus">
      <div class="project">
        <el-form :model="data" :rules="rules" ref="projectref">
          <el-form-item prop="project" label="项目" label-width="40px">
            <el-select v-model="data.project" @change="changeProject()">
              <el-option
                ref="eloption"
                v-for="(item,index) in  projectList"
                :key="index"
                :value="item.id"
                :label="item.name"
              ></el-option>
              <!--:label 是展示在输入框的值  -->
            </el-select>
          </el-form-item>
        </el-form>
        <span class="icon el-icon-circle-plus-outline" @click="addProject()"></span>
      </div>

      <div class="nav">
        <div class="nav-context">
          <nav-list :listCode="nav" ref="navList"></nav-list>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="right-top">
        <div>
          <span class="icon iconfont openIcon" @click="openIcon($event)">&#xe660;</span>
        </div>
        <div class="right-top-context">
          <div class="setting" @mouseenter="settingStatus=true" @mouseleave="settingStatus=false">
            <!-- <div class="setting" @click="settingStatus=!settingStatus"> -->
            <div class="setting-context">
              <div class="settting-name">
                <div class="setting-name-context">
                  <span class="icon iconfont">&#xe63f;</span>
                  <span class="icon iconfont">姓名</span>
                </div>
              </div>
              <div class="setting-open" v-if="settingStatus">
                <div class="setting-open-context">
                  <p class="icon iconfont">&#xe63f; 修改邮箱</p>
                  <p class="icon iconfont">&#xe63f; 修改密码</p>
                  <p class="icon iconfont">&#xe63f; 切换账号</p>
                  <p class="icon iconfont">&#xe63f; 退出</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="right-context">
        <router-view></router-view>
      </div>
    </div>
    <add-project :styleCode="styleCode" v-slot:project v-if="addProjectStatus">
      <div class="addProject">
        <div class="addProjectHeaderTitle">
          <h3 v-if="projectProductStatus==1">项目列表</h3>
          <h3 v-if="projectProductStatus==2">添加项目</h3>
          <h3 v-if="projectProductStatus==3">编辑项目</h3>
        </div>

        <div class="addProjectBody" v-if="projectProductStatus==1">
          <el-table :data="projectList" border style="width: 100%" height="650">
            <el-table-column prop="id" label="Id" width="120"></el-table-column>
            <el-table-column prop="name" label="项目名称" width="120"></el-table-column>
            <el-table-column prop="devAttr" label="开发地址" width="120"></el-table-column>
            <el-table-column prop="testAttr" label="测试地址" width="120"></el-table-column>
            <el-table-column prop="productAttr" label="生产地址" width="120"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="120"></el-table-column>
            <el-table-column prop="boss" label="创建人" width="120"></el-table-column>

            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button @click="addProjectEdit(scope.row,scope.$index);projectProductStatus=3" type="text" size="small">编辑</el-button>
                <el-button type="text" size="small" @click="addProjectRemove(scope.row,scope.$index)">删除</el-button>
                <el-button type="text" size="small">添加成员</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="addProjectBodyEdit" v-if="projectProductStatus==3 || projectProductStatus==2">
          <!-- <div class="addProjectBodyEditClass">
            <span class="addProjectBodyEditName">项目名称：</span>
            <span class="addProjectBodyEditInput">
              <input />
            </span>
          </div> -->
          <div class="addProjectAttr" style="corlor:#606266">
            <!-- <span class="addProjectAttrs">开发地址：</span>
            <span class="addProjectAttrInput">
              <input />
            </span> -->
            <el-form :model="addProjectObj"  :rules="rules" >
              <el-form-item label="项目名称" prop="name" label-width="70px">
                <el-input v-model="addProjectObj.name" clearable placeholder="请输入项目名称" ></el-input>
              </el-form-item>
              <el-form-item label="开发地址" prop="devAttr" label-width="70px">
                <el-input v-model="addProjectObj.devAttr" clearable placeholder="请输入开发环境地址"></el-input>
              </el-form-item>
              <el-form-item label="测试地址" prop="productAttr" label-width="70px">
                <el-input v-model="addProjectObj.testAttr" clearable placeholder="请输入测试环境地址"></el-input>
              </el-form-item>
              <el-form-item label="生产地址" prop="infaterName" label-width="70px">
                <el-input v-model="addProjectObj.productAttr" clearable placeholder="请输入生产环境地址"></el-input>
              </el-form-item>
            </el-form>
            <!-- <el-form :model="addProjectObj" >
              
            </el-form> -->

            <!-- <span class="addProjectAttrs">测试地址：</span>
            <span class="addProjectAttrInput">
              <input />
            </span> -->

            <!-- <span class="addProjectAttrs">生产地址：</span>
            <span class="addProjectAttrInput">
              <input />
            </span> -->
          </div>
        </div>
        <div class="addProjectFoot">
          <el-button
            type="primary"
            size="small"
            @click="addProjectStatus=false;projectProductStatus=1;addProjectObj={}"
            v-if="projectProductStatus"
          >关闭</el-button>
          <el-button
            type="primary"
            size="small"
            @click="projectProductStatus=1;addProjectObj={}"
            v-if="projectProductStatus==2 || projectProductStatus==3"
          >返回</el-button>
          
          <el-button
            type="primary"
            size="small"
            @click="addProjectOk()"
            v-if="projectProductStatus==2 || projectProductStatus==3"
          >更新</el-button>
          <el-button
            type="primary"
            size="small"
            @click="projectProductStatus=2"
            v-if="projectProductStatus==1"
          >添加</el-button>
          <el-button
            type="primary"
            size="small"
            @click="addProjectSubmit()"
            v-if="projectProductStatus==1"
          >提交</el-button>
        </div>
      </div>
    </add-project>
  </div>
</template>

<script>
import Nav from "./Nav.vue";
export default {
  components: {
    "nav-list": Nav,
    "add-project": () => import("../public/MessageBox")
  },
  data() {
    return {
      projectIndex:null,
      projectProductStatus: 1,  // 1项目列表  2添加项目 3编辑项目 4添加成功
      addProjectStatus: 0, //弹窗是否展示 
      settingStatus: false,
      leftStatus: true,
      projectid: null,
      chioceProject: "测试项目1", //后台返回用户之前选择的项目-然后前端直接展示用户上次选择的项目
      data: {
        project: "" //用户选择的项目，
      },
      styleCode: "height: 800px;width: 1000px;",
      addProjectObj:{
        
        },
      rules:{
        name:[
          {required:true,message:"项目名称不能为空",trigger: "blur"}
        ]
      },
      projectList: [
        //后台返回的项目列表
        {
          id: 1,
          name: "测试项目1",
          devAttr: "",
          testAttr: "",
          productAttr: "",
          boss: "谁添加就是谁",
          createTime: ""
        },
        {
          id: 2,
          name: "测试项目2",
          devAttr: "",
          testAttr: "",
          productAttr: "",
          boss: "谁添加就是谁",
          createTime: ""
        },
        {
          id: 3,
          name: "测试项目3",
          devAttr: "",
          testAttr: "",
          productAttr: "",
          boss: "谁添加就是谁",
          createTime: ""
        },
        {
          id: 4,
          name: "测试项目4",
          devAttr: "",
          testAttr: "",
          productAttr: "",
          boss: "谁添加就是谁",
          createTime: ""
        },
        {
          id: 5,
          name: "测试项目5",
          devAttr: "",
          testAttr: "",
          productAttr: "",
          boss: "谁添加就是谁",
          createTime: ""
        },
        {
          id: 6,
          name: "测试项目6",
          devAttr: "",
          testAttr: "",
          productAttr: "",
          boss: "谁添加就是谁",
          createTime: ""
        },
        {
          id: 6,
          name: "测试项目6",
          devAttr: "",
          testAttr: "",
          productAttr: "",
          boss: "谁添加就是谁",
          createTime: ""
        },
        {
          id: 6,
          name: "测试项目6",
          devAttr: "",
          testAttr: "",
          productAttr: "",
          boss: "谁添加就是谁",
          createTime: ""
        },
        {
          id: 6,
          name: "测试项目6",
          devAttr: "",
          testAttr: "",
          productAttr: "",
          boss: "谁添加就是谁",
          createTime: ""
        },
        {
          id: 6,
          name: "测试项目6",
          devAttr: "",
          testAttr: "",
          productAttr: "",
          boss: "谁添加就是谁",
          createTime: ""
        },
        {
          id: 6,
          name: "测试项目6",
          devAttr: "",
          testAttr: "",
          productAttr: "",
          boss: "谁添加就是谁",
          createTime: ""
        },
        {
          id: 6,
          name: "测试项目6",
          devAttr: "",
          testAttr: "",
          productAttr: "",
          boss: "谁添加就是谁",
          createTime: ""
        }
      ],

      rules: {},
      nav: [
        //左侧导航
        {
          id: "1",
          name: "项目接口",
          list: [
            { id: "11", name: "接口文档" },
            { id: "12", name: "项目成员" },
            { id: "13", name: "全局变量" },
            { id: "14", name: "历史记录" }
          ]
        },
        { id: "2", name: "测试任务", list: [{ id: "21", name: "接口文档" }] },
        { id: "3", name: "环境配置" },
        { id: "4", name: "测试报告" },
        { id: "5", name: "定时任务" },
        {
          id: "6",
          name: "系统配置",
          list: [
            { id: "61", name: "角色管理" },
            { id: "62", name: "账号管理" }
          ]
        }
      ]
    };
  },
  methods: {
    changeProject(a) {
      console.log(this.projectid, typeof this.projectid);
      console.log(a, typeof a);
      console.log(this.data.project, "11");
      if (this.data.project === 10086) {
        this.$router.push({ path: "/BesetTest/login" });
      }
    },
    openIcon(self) {
      console.log("手气");
      this.leftStatus = !this.leftStatus;
      if (this.leftStatus) {
        self.srcElement.innerHTML = "&#xe660;";
      } else {
        self.srcElement.innerHTML = "&#xe65e;";
      }
    },
    addProject() {
      this.addProjectStatus = 1;
    },
    addProjectSubmit() {},
    addProjectOk() {
      console.log(this.projectProductStatus)
      if(this.projectProductStatus==2){
         console.log(this.addProjectObj)
      //将数据传给后台--后台返回生成id之后再添加进去
      this.projectList.unshift(this.addProjectObj)
      //这里单独封装一个js弹窗成功或者失败的方法
        this.projectProductStatus=1;
        this.addProjectObj={}
      }
      if(this.projectProductStatus==3){
        this.projectList[this.projectIndex]=this.addProjectObj
        this.projectProductStatus=1;
        this.addProjectObj={}
      }
     
    },
    addProjectEdit(item, index) {
      this.addProjectObj=item
      this.projectIndex=index
    },
    addProjectRemove(item,index){
      this.projectList.splice(index,1)
    }
  },

  mounted() {
    console.log(111);
    if (this.chioceProject != "") {
      this.data.project = this.chioceProject;
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  margin: -8px;
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  // min-width: 1500px;
  .left {
    position: relative;
    width: 250px;
    background: #141414;
    height: 100%;
    margin-right: 10px;
    border: 1 solid white;
    .project {
      // margin-top:30px;
      position: absolute;
      left: 20px;
      right: 20px;
      top: 20px;
      color: white;
      .el-form {
        width: 165px;
      }
      .icon {
        position: absolute;
        float: right;
        top: 6px;
        right: 0;
        font-size: 30px;
        cursor: pointer;
      }
    }
    .nav {
      //   background: #141414;

      position: absolute;
      width: 100%;
      top: 80px;
      bottom: 0px;
      left: 0px;
    }
  }

  .right {
    position: relative;
    background: #fff;
    flex: 1;
    height: 100%;
  }
  .right-top {
    position: relative;
    width: 100%;
    height: 60px;
    background: #141414;
    .openIcon {
      font-size: 30px;
      float: left;
      line-height: 60px;
      cursor: pointer;
      color: white;
    }

    .setting {
      position: relative;
      float: right;
      width: 130px;
      height: 100%;
      // background: red;
      text-align: left;
      cursor: pointer;
      color: white;
      z-index: 100;

      .setting-name-context {
        position: relative;
        // margin-top:17px;
        line-height: 60px;
        span {
          font-size: 20px;
        }
      }
      .setting-open {
        margin-top: -25px;
        margin-left: 20px;
        background: #141414;
        z-index: 100;
      }
      .setting-open-context {
        margin-left: 5px;
      }

      .setting-open .icon:hover {
        background: grey;
        padding: 10px;
      }
    }
  }
  .right-context {
    position: absolute;
    margin-top: 20px;
    width: 100%;
    top: 60px;
    background: red;
    bottom: 0px;
    left: 0px;
  }
}
.addProject {
  margin: 0 20px 20px 20px;
  // border: 1px solid red;
  .addProjectHeaderTitle {
    border-bottom: 1px solid #c9b2b2;
  }

  .addProjectHeader {
    margin-top: 20px;
    position: relative;
    height: 100%;
    width: 100%;
    margin-bottom: 10px;
    .addProjectHeaderName {
      line-height: 30px;
      position: absolute;
      left: 0px;
      height: 100%;
      display: block;
    }
    .addProjectHeaderInput {
      // position: absolute;
      left: 0px;
      line-height: 30px;
      margin-left: 100px;
      height: 100%;
      float: left;
      input {
        width: 400px;
        height: 20px;
        border-radius: 4px;
      }
    }

    .addProjectHeaderSubmitName,
    .addProjectHeaderSubmitAttr {
      position: absolute;
      margin-left: 57px;
      top: -1px;
    }
  }
  .addProjectBody {
    width: 100%;
    // border: 1px solid red;
    overflow-y: auto;
    margin-top: 20px;
  }
  .addProjectFoot {
    width: 100%;
    position: absolute;
    bottom: 20px;
    text-align: center;
  }
}
// .addProjectAttr {
// }
// .addProjectBodyEditClass {
//   text-align: left;
//   input {
//     width: 400px;
//   }
// }
.addProjectAttr{
  margin: 50px 0;
 
}

</style>
<style>
.el-form-item__label {
  color: white;
}

.active {
  display: none;
}
.addProjectAttr .el-form  .el-form-item .el-form-item__label{
    color: black !important;
  }
</style>