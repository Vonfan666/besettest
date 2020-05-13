<template>
  <div class="manageCase">
    <div class="manageCase-left">
      <div class="resize-bar"></div>
      <div class="resize-line"></div>
      <div class="manageCase-left-context">
        <!-- <div class="leftTitle">
                <span>接口分组</span>
                <span>全部接口</span>
        </div>-->
        <!-- 左侧顶部搜索 -->
        <div class="it-search">
          <el-form>
            <el-form-item>
              <el-input
                prefix-icon="el-icon-search"
                v-model="searchName"
                placeholder="搜索接口……"
                clearable
                @input="searchNameMethod()"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <!-- 新建一级分组 -->
        <div class="addFiles" @click="addFiles()">
          <span class="el-icon-plus"></span>
          <span>新建文件夹</span>
        </div>
        <!-- 文档内容 -->
        <div class="FilesContext">
          <div class="fileName" v-for="(item,index) in caseGroupList" :key="index">
            <div class="fileName-father" @click="isOpen($event,index)">
              <span :class="fileNameIcon[index]">{{item.name}}</span>
              <div class="addTextFather">
                <!-- <div class="addtext-code">
                    <span class="el-icon-plus it-icon-addtext"></span>
                    <span class="it-box"  style="display:none">删除</span>
                </div>-->
                <el-dropdown class="it-text-pop" @command="FatherAction">
                  <span class="el-dropdown-link">
                    <i class="el-icon-arrow-down"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command="['a',item.id,index]">添加</el-dropdown-item>
                    <el-dropdown-item :command="['b',item.id,index]">重命名</el-dropdown-item>
                    <!-- <el-dropdown-item :command="['c',item.id,index]">复制</el-dropdown-item> -->
                    <el-dropdown-item :command="['c',item.id,index]">删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
            <div
              class="fileNameChild"
              v-for="(item1,index1) in item.Clist"
              :key="index1"
              @click="changeColor($event)"
              v-show="fileNameChildStatus[index]"
            >
              <span class="file">{{item1.name}}</span>

              <div class="addTextChild">
                <!-- <div class="addtext-code">
                    <span class="el-icon-plus it-icon-addtext"></span>
                    <span class="it-box"  style="display:none">删除</span>
                </div>-->
                <el-dropdown class="it-text-pop" @command="ChildAction">
                  <span class="el-dropdown-link">
                    <i class="el-icon-arrow-down"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command="['a',item1.id,index1]">添加</el-dropdown-item>
                    <el-dropdown-item :command="['b',item1.id,index1]">重命名</el-dropdown-item>
                    <!-- <el-dropdown-item :command="['c',item.id,index]">复制</el-dropdown-item> -->
                    <el-dropdown-item :command="['c',item1.id,index1]">删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="manageCase-right">
      <div class="right-title">
        <div class="right-title-detail">
          <div class="title-detail">
            <span class="tt">基本信息</span>
          </div>
          <div class="title-detail-context">
            <el-form :model="datas" :rules="rules" ref="refFrom" label-width="100px">
              <div class="interfaName-1">
                <el-form-item label="选择接口" prop>
                  <el-select v-model="datas.isInterfaceId" filterable placeholder="请选择接口文档">
                    <el-option
                      v-for="(item,index) in filesName"
                      :key="index"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="interfaName-1">
                <el-form-item label="选择分组" prop="caseGroupId">
                  <el-select v-model="datas.caseGroupId" filterable placeholder="请选择用例分组">
                    <el-option
                      v-for="(item,index) in caseGroupList"
                      :key="index"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div></div>
              <div class="interfaName" @mouseenter   ="test3()" @mouseleave="test4()">
                <el-form-item label="用例名称" prop="interfaceName" >
                  <el-input placeholder="请输入接口名称" v-model="datas.interfaceName" @focus="test111($event)" @blur="test2($event)" v-if="inputStatus">
                  </el-input>
                  
                </el-form-item>
              </div>
              <div class="interfaName">
                <el-form-item label="用例状态" prop>
                  <el-select v-model="datas.interfaceIsOk">
                    <el-option
                      v-for="(item,index) in interfaceIsOkList"
                      :key="index"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="interfaName-2">
                <el-form-item label="请求地址" prop="urlAttr">
                  <div class="postAttr-1">
                    <el-select v-model="datas.urlHttp">
                      <el-option
                        v-for="(item,index) in urlHttp"
                        :key="index"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </div>
                  <div class="postAttr-4">
                    <el-select v-model="datas.urlPostType" prop="urlPostType">
                      <el-option
                        v-for="(item,index) in urlPostType"
                        :key="index"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </div>

                  <div class="postAttr-2">
                    <el-input placeholder="地址：192.168.0.0" v-model="datas.urlAttr"></el-input>
                  </div>
                  <div class="postAttr-3">
                    <el-input placeholder="端口：8080" v-model="datas.urlPort"></el-input>
                  </div>
                </el-form-item>
              </div>
              <div class="interfaName-3">
                <el-form-item label="用例描述" prop>
                  <el-input
                    :autosize="{minRows:4,maxRows:4}"
                    resize="none"
                    type="textarea"
                    placeholder="请输入用例描述 如:验证正确账号,错误密码情况下,接口返回情况"
                    v-model="datas.caseDetail"
                  ></el-input>
                </el-form-item>
              </div>
            </el-form>
          </div>
          <div class="title-detail-class">
            <div class="title-detail">
              <span class="tt">请求参数</span>
            </div>
            <div class="requests-detail">
              <div class="requests-title" contenteditable="true">
                  <span class="a">前置条件</span>
                  <span>请求头</span>
                  <span>请求参数</span>
                  <span>后置条件</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
       inputStatus:1,   //input输入替换成div输入-显示引用的环境变量的颜色
      searchName: "", //接口搜索名称
      manageCaseLefStatus: true, //左侧是否展示
      //分组列表,其包含子级用例,当该项目用例分组为空时，则默认展示所有接口分组name
      caseGroupList: [
        {
          id: 9,
          Clist: [
            {
              id: 118,
              name: "登录",
              createUserName: "冯凡",
              fid: 9
            },
   
          ],
          name: "登录注册",
          project_id: 80
        },
        {
          id: 15,
          Clist: [],
          name: "这是我新增的",
          project_id: 80
        },
        {
          id: 18,
          Clist: [],
          name: "个人中心",
          project_id: 80
        },
        {
          id: 19,
          Clist: [
            {
              id: 122,
              name: "登录",
              createUserName: "冯凡",
              fid: 19
            }
          ],
          name: "哈哈",
          project_id: 80
        },
      ],
      //文件名称箭头方向 el-icon-caret-bottom向下，默认向右
      fileNameIcon: [],
      fileNameChildStatus: [], //添加false数量默认为文件夹个数
      filesName: [
        //后台返回的接口内容,选择之后会自动填充部分数据
        { id: 1, name: "测试文档1" },
        { id: 2, name: "测试文档2" }
      ],
      urlHttp: [
        { id: 1, name: "HTTP" },
        { id: 2, name: "HTTPS" }
      ],

      //用例状态是否编写完成,已完成后台则会执行这个用例，未完成则不会执行
      interfaceIsOkList: [
        { id: 0, name: "未完成" },
        { id: 1, name: "已完成" }
      ],
      //请求类型,后台返回数据
      urlPostType: [
        { id: 1, name: "GET" },
        { id: 2, name: "POST" }
      ],
      //提交数据
      datas: {
       
        isInterfaceId: "", //关联的接口id
        interfaceName: "冯凡", //用例名称
        globarl:{
          token:"1121321"
        },
        interfaceIsOk: 0, //当前用例状态
        caseGroupId: "", //用例分组id
        urlHttp: 1, //请求协议
        urlAttr: "", //请求主机地址
        urlPort: "", //端口
        urlPostType: 1, //请求类型
        caseDetail: "" //用例描述
      },
      rules: {
        interfaceName: [
          { required: true, message: "请选择分组", trigger: "blur" }
        ],
        caseGroupId: [{ required: true, message: "请输入接口名称" }],
        urlHttp: [{ required: true, message: "请选择协议" }],
        urlAttr: [{ required: true, message: "请填写主机地址" }],
        urlPostType: [{ required: true, message: "请选择请求类型" }]
      }
    };
  },
  methods: {
    changeColor(self) {
      //添加修改接口文件的背景颜色
      console.log(self);
      var ele = self.currentTarget;
      console.log(ele.classList);
      var eles = document.querySelectorAll(".fileName .activeColor");
      ele.classList.length == 1
        ? (ele.classList.add("activeColor"),
          eles.forEach((item, index) => {
            item.classList.remove("activeColor");
          }))
        : ele.classList.remove("activeColor");
    },
    isOpen(self, index) {
      //判断接口文件箭头方向

      this.fileNameIcon[index] == "el-icon-caret-right"
        ? (this.fileNameIcon.splice(index, 1, "el-icon-caret-bottom"),
          this.fileNameChildStatus.splice(index, 1, true))
        : (this.fileNameIcon.splice(index, 1, "el-icon-caret-right"),
          this.fileNameChildStatus.splice(index, 1, false));
    },
    filesLen() {
      //判断文件个数,并根据个数导入fileNameChildStatus-从而控制每个文件下的文档展示或者显示
      this.caseGroupList.map(row => this.fileNameChildStatus.push(false));
      this.caseGroupList.map(row =>
        this.fileNameIcon.push("el-icon-caret-right")
      );
    },
    searchNameMethod() {},
    addFiles() {},
    ChildAction() {},
    FatherAction() {},
    test111(a){
      console.log(a)
    },
    test2(a){
      console.log(a)
    },
    test3(){
      console.log(111)
    },
    test4(){
      console.log("likai ")
    }
  },
  mounted() {
    this.filesLen();
    console.log(this.fileNameChildStatus, "11");
  }
};
</script>

