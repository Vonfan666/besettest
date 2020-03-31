 <template>
  <div class="home">
    <div class="left" v-if="leftStatus">
      <div class="project">
        <el-form :model="data" :rules="rules" ref="projectref">
          <el-form-item prop="project" label="项目" label-width="40px">
            <el-select v-model="data.project" @change="changeProject()">
              <el-option
                ref="eloption"
                v-for="(item,index) in  model"
                :key="index"
                :value="item.id"
                :label="item.name"
              ></el-option>
              <!--:label 是展示在输入框的值  -->
            </el-select>
          </el-form-item>
        </el-form>
        <span class="icon el-icon-circle-plus-outline"></span>
      </div>

      <div class="nav">
        <div class="nav-context" >
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
  </div>
</template>

<script>
import Nav from "./Nav.vue";
export default {
  components: {
    "nav-list": Nav
  },
  data() {
    return {
      settingStatus: false,
      leftStatus: true,
      projectid: null,
      chioceProject: "测试项目1", //后台返回用户之前选择的项目-然后前端直接展示用户上次选择的项目
      data: {
        project: "" //用户选择的项目，
      },
      model: [
        //后台返回的项目列表
        { id: 1, name: "测试项目1" },
        { id: 2, name: "测试项目2" },
        { id: 3, name: "测试项目3" },
        { id: 4, name: "测试项目4" },
        { id: 5, name: "测试项目5" },
        { id: 6, name: "测试项目6" },
        { id: 1, name: "测试项目1" },
        { id: 2, name: "测试项目2" },
        { id: 3, name: "测试项目3" },
        { id: 4, name: "测试项目4" },
        { id: 5, name: "测试项目5" },
        { id: 6, name: "测试项目6" },
        { id: 1, name: "测试项目1" },
        { id: 2, name: "测试项目2" },
        { id: 3, name: "测试项目3" },
        { id: 4, name: "测试项目4" },
        { id: 5, name: "测试项目5" },
        { id: 6, name: "测试项目6测" },
        { id: 10086, name: "查看更多……" }
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
          list: [{ id: "61", name: "角色管理" }, { id: "62", name: "账号管理" }]
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
    }
  },
  mounted() {
    console.log(111);
    if (this.chioceProject != "") {
      this.data.project = this.chioceProject;
    }

    
  },


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
        z-index: 100
        
      }
      .setting-open-context{
        margin-left: 5px;
      }

      .setting-open .icon:hover {
        background: grey;
        padding: 10px;
      }
    }
  }
.right-context{
  position: absolute;
  margin-top: 20px;
  width: 100%;
  top: 60px;
  background: red;
  bottom: 0px;
  left: 0px;
}
}
</style>
<style>
.el-form-item__label {
  color: white;
}

.active {
  display: none;
}
</style>