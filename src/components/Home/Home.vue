 <template>
  <div class="home">
    <div class="left" v-if="leftStatus">
      <div class="project">
        <el-form :model="data" :rules="rules" ref="projectref">
          <el-form-item prop="project" label="项目" label-width="40px">
            <el-select
              v-model="data.project"
              @change="changeProject(data.project,data.projectId)"
              
              placeholder="请选择项目"
            >
              <el-option
                class="projectChoice"
                ref="eloption"
                v-for="(item,index) in  projectLists"
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
                  <span class="icon iconfont">{{nameCode}}</span>
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
            <el-table-column prop="id" label="Id" width="70"></el-table-column>
            <el-table-column prop="name" label="项目名称" width="120"></el-table-column>
            <el-table-column prop="dev_attr" label="开发地址" width="150"></el-table-column>
            <el-table-column prop="test_attr" label="测试地址" width="150"></el-table-column>
            <el-table-column prop="product_attr" label="生产地址" width="150"></el-table-column>
            <el-table-column prop="create_time" label="创建时间" width="160"></el-table-column>
            <el-table-column prop="user.userName" label="创建人" width="100"></el-table-column>

            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  @click="addProjectEdit(scope.row,scope.$index);projectProductStatus=3"
                  type="text"
                  size="small"
                >编辑</el-button>
                <el-button
                  type="text"
                  size="small"
                  @click="addProjectRemove(scope.row,scope.$index)"
                >删除</el-button>
                <el-button type="text" size="small">添加成员</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="block" style="margin-top:10px" v-if="projectProductStatus==1 && pageStatus==true">
          <!-- <span class="demonstration">完整功能</span> -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 20, 50]"
            :page-size="page_size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
        <div class="addProjectBodyEdit" v-if="projectProductStatus==3 || projectProductStatus==2">
          <!-- <div class="addProjectBodyEditClass">
            <span class="addProjectBodyEditName">项目名称：</span>
            <span class="addProjectBodyEditInput">
              <input />
            </span>
          </div>-->
          <div class="addProjectAttr" style="corlor:#606266">
            <!-- <span class="addProjectAttrs">开发地址：</span>
            <span class="addProjectAttrInput">
              <input />
            </span>-->
            <el-form :model="addProjectObj" :rules="rules" ref="addProjectObj">
              <el-form-item label="项目名称" prop="name" label-width="80px">
                <el-input v-model="addProjectObj.name" clearable placeholder="请输入项目名称"></el-input>
              </el-form-item>
              <el-form-item label="开发地址" prop="dev_attr" label-width="80px">
                <el-input v-model="addProjectObj.dev_attr" clearable placeholder="请输入开发环境地址"></el-input>
              </el-form-item>
              <el-form-item label="测试地址" prop="product_attr" label-width="80px">
                <el-input v-model="addProjectObj.test_attr" clearable placeholder="请输入测试环境地址"></el-input>
              </el-form-item>
              <el-form-item label="生产地址" prop="infaterName" label-width="80px">
                <el-input v-model="addProjectObj.product_attr" clearable placeholder="请输入生产环境地址"></el-input>
              </el-form-item>
            </el-form>
            <!-- <el-form :model="addProjectObj" >
              
            </el-form>-->

            <!-- <span class="addProjectAttrs">测试地址：</span>
            <span class="addProjectAttrInput">
              <input />
            </span>-->

            <!-- <span class="addProjectAttrs">生产地址：</span>
            <span class="addProjectAttrInput">
              <input />
            </span>-->
          </div>
        </div>
        <div class="addProjectFoot">
          <el-button
            type="primary"
            size="small"
            @click="closeProject()"
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
            v-if=" projectProductStatus==3"
          >更新</el-button>
          <el-button
            type="primary"
            size="small"
            @click="addProjectAdd()"
            v-if="projectProductStatus==2 ||projectProductStatus==1"
          >添加</el-button>
        </div>
      </div>
    </add-project>
  </div>
</template>