<style lang="scss" scoped>
.manageCase {
  // overflow: hidden;
  height: 100%;
  background-color: white;
  min-width: 1000px;
}
.manageCase-left {
  height: 100%;
  background-color: #fff;
  position: relative;
  float: left;
  // overflow-y: scroll;
}
.manageCase-right {
  // height: 100%;
  // // width: 100%;
  // // padding: 16px;
  // background-color: #eee;
  // box-sizing: border-box;
  // overflow-y: scroll;
  // margin: 0 16px 0 0;
    height: 100%;
  padding: 5px;
  background-color: #eee;
  box-sizing: border-box;
  overflow-x: hidden;
}
.manageCase-left-context {
  // position: absolute;
  // top: 0;
  // right: 3px;
  // bottom: 0;
  // left: 0;
  // /* padding: 16px; */
  // overflow-x: hidden;
  position: absolute;
  top: 0;
  right: 1px;
  bottom: 0;
  left: 0;
  margin: 0 16px 0 0;
  overflow-x: hidden;
  background: #eee;
}
.resize-bar {
   width: 225px;
  height: inherit;
  resize: horizontal;
  cursor: ew-resize;
  opacity: 0;
  overflow: scroll;
  margin-left: 0px;
  max-width: 500px;
  min-width: 200px;
}
/* 拖拽线 */
.resize-line {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  border-right: 2px solid #eee;
  border-left: 1px solid #bbb;
  pointer-events: none;
}
.resize-bar:hover ~ .resize-line,
.resize-bar:active ~ .resize-line {
  border-left: 1px dashed skyblue;
}

