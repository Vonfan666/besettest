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
          <div class="fileName" v-for="(item,index) in FilesList" :key="index">
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
    <div class="manageCase-right">右侧的内容，右侧的内容，右侧的内容，右侧的内容</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchName:"",    //接口搜索名称
      manageCaseLefStatus: true, //左侧是否展示
      //文件列表,其包含子级接口文档
      FilesList: [
        {
          id: 9,
          Clist: [
            {
              id: 118,
              name: "登录",
              createUserName: "冯凡",
              fid: 9
            },
            {
              id: 119,
              name: "test",
              createUserName: "冯凡",
              fid: 9
            },
            {
              id: 120,
              name: "test1",
              createUserName: "冯凡",
              fid: 9
            },
            {
              id: 121,
              name: "更新名称",
              createUserName: "冯凡",
              fid: 9
            },
            {
              id: 123,
              name: "11",
              createUserName: "冯凡",
              fid: 9
            },
            {
              id: 124,
              name: "test3",
              createUserName: "冯凡",
              fid: 9
            }
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
        }
      ],
      //文件名称箭头方向 el-icon-caret-bottom向下，默认向右
      fileNameIcon: [],
      fileNameChildStatus:[],//添加false数量默认为文件夹个数
    };
  },
  methods: {
    changeColor(self) {
      //添加修改接口文件的背景颜色
      console.log(self);
      var ele =self.currentTarget
      console.log(ele.classList)
      var eles = document.querySelectorAll(".fileName .activeColor");
      ele.classList.length==1
        ? (
          ele.classList.add("activeColor"),
          eles.forEach((item,index)=>{
              item.classList.remove("activeColor")
          })
          )

        : ele.classList.remove("activeColor");
    },
    isOpen(self,index){
    //判断接口文件箭头方向

    this.fileNameIcon[index]=="el-icon-caret-right"
    ? (this.fileNameIcon.splice(index,1,"el-icon-caret-bottom"),
        this.fileNameChildStatus.splice(index,1,true)
        )
    : (this.fileNameIcon.splice(index,1,"el-icon-caret-right"),this.fileNameChildStatus.splice(index,1,false))
    },
    filesLen(){
        //判断文件个数,并根据个数导入fileNameChildStatus-从而控制每个文件下的文档展示或者显示
        this.FilesList.map(row=>this.fileNameChildStatus.push(false))
        this.FilesList.map(row=>this.fileNameIcon.push("el-icon-caret-right"))
    },
    searchNameMethod(){

    },
    addFiles(){

    },
    ChildAction(){

    },
    FatherAction(){

    },

  },
  mounted(){
      this.filesLen()
      console.log(this.fileNameChildStatus,"11")
  }
    
};
</script>

<style lang="scss" scoped>
.manageCase {
  overflow: hidden;
  height: 100%;
  background-color: white;
}
.manageCase-left {
  height: 100%;
  background-color: #eee;
  position: relative;
  float: left;
  margin-right: 10px;
}
.manageCase-right {
  height: 100%;
  padding: 16px;
  background-color: #eee;
  box-sizing: border-box;
  overflow: hidden;
  margin: 0 16px 0 0;
}
.manageCase-left-context {
  position: absolute;
  top: 0;
  right: 3px;
  bottom: 0;
  left: 0;
  /* padding: 16px; */
  overflow-x: hidden;
}
.resize-bar {
  width: 200px;
  height: inherit;
  resize: horizontal;
  cursor: ew-resize;
  cursor: col-resize;
  opacity: 0;
  overflow: scroll;
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
</style>