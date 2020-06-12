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
      <h3>调试结果</h3>
    </div>
    <div class="left-box-body">
      <div class="left-box-left" v-if="leftCaseName">
        <div style="margin:10px 10px 0 0">
          <div style="margin:10px">
            <span >用例名称</span>
          </div>
          <li v-for="(item,index) in list" :key="index" :listDict="item" style="margin:10px;text-align:left;overflow-x:hidden">
            <el-link :type="caseNameColorList[index]"  @click="caseNameClick(item,index)">{{item.name}}</el-link>
          </li>
        </div>
      </div>
      <div class="left-box-right">
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

          <el-tab-pane label="Assert" name="fourth">定时任务补偿</el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["list", "code"],
  data() {
    return {
      caseNameColorList:[],
      aa: [],
      path: "ws://192.168.0.66:8081/ws/users/case_run/",
      socket: "",
      activeName: "first",
      res: {
        postHeader: null,
        postMethods: null,
        resStatus: null
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
        listDictPostCode:1,
        listDictPostErrors:null
      }
    };
  },
  methods: {
    caseNameClick(item, index) {
      this.listDict = item;
      var objectKeys=Object.keys(this.listDict)
      objectKeys.indexOf("resHeaders")<0 ? this.listDict["resHeaders"]={} :null
      objectKeys.indexOf("resData")<0 ? this.listDict["resData"]={} :null
      objectKeys.indexOf("resText")<0 ? this.listDict["resText"]={} :null
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
      console.log("errors",this.listDictPostErrors)
      // this.lists.

      
    },
    //tab组件切换方法
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleChange(val) {
      console.log(val);
    },
    changeColor() {},

    init: function() {
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

        this.socket.onclose=this.close;
      }
    },
    open: function() {
      console.log("socket连接成功");
      this.socket.send(JSON.stringify(this.code))
      console.log(this.list)
    },
    error: function() {
      // this.init();
      console.log("连接错误");
    },
    getMessage: function(msg) {
      var item=JSON.parse(msg.data)
      console.log(item)
      
      this.list.push(item)
      item.code===1?this.caseNameColorList.push("success"):null  //正常返回数据
      item.code===0?this.caseNameColorList.push("danger"):null   //请求异常数据
      item.code===2?this.caseNameColorList.push("warning"):null  //断言失败
      if(this.list.length>1){
        this.leftCaseName=true
      }
      // if(this.list.length>=1){
      //   // this.caseNameClick(this.list[0])
      // }
      
      // console.log(this.list)
    },
    send: function() {
      
      this.socket.send("params");
    },
    close: function() {
      console.log("socket已经关闭");
    },
    chiocesLitsOne() {
      //默认选中第一个
      console.log("this.list2", this.code);
      console.log(this.list.length);
      if (this.list.length <= 1) {
        this.leftCaseName = false;
      } else {
        this.leftCaseName = true;
      }
      if (this.list.length >= 1) {
        var one = this.list[0];
        this.caseNameClick(one, 1);
      }
    }
  },

  destroyed() {
    // 销毁监听
    console.log(this.code)
    console.log("销毁组件")
    if(this.code){
      this.socket.close();
    }
    
    this.$emit("update:code",null)
    console.log(this.code)
   
    
  },

  mounted() {
    
    console.log("this.code",this.code)
    if (this.code) {
      console.log(this.code);
      this.init();
      console.log("obj");
    }
    this.chiocesLitsOne();
  },
  watch: {
    list(a, b) {
      console.log(a, b);
    }
  }
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
.left-box-right {
  display: inline-block;
  flex: 1;
  overflow-x: hidden;
}
</style>>

<style>
.left-box .Preview .jv-code {
  padding: 0px !important;
}
</style>