.resize-bar::-webkit-scrollbar {
  width: 200px;
  height: inherit;
}

/* Firefox只有下面一小块区域可以拉伸 */
/* @supports (-moz-user-select: none) {
    .resize-bar:hover ~ .resize-line,
    .resize-bar:active ~ .resize-line {
        border-left: 1px solid #bbb;
    }
    .resize-bar:hover ~ .resize-line::after,
    .resize-bar:active ~ .resize-line::after {
        content: '';
        position: absolute;
        width: 16px; height: 16px;
        bottom: 0; right: -8px;
        background: url(./resize.svg);
        background-size: 100% 100%;
    }
} */
// .leftTitle{
//     /* position: fixed; */
//     width: 100%;
//     // background-color: red;
//     display: flex;
//     justify-content: space-around;
//     span{
//         padding: 15px 16px;
//         cursor: pointer;
//     }
//     span:hover{
//         background-color: #bbb;;
//     }
// }
.manageCase-left-context {
  // overflow-y: hidden;
  .it-search {
    margin: 8px 8px 0 8px;
  }
  .addFiles {
    position: absolute;
    right: 10px;
    color: #1e87f0;
    margin-top: -10px;
  }
  .FilesContext {
    font-size: 13px;
    margin: 0 8px;
    margin-top: 40px;
    // height: 3000px;
    //   background-color: red;
    .fileName {
      text-align: left;

      .fileName-father {
        padding: 7px 0 7px 0;
        cursor: pointer;
        .addTextFather {
          display: inline-block;
          float: right;
        }
      }
      .fileNameChild {
        padding: 7px 0 7px 0;
        cursor: pointer;
        .file {
          margin-left: 30px;
        }
        .addTextChild {
          display: inline-block;
          float: right;
        }
      }
    }
  }
  //   #2c3e50
  .fileName-father:hover {
    background-color: #bbb;
  }

  .fileNameChild:hover {
    background-color: #bbb;
  }
  .activeColor {
    background-color: grey;
  }
}
.manageCase-right {
  padding-left: 10px;
  .right-title {
    height: 100%;

    .title-detail {
      padding-bottom: 15px;
      border-bottom: 1px solid #c9b2b2;
      text-align: left;
      .tt {
        padding: 0 10px;
        padding-bottom: 16px;
        border-bottom: 1px solid #1e87f0;
      }
    }
    .title-detail-context {
      width: 100%;
      margin: 10px 0;
      text-align: left;
      height: 280px;
      // background-color: silver;
      // display: flex;

      .interfaName,
      .interfaName-1 {
        display: inline-block;
        width: 300px;
        height: 40px;
        margin-top: 10px;
      }
      // .title-detail-class {
      //   display: inline-block;
      //   background-color: royalblue;
      //   width: 300px;
      //   height: 40px;
      // }
      .interfaName-2 {
        margin-top: 10px;
      }
      .interfaName-3 {
        width: 600px;
        height: 40px;
      }
    }
  }

  .interfaName-2 {
    width: 1000px;
    display: flex;
    .postAttr-1,
    .postAttr-2,
    .postAttr-3,
    .postAttr-4 {
      display: inline-block;
    }
    .postAttr-1,
    .postAttr-4 {
      width: 12%;
    }
    .postAttr-2 {
      width: 30%;
    }
    .postAttr-3 {
      width: 15%;
    }
  }
  .title-detail-class {
    margin-top: 20px;

    .requests-detail {
      width: 100%;
      height: 500px;
      // background-color: silver;
      margin: 10px 0;
      .requests-title{
        text-align: left;
      }
      .a{
        color: red;
      }
    }
  }
}
</style>

<style>
.interfaName .el-input__inner,
.interfaName-1 .el-input__inner,
.interfaName-2 .el-input__inner {
  height: 30px !important;
}
/* .right-title-detail .el-form-item__content {
  line-height: 30px;
} */
.right-title-detail .el-form-item__label {
  color: black;
}
.right-title-detail  .el-form-item__error {
  padding-top: 0px !important;
}
</style>