<template>
  <div class="infater">
    <div class="infater-left">
      <div class="resize-bar"></div>
      <div class="resize-line"></div>
      <div class="resize-save">
        <div class="infater-context" style="text-align:left">
          <div class="it-left-top">
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
            <div class="addFiles" @click="addFiles()">
              <span class="el-icon-plus"></span>
              <span>新建文件夹</span>
            </div>
          </div>
          <!-- 搜索 -->
          <div class="searchPopOver" v-if="searchStatus">
            <div class="search-context">
              <p
                v-for="(item,index) in code"
                :key="index"
                @click="searchResult(item.fatherid,item.id)"
              >{{item.name}}</p>
            </div>
          </div>
          <div class="it-left-context" v-if="contextStatus">
            <dl v-for="(item,index) in list" :key="index">
              <dt class="it-father">
                <div class="it-direction" @click="ItDirection($event,index)">
                  <span :class="iconOpen[index]"></span>
                  <span class="name" :id="item.id">{{item.name}}</span>
                </div>
                <!-- 父级目录的操作项 -->
                <div class="addText">
                  <!-- <div class="addtext-code">
                    <span class="el-icon-plus it-icon-addtext"></span>
                    <span class="it-box"  style="display:none">删除</span>
                  </div>-->
                  <el-dropdown class="it-text-pop" @command="FatherSet">
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
              </dt>
              <div v-if="directions[index]">
                <dd
                  v-for="(item1,index1) in item.Clist"
                  :key="index1"
                  class="it-con-text"
                  :id="'s'+item1.id"
                  @click="changeBack($event,item.id,item1.id)"
                >
                <!-- 这里点击右边文档需要重新请求 -->
                  <!-- <div class="ddtext"> -->
                  <div class="ddName-father">
                    <span class="ddName">{{item1.name}}</span>
                  </div>

                  <div class="dd2-father">
                    <!-- <span>test</span> -->
                    <div class="dd2">
                      <el-dropdown class="it-text-pop" @command="reName">
                        <span class="el-dropdown-link">
                          <i class="el-icon-arrow-down"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item
                            :command="{type:'a',lid:item.id,cid:item1.id,index:index,index1:index1}"
                          >重命名</el-dropdown-item>
                          <el-dropdown-item
                            :command="{type:'b',lid:item.id,cid:item1.id,index:index,index1:index1}"
                          >复制</el-dropdown-item>
                          <el-dropdown-item
                            :command="{type:'c',lid:item.id,cid:item1.id,index:index,index1:index1}"
                          >删除</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </div>
                  <!-- </div> -->
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>

    <div class="other">
      <el-dialog title="复制接口" :visible.sync="dialogFormVisible">
        <el-form :model="updateFiels" :rules="rules" ref="copeEle">
          <el-form-item label="选择文件夹" prop="updateFiels" label-width="95px">
            <el-select v-model="updateFiels.updateFiels" placeholder="请选择复制到的文件">
              <el-option
                v-for="(item,index) in  list"
                :key="index"
                :label="item.name"
                :value="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="copeFiels(updateFiels.updateFiels)">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="infater-right">
      <div class="InCon">
        <ir-con ref="irCon"></ir-con>
      </div>
    </div>
    <!-- 新建文件 -->
    <message-box v-if="mbFielsStutas" v-slot:addFiels :styleCode="styleCode">
      <div class="mbAddFiels">
        <h3>新建文件夹</h3>
        <el-form :model="updateFiels" :rules="rules" ref="refAddfiles">
          <el-form-item label="文件夹名称" prop="fielsName" label-width="100px">
            <el-input v-model="updateFiels.fielsName" clearable></el-input>
          </el-form-item>
        </el-form>
        <div class="bt-botton">
          <el-button type="primary" @click="mbFielsStutas=!mbFielsStutas">取消</el-button>
          <el-button type="primary" class="bottom" @click="addFielsSubmit()">确认</el-button>
        </div>
      </div>
    </message-box>
  </div>
</template>

