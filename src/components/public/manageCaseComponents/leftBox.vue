<template>
  <!-- <div class="left-box" style="margin:10px">
    <div class="title" style="text-align:left">
      <h3>调试结果</h3>
    </div>
    <div class="header" style="text-align:left">
      <span>Headers</span>
      <span>Preview</span>
      <span>Response</span>
      <span>Assert</span>
    </div>
  </div>-->
  <div class="left-box">
    <div class="title" style="text-align:left">
      <h3 style="display: inline-block;">调试结果</h3>
      <div style="float:right;display: inline-block;margin-top: 15px;" class="title-right">
        <span @click="clickCont()">请求内容</span>
        <span @click="clickLog()">执行日志</span>
      </div>
    </div>
    <div class="left-box-body">
      <div class="left-box-left" v-if="leftCaseName">
        <div style="margin:10px 10px 0 0">
          <div style="margin:10px">
            <span>用例名称</span>
          </div>
          <li
            v-for="(item,index) in list"
            :key="index"
            :listDict="item"
            style="margin:10px;text-align:left;overflow-x:hidden"
          >
            <el-link
              :type="caseNameColorList[index]"
              @click="caseNameClick(item,index)"
            >{{item.name}}</el-link>
          </li>
        </div>
      </div>
      <div class="left-box-right" v-show="contLogStatus">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="Headers" name="first">
            <div class="Headers">
              <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item title="请求地址" name="0">
                  <div class="attr" style="text-align:left">
                    <li>
                      <span>
                        <b>Request URL：</b>
                      </span>
                      <span>{{lists.listDictPostUrl}}</span>
                    </li>
                    <li>
                      <span>
                        <b>Request Method：</b>
                      </span>
                      <span>{{lists.listDictPostMethods}}</span>
                    </li>
                    <li>
                      <span>
                        <b>Status Code：</b>
                      </span>
                      <span>{{lists.listDictResStatus}}</span>
                    </li>
                    <li v-if="lists.listDictPostCode===0" style="color:red">
                      <span>
                        <b>Errors：</b>
                      </span>
                      <span>{{lists.listDictPostErrors}}</span>
                    </li>
                  </div>
                </el-collapse-item>
                <el-collapse-item title="请求头" name="1">
                  <div class="hds" style="text-align:left">
                    <li v-for="(item,index) in Object.keys(lists.listDictPostHeaders)" :key="index">
                      <span>
                        <b>{{item}}：</b>
                      </span>
                      <span>{{lists.listDictPostHeaders[item]}}</span>
                    </li>
                  </div>
                </el-collapse-item>
                <el-collapse-item title="返回头" name="2" style="text-align:left">
                  <li
                    v-for="(item,index) in Object.keys(lists.listDictPostresHeaders)"
                    :key="index"
                  >
                    <span>
                      <b>{{item}}：</b>
                    </span>
                    <span>{{lists.listDictPostresHeaders[item]}}</span>
                  </li>
                </el-collapse-item>
                <el-collapse-item title="请求数据" name="3" style="text-align:left">
                  <li v-for="(item,index) in Object.keys(lists.listDictPostData)" :key="index">
                    <span>
                      <b>{{item}}：</b>
                    </span>
                    <span>{{lists.listDictPostData[item]}}</span>
                  </li>
                </el-collapse-item>
              </el-collapse>
            </div>
          </el-tab-pane>
          <el-tab-pane label="Preview" name="second">
            <div style="text-align:left" class="Preview">
              <json-viewer :value.sync="lists.listDictPostResData"></json-viewer>
            </div>
          </el-tab-pane>
          <el-tab-pane label="Response" name="third">
            <div style="text-align:left;" class="Response">{{lists.listDictPostResText}}</div>
          </el-tab-pane>

          <el-tab-pane label="Assert" name="fourth">
            <div style="text-align:left" class="Assert">定时任务补偿</div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="log" v-show="!contLogStatus">
        <div>
          <p v-for="(item,index) in  logList" :key="index">{{item}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import storage from "../../../libs/storage";
export default {
  props: ["listReslits", "code", "currentInterfaceId"],
  data() {
    return {
      list: [],
      logList: [], //日志列表
      contLogStatus: true,
      caseNameColorList: [],
      aa: [],
      path: "ws://192.168.0.66:8081/ws/users/case_run/",
      logPath: "ws://192.168.0.66:8081/ws/users/logList/",
      socket: "",
      activeName: "first",
      res: {
        postHeader: null,
        postMethods: null,
        resStatus: null,
      },
      activeNames: ["0"],
      leftCaseName: true,
      listDict: null, //list遍历的item
      lists: {
        listDictPostUrl: null,
        listDictPostMethods: null,
        listDictResStatus: null,
        listDictPostData: {},
        listDictPostHeaders: {},
        listDictPostresHeaders: {},
        listDictPostResData: {},
        listDictPostResText: {},
        listDictPostCode: 1,
        listDictPostErrors: null,
      },
    };
  },
  methods: {
    clickCont() {
      document.querySelectorAll(".title-right span")[1].style.cssText =
        "background-color:;color:;border-radius:";
      document.querySelectorAll(".title-right span")[0].style.cssText =
        "background-color:rgb(98, 161, 239);color:rgb(248, 248, 251);border-radius: 5px";
      this.contLogStatus = true;
    },
    clickLog() {
      document.querySelectorAll(".title-right span")[0].style.cssText =
        "background-color:;color:;border-radius:";
      document.querySelectorAll(".title-right span")[1].style.cssText =
        "background-color:rgb(98, 161, 239);color:rgb(248, 248, 251);border-radius: 5px";
      this.contLogStatus = false;
    },

    caseNameClick(item, index) {
      console.log("ssasaaas", item);
      this.listDict = item;
      var objectKeys = Object.keys(this.listDict);
      console.log(objectKeys);
      objectKeys.indexOf("resHeaders") < 0
        ? (this.listDict["resHeaders"] = {})
        : null;
      objectKeys.indexOf("resData") < 0
        ? (this.listDict["resData"] = {})
        : null;
      objectKeys.indexOf("resText") < 0
        ? (this.listDict["resText"] = {})
        : null;
      this.lists.listDictPostUrl = this.listDict.postUrl;
      this.lists.listDictPostMethods = this.listDict.postMethods;
      this.lists.listDictResStatus = this.listDict.resStatus;
      this.lists.listDictPostHeaders = this.listDict.postHeader;
      this.lists.listDictPostresHeaders = this.listDict.resHeaders;
      this.lists.listDictPostData = this.listDict.postData;
      this.lists.listDictPostResData = this.listDict.resData;
      this.lists.listDictPostResText = this.listDict.resText;
      this.lists.listDictPostCode = this.listDict.code;
        this.lists.listDictPostErrors = this.listDict.errors;
      console.log("errors", this.listDict);
      // this.lists.
      if (this.listDict.beforeAction ) {
        //九月十四修改
        if (this.listDict.beforeAction.code !== 1) {
          this.lists.listDictPostCode = 0;
          this.lists.listDictPostErrors = this.listDict.beforeAction.msg;
        }
     
      }
      if (this.listDict.afterAction) {
        //九月十四修改
 
        if (this.listDict.afterAction.code !== 1) {
          this.lists.listDictPostCode = 0;
          this.lists.listDictPostErrors = this.listDict.afterAction.msg;
        }
      }

    },
    //tab组件切换方法
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleChange(val) {
      console.log(val);
    },
    changeColor() {},

    init: function () {
      if (typeof WebSocket === "undefined") {
        alert("您的浏览器不支持socket");
      } else {
        // 实例化socket
        this.socket = new WebSocket(this.path);
        // 监听socket连接
        this.socket.onopen = this.open;
        // 监听socket错误信息
        this.socket.onerror = this.error;
        // 监听socket消息
        this.socket.onmessage = this.getMessage;

        this.socket.onclose = this.close;
      }
    },
    logInit() {
      if (typeof WebSocket === "undefined") {
        alert("您的浏览器不支持socket");
      } else {
        // 实例化socket
        this.socketLog = new WebSocket(this.logPath);
        // 监听socket连接
        this.socketLog.onopen = this.openLog;
        // 监听socket错误信息
        this.socketLog.onerror = this.errorLog;
        // 监听socket消息
        this.socketLog.onmessage = this.getMessageLog;

        this.socketLog.onclose = this.closeLog;
      }
    },
    openLog() {
      console.log("实时日志链接成功");
      this.socketLog.send(JSON.stringify(this.code));
      console.log(this.list);
    },
    errorLog: function () {
      // this.init();
      console.log("连接错误");
    },
    getMessageLog(msg) {
      var msg = JSON.parse(msg.data);
      this.logList.push(msg);
      var div = document.querySelector(".log");
      div.scrollTop = div.scrollHeight;
    },
    sendLog() {
      this.socketLog.send("params");
    },
    closeLog() {
      console.log("实时日志链接关闭");
    },
    open: function () {
      console.log("socket连接成功");
      console.log(this.code, "这是code");
      this.socket.send(JSON.stringify(this.code));
      console.log(this.list);
    },
    error: function () {
      // this.init();
      console.log("连接错误");
    },
    getMessage: function (msg) {
      var item = JSON.parse(msg.data);
      console.log(item, "diuduid");

      this.list.push(item);
      if (item.beforeAction && item.afterAction){
        item.code === 1 ? this.caseNameColorList.push("success") : null; //正常返回数据
        item.code === 0 ? this.caseNameColorList.push("danger") : null; //请求异常数据

        item.code === 2 ? this.caseNameColorList.push("warning") : null; //断言失败
      }
      
      if (item.beforeAction) {
        item.beforeAction.code !== 1
          ? this.caseNameColorList.push("info")
          : null; //请求异常数据
      }
      if (item.afterAction) {
        item.afterAction.code !== 1
          ? this.caseNameColorList.push("info")
          : null; //请求异常数据
      }
      if (this.list.length > 1) {
        this.leftCaseName = true;
      }
      //将返回的第一个结果写入html
      if (this.list.length === 1) {
        this.caseNameClick(this.list[0]);
      }

      // console.log(this.list)
    },
    send: function () {
      this.socket.send("params");
    },
    close: function () {
      console.log("socket已经关闭");
    },
    chiocesLitsOne() {
      //默认选中第一个
      if (this.list.length === 1) {
        this.leftCaseName = false;
        var one = this.list[0];

        this.caseNameClick(one, 1);
      } else {
        this.leftCaseName = true;
        var one = this.list[0];
        console.log("one", one);
        this.caseNameClick(one, 1);
      }
      // if (this.list.length >= 1) {

      // }
    },
    caseNameColor(row) {
      row.forEach((item, index) => {
        item.code === 1 ? this.caseNameColorList.push("success") : null; //正常返回数据
        item.code === 0 ? this.caseNameColorList.push("danger") : null; //请求异常数据
        item.code === 2 ? this.caseNameColorList.push("warning") : null; //断言失败
      });
    },
  },

  destroyed() {
    // 销毁监听
    console.log(this.code);
    console.log("销毁组件");
    if (this.code) {
      this.socket.close();
      this.socketLog.close();
    }

    this.$emit("update:code", null);
    console.log(this.code);
  },

  mounted() {
    // console.log("this.list",this.list)

    // console.log(this.currentInterfaceId,"aaa")
    document.querySelectorAll(".title-right span")[0].style.cssText =
      "background-color:rgb(98, 161, 239);color:rgb(248, 248, 251);border-radius: 5px";
    console.log("this.code", this.code);
    if (this.code) {
      console.log(this.code);
      this.init();
      this.logInit();
      console.log("obj");
    } else {
      console.log(this.listReslits, "3231");
      this.list = this.listReslits.results;
      this.logList = this.listReslits.logList;
      console.log(this.list);
      this.caseNameColor(this.list);
      this.chiocesLitsOne();
    }
    // else{
    //   this.logList=this.list.logList
    // }
    // if(Object.keys(this.list).indexOf("results")>=0){
    //     this.logList=this.list.logList
    //     this.list=this.list.results

    //   }
  },
  watch: {
    list(a, b) {
      console.log(a, b);
    },
  },
};
</script>

<style lang="scss" scoped>
.left-box {
  margin: 10px;
  height: 100%;

  li {
    list-style-type: none;
    margin-left: 10px;
    word-break: break-word;
    white-space: normal;
  }
  .Response {
    word-break: break-word;
    white-space: normal;
    font-family: Consolas, Menlo, Courier, monospace;
    font-size: 14px;
  }
}
.left-box .el-collapse {
  border-top: none !important;
}

.left-box .Headers,
.left-box .Preview,
.left-box .Response,
.left-box .Assert {
  overflow-x: hidden;
  height: 800px;
}
.left-box-body {
  position: relative;
  // background-color: royalblue;
  display: flex;
  height: 100%;
}
.left-box-left {
  display: inline-block;
  width: 200px;
  overflow-x: hidden;
  background-color: #eee;
  margin-right: 10px;
}
.left-box-right,
.log {
  display: inline-block;
  flex: 1;
  overflow-x: hidden;
}
.log {
  text-align: left;
  color: white;
  background-color: black;
  overflow-x: hidden;
  height: 800px;
}
.title-right span {
  // background-color: rgb(98, 161, 239);
  // color: rgb(248, 248, 251);
  // border-radius: 5px;
  padding: 10px 10px;
  font-size: 15px;
}
.title-right span:hover {
  cursor: pointer;
  background-color: #ecf5ff;
  color: #409eff;
  border: 1px solid rgb(98, 161, 239);
  border-radius: 5px;
}
</style>>

<style>
.left-box .Preview .jv-code {
  padding: 0px !important;
}
</style>