<script>
import Nav from "./Nav.vue";
// import storage from "../../libs/storage.js";
import {
  projectAdd,
  projectList,
  projectRemove,
  projectEdit,
  projectLast,
  lastUseProject
} from "@/axios/api.js";
import { Message } from "element-ui";
import storage  from '@/libs/storage.js'
export default {
  components: {
    "nav-list": Nav,
    "add-project": () => import("../public/MessageBox")
  },
  data() {
    return {
      last_projectId:null,
      pageStatus:true,
      currentPage: null, //当前是第几页
      page: 1, //选择第几页
      total: null, //数据总条数
      page_size: 10, //每页数据多少个，默认10个
      nameCode: "",
      projectProductStatus: true,
      projectIndex: null,
      projectProductStatus: 1, // 1项目列表  2添加项目 3编辑项目 4添加成功
      addProjectStatus: 0, //弹窗是否展示
      settingStatus: false,
      leftStatus: true,
      projectid: null,
      data: {
        project: "", //用户选择的项目，
        projectId: ""
      },
      styleCode: "height: 840px;width: 1100px;",
      addProjectObj: {
        name: "",
        dev_attr: "",
        test_attr: "",
        product_attr: "",
        user: "",
        create_time: "",
        id: null,
        user: {
          id: null,
          userName: ""
        }
      },
      rules: {
        name: [{ required: true, message: "项目名称不能为空", trigger: "blur" }]
      },
      projectList: [
        //后台返回的项目列表
      ],
      projectLists:[],

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
    changeProject(a, b) {
      //左上角选择项目
      storage.set("projectId", a);
      lastUseProject({
        userId:storage.get("userId"),
        projectId:storage.get("projectId")
      }).then(res=>{
        if(res.status==200){
          this.last_projectId=a
          this.$router.push({ query: { projectId: storage.get("projectId") } });

        }
      }).catch(res=>{
        Message.error("服务异常")
      })
      
    },
    openIcon(self) {
      this.leftStatus = !this.leftStatus;
      if (this.leftStatus) {
        self.srcElement.innerHTML = "&#xe660;";
      } else {
        self.srcElement.innerHTML = "&#xe65e;";
      }
    },
    //获取项目列表
    addProject() {
      this.addProjectStatus = 1;
      projectList({
        page: this.page,
        page_size: this.page_size
      })
        .then(res => {
          if (res.status == 200) {
            this.total = res.total;
            this.projectList = [];
            res.results.forEach((item, index) => {
              this.projectList.push(item);
            });
          }
        })
        .catch(res => {
          Message.error("系统异常");
        });
    },
    // addProjectSubmit() {
    //   console.log(this.addProjectObj);
    //   //将数据传给后台--后台返回生成id之后再添加进去
    //   this.projectList.unshift(this.addProjectObj);
    //   //这里单独封装一个js弹窗成功或者失败的方法
    //   this.projectProductStatus = 1;
    //   this.addProjectObj = {};
    // },
    //新增项目
    addProjectAdd() {
      //projectProductStatus=2||3时展示添加按钮。。
      //从项目列表点击添加---只是projectProductStatus=2
      if (this.projectProductStatus == 1) {
        this.projectProductStatus = 2;
      } else {
        if (this.projectProductStatus == 2) {
          this.$refs.addProjectObj.validate(valid => {
            if (valid) {
              projectAdd({
                name: this.addProjectObj.name,
                dev_attr: this.addProjectObj.dev_attr,
                test_attr: this.addProjectObj.test_attr,
                product_attr: this.addProjectObj.product_attr,
                user: storage.get("userId"),
                page: this.page,
                page_size: this.page_size
              })
                .then(res => {
                  if (res.status == 200) {
                    
                    this.total = res.total;
                    this.projectList.unshift(res.results);
                    if(this.projectList.length<=this.page_size){
                      
                    }else{
                      this.projectList.pop(res.results);
                    }
                    
                    
                    Message.success(res.msg);
                  }
                })
                .catch(res => {
                  Message.error("数据异常");
                });
              //将数据传给后台--后台返回生成id之后再添加进去
              //
              //这里单独封装一个js弹窗成功或者失败的方法
              this.projectProductStatus = 1;
              this.addProjectObj = {};
            }
          });
        }
      }
    },
    //编辑更新接口
    addProjectOk() {
      //编辑 更新
      projectEdit(this.addProjectObj)
        .then(res => {
          if (res.status == 200) {
            this.projectList[this.projectIndex] = this.addProjectObj;
            this.projectLists[this.projectIndex].name=this.addProjectObj.name
            // this.projectLists.splice(this.projectIndex,1,this.addProjectObj)
            this.projectProductStatus = 1;
            if (this.data.projectId == this.projectList[this.projectIndex].id) {
              this.data.project = this.addProjectObj.name;
            }
            this.addProjectObj = {};
            Message.success(res.msg);
          }
        })
        .catch(res => {
          Message.error("系统异常");
        });
      //如果编辑的等于--首页用户选择的项目则需要更新它的名字

      if (this.projectProductStatus == 3) {
      }
    },
    addProjectEdit(item, index) {
      var obj = JSON.parse(JSON.stringify(item));
      this.addProjectObj = obj;

      this.projectIndex = index;
    },
    //删除项目
    addProjectRemove(item, index) {
      projectRemove({
        id: item.id,
        page: this.page,
        page_size: this.page_size
      })
        .then(res => {
          if (res.status == 200) {
            this.projectLists.forEach((item,index)=>{
              if(this.last_projectId==item.id){  
                this.last_projectId=null
                this.projectLists.splice(index,1)   //删除历史访问ID
                
              }
            })
            this.total = res.total;
            if (parseInt(res.page_size) <parseInt(this.currentPage)) {
              this.currentPage = res.page_size;
              projectList({
                page: this.currentPage,
                page_size: this.page_size
              })
                .then(res => {
                  if (res.status == 200) {
                    this.total = res.total;
                    this.projectList = [];
                    res.results.forEach((item, index) => {
                      this.projectList.push(item);
                    });
                  }
                })
                .catch(res => {
                  Message.error("系统异常");
                });
            }
            this.projectList.splice(index, 1);
            Message.success(res.msg);
          }
        })
        .catch(res => {
          Message.error("系统异常");
        });
    },
    closeProject() {
      this.addProjectStatus=false;
      this.projectProductStatus=1;
      this.addProjectObj={}
       projectLast({ userId: storage.get("userId") })
      .then(res => {
        if (res.status == 200) {
          // this.last_projectId=t
          projectList()
            .then(res => {
              //加载该组件则请求项目列表接口
              if (res.status == 200) {
                res.results.forEach((item, index) => {
                  this.projectLists.splice(index,1,item)
                  if (this.last_projectId == item.id) {
                    this.data.project = item.name;
                    this.data.projectId = item.id;
                    storage.set("projectId", item.id);
                    this.$router.push({
                      query: { projectId: storage.get("projectId")}
                    });
                  }
                });
                if (this.last_projectId == 0) {
                  this.data.project = this.projectLists[0].name;
                  this.data.projectId = this.projectLists[0].id;
                  storage.set("projectId", this.projectLists[0].id);
                  this.$router.push({
                    query: { projectId: storage.get("projectId") }
                  });
                }
              }
            })
            .catch(res => {
              Message.error("系统异常");
            });
        }
      

    })
    },
    handleSizeChange(val) {

      this.page_size = val;
      this.projectList.splice(0, this.projectList.length);
      projectList({
        page: this.page,
        page_size: this.page_size
      }).then(res => {
        if (res.status == 200) {
          // this.currentPage=val
          // this.page_size=val
          this.projectList.splice(0, this.projectList.length);
          res.results.forEach((item, index) => {
            this.projectList.push(item);
          });
        }
      });
    },
    handleCurrentChange(val) {
      
      this.page = val;
      projectList({
        page: val,
        page_size: this.page_size
      }).then(res => {
        if (res.status == 200) {
          this.currentPage = val;
          this.projectList.splice(0, this.projectList.length);
          res.results.forEach((item, index) => {
            this.projectList.push(item);
          });
        }
      });
    },
    cao(){
    },
  },

  mounted() {
    // if (this.chioceProject != "") {
    //   this.data.project = this.chioceProject;
    // }

    this.nameCode = storage.get("name"); //获取当前用户姓名

    projectLast({ userId: storage.get("userId") })
      .then(res => {
        if (res.status == 200) {
          this.last_projectId = res.results.user_last_project;

          projectList({

          })
            .then(res => {
              //加载该组件则请求项目列表接口
              if (res.status == 200) {

                res.results.forEach((item, index) => {
                  this.projectLists.push(item);
                  
                  if (this.last_projectId == item.id) {
                    this.data.project = item.name;
                    this.data.projectId = item.id;
                    storage.set("projectId", item.id);
                    this.$router.push({
                      query: { projectId: storage.get("projectId") }
                    });
                    // var a=document.querySelector(".projectChioce ").eq(index).innerHTML()
                    // console.log(a)
                  }
                });
                if (this.last_projectId == 0) {
                  this.data.project = this.projectLists[0].name;
                  this.data.projectId = this.projectLists[0].id;
                  storage.set("projectId", this.projectLists[0].id);
                  this.$router.push({
                    query: { projectId: storage.get("projectId") }
                  });
                }
              }
            })
            .catch(res => {
              Message.error("系统异常");
            });
        }
      })
      .catch(res => {
        Message.error("系统异常");
      });

    //默认记录用户上次访问的id后台返回-然后第一次直接projectId=用户最后一次访问的id
  },
  watch:{
    total(newValue,oldValue){
      if(newValue<=this.page_size){
        this.pageStatus=false
      }else{
        this.pageStatus=true
      }
      
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
.addProjectAttr {
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
.addProjectAttr .el-form .el-form-item .el-form-item__label {
  color: black !important;
}
.addProjectAttr .el-form .el-form-item .el-form-item__content {
  margin-left: 80px;
}
</style>