<script>
import InfaterContext from "./IntfaterContext.vue";
import storage from '../../libs/storage';
export default {
  components: {
    "ir-con": InfaterContext,
    "message-box": () => import("../public/MessageBox.vue")
  },
  data() {
    return {
      styleCode: "height:300px;width:500px", //弹出框大小
      mbFielsStutas: false, //新增文件蒙层状态
      copeCode: {},
      searchStatus: false,
      contextStatus: true, //左侧文件夹是否展示
      iconOpen: [], //箭头的方向
      directions: [], //判断列表是否展开
      directionFalse: false,
      iconStatus: false,
      searchName: "", //输入框输入内容
      updateFiels: {
        updateFiels: "", //修改文件
        fielsName: "" //新增文件名称
      },
      // fatherFile:{
      //   addFatherFile:"",      //新增文件夹的名称
      //   updateFatherFile:"",
      // },

      dialogTableVisible: false,
      dialogFormVisible: false,
      rules: {
        updateFiels: [
          { required: true, message: "请选择复制的文件夹", trigger: "click" }
        ],
        fielsName: [
          { required: true, message: "请输入文件名称", trigger: "blur" }
        ]
      },
      list: [
        {
          id: 1,
          name: "首页",
          Clist: [
            {
              id: 11,
              name:
                "获取商家列表获取商家列表获取商家列表获取商家列表获取商家列表获取商家列表"
            },
            { id: 12, name: "获取商家信息" },
            { id: 13, name: "获取商家评论" }
          ]
        },
        {
          id: 2,
          name:
            "获取商家列表获取商家列表获取商家列表获取商家列表获取商家列表获取商家列表",
          Clist: [
            {
              id: 21,
              name:
                "获取商家列表获取商家列表获取商家列表获取商家列表获取商家列表获取商家列表"
            },
            { id: 22, name: "获取用户所在城市" },
            { id: 23, name: "获取用户收货地址" },
            { id: 24, name: "优惠券" }
          ]
        },
        {
          id: 3,
          name: "个人中心",
          Clist: []
        }
      ],
      //模拟返回数据
      code: [
        {
          fatherid: 2,
          id: 21,
          name:
            "获取用户头像获取用户头像获取用户头像获取用户头像获取用户头像获取用户头像获取用户头像"
        },
        { fatherid: 2, id: 22, name: "获取用户所在城市" },
        { fatherid: 2, id: 23, name: "获取用户收货地址" },
        { fatherid: 2, id: 24, name: "优惠券" }
      ]
    };
  },
  methods: {
    open2(msg) {
      this.$message({
        showClose: true,
        message: msg,
        type: "success",
        duration: "1000"
      });
    },
    FatherSet(command) {
      if (command[0] == "a") {
        this.openAdd(command, "添加文件", "文件名称", "添加成功", "取消添加");
        console.log(this.directions);
      }
      if (command[0] == "b") {
        this.openAdd(
          command,
          "修改文件名称",
          "文件名称",
          "修改成功",
          "取消修改"
        );
      }
      if (command[0] == "c") {
        this.list.splice(command[2], 1);
        this.open2("删除成功");
      }
    },
    addFielsSubmit() {
      this.$refs.refAddfiles.validate(valid => {
        if (valid) {
          //这里请求后台获取一个文件夹id
          let id = 4; //假设后台返回id=4
          this.$set(this.list, this.list.length, {
            id: id,
            name: this.updateFiels.fielsName,
            Clist: []
          });
          //新建文件时需要---标记该文件是否打开 箭头 iconOpen  以及 directions
          this.mbFielsStutas = !this.mbFielsStutas;
          this.$set(this.iconOpen, this.iconOpen.length, "el-icon-caret-right");
          this.$set(this.directions, this.directions.length, false);
        } else {
          return false;
        }
      });
    },
    addFiles() {
      this.mbFielsStutas = !this.mbFielsStutas;
    },
    addContext(id, index) {
      //文件夹下添加接口
      var count = this.list[index].Clist.length;
      console.log(count, typeof count);
      id = 1; //后台返回id
      this.$set(this.list[index].Clist, count, {
        id: id,
        name: "z这是添加的儿子" + index
      });
    },
    ItDirection(self, index) {
      // el-icon-caret-right 关闭      el-icon-caret-bottom  打开
      if (this.iconOpen[index] == "el-icon-caret-right") {
        // this.iconOpen="el-icon-caret-bottom"
        this.$set(this.iconOpen, index, "el-icon-caret-bottom");
        this.$set(this.directions, index, true);
      } else {
        this.$set(this.iconOpen, index, "el-icon-caret-right");
        this.$set(this.directions, index, false);
      }

      console.log(this.directions);
      console.log(this.iconOpen);
    },
    test() {
      console.log(this.searchName);
    },
    aa() {
      this.list.forEach((item, index) => {
        this.directions[index] = false;
        this.iconOpen[index] = "el-icon-caret-right";
      });
    },
    searchNameMethod() {
      console.log(this.code);
      if (this.code.length > 1 && this.searchName != "") {
        this.contextStatus = false;
        this.searchStatus = true;
      } else {
        this.contextStatus = true;
        this.searchStatus = false;
      }
    },
    searchResult(fid, cid) {
      this.contextStatus = true;
      this.searchStatus = false;
      this.list.forEach((item, index) => {
        if (fid == item.id) {
          //遍历列表--找到与点击相同的id--就展开-并且关闭其他的
          this.$set(this.iconOpen, index, "el-icon-caret-bottom");
          this.$set(this.directions, index, true);
          item.Clist.forEach((item1, index1) => {
            //遍历子级列表--找到相同id的 加上背景颜色
            if (cid == item1.id) {
              // ele="#"+cid
              var ele = "s" + String(cid);

              setTimeout(function() {
                console.log(document.getElementById("s24"));
                document.getElementById(ele).classList.add("backColor");
              }, 10);
            }
          });
        } else {
          this.$set(this.iconOpen, index, "el-icon-caret-right");
          this.$set(this.directions, index, false);
        }
      });
    },
    //跳转--并传fileId给到下一个接口
    changeBack(envet,fatherId,childId) {
      // console.log(indexFather,indexChild)
      console.log(this.$route.query)
      if (document.querySelector(".backColor")) {
        document.querySelector(".backColor").classList.remove("backColor");
      }
      envet.currentTarget.classList.add("backColor");
      this.$router.push({name:"infaterTextFile",query:{projectId:storage.get("projectId"),fileId:childId}})

    },
    reName(command) {
      //修改文件名称
      //先请求接口--修改成功之后--在修改data
      console.log("请求接口修改名称");
      // this.list[lindex].Clist[cindex].name="11111"
      // console.log(command);
      if (command.type == "a") {
        //在if里面先提交后台修改名称成功之后--然后在执行--否则直接失败
        this.open3(
          command,
          "请输入您要修改的名称",
          "修改接口名称",
          "修改成功",
          "取消修改"
        );
      }
      if (command.type == "b") {
        //先提交后台修改名称成功之后--然后在执行--否则直接失败
        this.dialogFormVisible = true;
        console.log("zhixing-----");
        // console.log(this.updateFiels)
        this.copeCode = command;
      }
      if (command.type == "c") {
        //先提交后台删除成功之后--然后在执行--否则直接失败
        // this.$set(,command.index1)
        this.list[command.index].Clist.splice(command.index1, 1);
      }
    },
    copeFiels(index) {
      //把需要复制到的文件索引传过来
      this.$refs.copeEle.validate(valid => {
        if (valid) {
          this.dialogFormVisible = false;
          console.log(index);
          console.log(this.copeCode, "接口请求到后台--返回成功就继续下面操作");
          var copeAfter = this.list[this.copeCode.index].Clist[
            this.copeCode.index1
          ]; //找到复制的接口
          console.log(copeAfter, typeof index);
          console.log(this.list[index], "zheshi ");
          this.$set(
            this.list[index].Clist,
            this.list[index].Clist.length,
            copeAfter
          );
        } else {
          return false;
        }
      });
    },
    open3(command, title1, title2, msgSucsess, msgFail) {
      this.$prompt(title1, title2, {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          console.log(value);
          this.$message({
            type: "success",
            message: msgSucsess
          });
          this.list[command.index].Clist[command.index1].name = value;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: msgFail
          });
        });
    },
    //  添加文件夹调用该方法
    openAdd(command, title1, title2, msgSucsess, msgFail) {
      this.$prompt(title1, title2, {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: msgSucsess
          });
          if (command[0] == "a") {
            console.log(command);
            var count = this.list[command[2]].Clist.length;
            console.log(this.list[command[2]]);
            this.$set(this.directions, command[2], true);
            this.$set(this.iconOpen, command[2], "el-icon-caret-bottom");

            this.$set(this.list[command[2]].Clist, count, {
              id: count,
              name: value
            });
          }
          if (command[0] == "b") {
            this.list[command[2]].name = value;
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: msgFail
          });
        });
    }
  },
  created(){
    this.aa()
  },

  watch: {
    $route: {
      handler: function(val, oldVal) {
        console.log(val.query.projectId, oldVal.query.projectId);
        if (val.query.projectId != oldVal.query.projectId) {
          console.log("假装请求接口",val,typeof val)
          if(val.query.projectId==1){
            console.log("更改list")
            this.list.splice(0,this.list.length, {
          id: 1,
          name: "首页",
          Clist: [
            {
              id: 11,
              name:
                "1111"
            },
            { id: 12, name: "11" },
            { id: 13, name: "获取商111家评论" }
          ]
        },
        {
          id: 2,
          name:
            "获3家列表获取商家列表获取商家列表获取商家列表",
          Clist: [
            {
              id: 21,
              name:
                "获取商家列表获取商家列表获取商家列表获取商家列表获取商家列表获取商家列表"
            },
            { id: 22, name: "获取用户所在城市" },
            { id: 23, name: "获取用户收货地址" },
            { id: 24, name: "优惠券" }
          ]
        },
        {
          id: 3,
          name: "个人中心",
          Clist: []
        })
          }
        }
      },
      // 深度观察监听
      deep: true
    }
  }
};
</script>

<style lang="scss"  scoped>
//   .infater-left{
//     position: relative;
//     width: 100%;
//     height: 100%;
//     background: white;
//   }
.mbAddFiels {
  margin: 10px;
  .bt-botton {
    margin-top: 130px;
    margin-right: 20px;
    display: flex;
    justify-content: center;
  }
  .bt-botton .bottom {
    margin-left: 20px;
  }
}
.backColor {
  background: grey;
}
.infater {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;
  background: black;
  margin: auto 0;
}
.infater-left {
  height: 100%;
  background-color: #fff;
  position: relative;
  float: left;
}
.infater-right {
  height: 100%;
  padding: 5px;
  background-color: #eee;
  box-sizing: border-box;
  overflow-y: scroll;
}
.resize-save {
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
  width: 400px;
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

// .it-left-context{
//   margin-top: 10px;
// }
.it-left-top {
  position: relative;
  width: 100%;
  height: 40px;
}
.it-search {
  // float: left;
  // width: 200px;
  margin: 10px;
}

.searchPopOver {
  position: relative;
  width: 100%;
  // margin: 10px;
  float: left;
}
.search-context {
  position: absolute;
  top: 5px;
  left: 10px;
  right: 10px;
  background: #eee;
  border: 1px solid #eee;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
}
.addFiles {
  position: absolute;
  right: 10px;
  // float: right;
  color: #1e87f0;
  cursor: pointer;
  padding: 5px 0;
  margin-top: -10px;
}

.it-left-context {
  position: relative;
  margin-top: 60px;
  font-size: 13px;
}

.it-father {
  position: relative;
  width: 100%;
  padding: 7px 0;
}

.it-direction {
  position: relative;
  width: 90%;
  height: 100%;
  display: inline-block;
  cursor: pointer;
}
.addText {
  // display: inline-block;
  width: 10%;
  height: 100%;
  text-align: center;
  cursor: pointer;
  line-height: 21px;
  float: right;
}

.it-con-text {
  position: relative;
  margin-top: -5px;
  margin-bottom: -5px;
}

.ddName-father {
  position: relative;
  width: 90%;
  display: inline-block;
  padding: 9px 0;
  cursor: pointer;
  .ddName {
    position: relative;
    width: 50%;
    // padding-left: 20px;;
  }
}

.dd2-father {
  display: inline-block;
  position: absolute;
  width: 10%;
  height: 100%;
  .dd2 {
    height: 100%;
    display: flex;
    justify-content: space-between;
    .it-text-pop {
      margin: auto;
    }
  }
}

dl {
  margin: -2px 0;
}
.it-con-text:hover {
  background: grey;
}

// .dd2-father:hover {
//   background: grey;
// }

.it-father:hover {
  background: grey;
}
// .ddName{
//   width: 80%
// }
// .dd2 {

//   float: right;
//   margin-right: 3px;

// }
</style>
<style >
.other .el-dialog__header {
  position: relative;
  text-align: left;
}
.other .el-dialog__title {
  position: absolute;
  left: 10px;
}
/* .other .el-input--suffix {
} */
.other .el-form-item__label {
  color: black;
  margin-left: 10px;
}
.other .el-form-item {
  margin-top: 20px;
}
.other .el-form-item__content {
  margin: 0;
  position: absolute;
  left: 110px;
}
.other .el-dialog__body {
  padding: 0;
  padding-top: 20px;
}
.mbAddFiels .el-form-item__label {
  color: #606266;
}

.addText:hover it-box {
  display: block;
}
</style>