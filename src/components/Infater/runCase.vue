<template>
  <div class="runCase">
    <div class="runCase_context">
      <div class="run_title">
        <el-button
          type="primary"
          size="small"
          class="el-icon-plus"
          @click="createCasePlanStatus=true;buttonClickStatus=true"
        >新建测试计划</el-button>
        <el-button
          type="primary"
          size="small"
          class="el-icon-plus"
          @click="inCaseListRouter()"
        >查看用例列表</el-button>
      </div>
      <div class="run_body">
        <el-table
          v-loading="loading.loading_table"
          :data="tableData"
          style="width: 100%"
          min-height="700"
          border
          :header-cell-style="textStyle"
          :cell-style="textStyle"
        >
          <el-table-column prop="id" label="Id" width="50"></el-table-column>
          <el-table-column prop="name" label="名称" width="150"></el-table-column>
          <el-table-column prop="cname" label="脚本名称" width="160"></el-table-column>
          <el-table-column prop="runType.name" label="执行方式" width="80"></el-table-column>
          <el-table-column prop="cron" label="执行开始时间" width="160"></el-table-column>
          <el-table-column prop="status.name" label="状态" width="150"></el-table-column>
          <el-table-column prop="caseEndTime" label="执行完成时间" width="160"></el-table-column>
          <el-table-column prop="CaseCount" label="用例数量" width="100"></el-table-column>
          <el-table-column prop="userId.name" label="创建人" width="150"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="160"></el-table-column>
          <el-table-column prop="detail" label="备注" width="160"></el-table-column>
          <el-table-column fixed="right" label="操作" width="230" height="50">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              <el-button
                type="text"
                size="small"
                @click="editPlan(scope.row,scope.$index);buttonClickStatus=false"
              >编辑</el-button>
              <el-button
                type="text"
                size="small"
                @click="D_ClassRemove(scope.row.id,scope.$index)"
              >删除</el-button>
              <el-button type="text" size="small" @click="runPlan(scope.row)">执行</el-button>
              <el-button
                type="text"
                size="small"
                @click="RunCaseResults.currentCasePlanId=scope.row.id;runResults();"
              >结果</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="block" style="margin-top:30px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <div v-if="createCasePlanStatus">
      <createCasePlan :styleCode="createCasePlanStyle" v-slot:createCasePlan>
        <div class="ccp">
          <div class="ccp-title">
            <h3 v-if="buttonClickStatus">创建计划</h3>
            <h3 v-if="!buttonClickStatus">更新计划</h3>
          </div>
          <div class="ccp-body">
            <el-form :model="datas" :rules="rules" label-width="80px" ref="refFrom1">
              <el-form-item prop="name" label="计划名称">
                <el-input v-model="datas.name" clearable placeholder="计划名称"></el-input>
              </el-form-item>
              <el-form-item prop="cname" label="英文名称">
                <el-input v-model="datas.cname" placeholder="输入自动生成的脚本名称" clearable></el-input>
              </el-form-item>
              <el-form-item prop="runType" label="执行方式">
                <el-radio-group v-model="datas.runType">
                  <el-radio :label="0">手动执行</el-radio>
                  <el-radio :label="1">定时执行</el-radio>
                </el-radio-group>
              <el-form-item v-if="datas.runType==1">
                <div class="cron" >
                  <el-popover v-model="cron.cronPopover">
                    <el-input
                      slot="reference"
                      @click="cron.cronPopover=true"
                      v-model="datas.cron"
                      placeholder="请输入定时策略"
                    ></el-input>
                    <cron @change="changeCron" @close="cron.cronPopover=false" i18n="cn"></cron>
                  </el-popover>
                </div>
              </el-form-item>
                
              </el-form-item>
              <el-form-item prop="code" label="计划描述">
                <el-input v-model="datas.detail" placeholder="请输入计划描述" clearable></el-input>
              </el-form-item>
              <el-form-item prop="code" label="每次执行是否重新创建脚本：" class="againScript">
                <br />
                <el-radio-group v-model="datas.againScript">
                  <el-radio :label="0">否</el-radio>
                  <el-radio :label="1">是</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
          </div>
          <div class="ccp-foot">
            <el-button type="primary" size="small" @click="closeTable()">取消</el-button>
            <el-button
              type="primary"
              size="small"
              @click="casePlanAdd();"
              v-if="buttonClickStatus"
            >创建</el-button>
            <el-button
              type="primary"
              size="small"
              @click="casePlanUpdate();"
              v-if="!buttonClickStatus"
            >更新</el-button>
          </div>
        </div>
      </createCasePlan>
    </div>
    <div class="runCaseBox">
      <run-box v-slot:RunCaseBox :styleCode="runStyleCode" v-if="runCaseBoxStatus">
        <div style="margin: 10px;">
          <div class="header">
            <span style="display:inline-block;text-align: center;font-weight:700">执行过程</span>
            <span
              class="el-icon-close close"
              @click="runCaseBoxStatus=false"
              style="float:right;padding: 10px;"
            ></span>
          </div>

          <div class="body" style="margin-top:30px">
            <div class="steps">
              <el-steps :active="RunStatus" align-center finish-status="success">
                <el-step title="初始化"></el-step>
                <el-step title="生成脚本" v-if="createScriptStatus==1"></el-step>
                <el-step title="执行脚本"></el-step>
                <el-step title="执行完毕"></el-step>
              </el-steps>
            </div>
            <div class="log">
              <div class="text" style="text-align: left;color: white;">
                <li
                  style="list-style-type: none;"
                  v-for="(item,index) in  logList"
                  :key="index"
                >{{item}}</li>
              </div>
            </div>
          </div>
        </div>
      </run-box>
    </div>
    <div class="runCaseResults" v-if="RunCaseResults.runCaseResultsStatus">
      <results-box :styleCode="RunCaseResults.runStyleCode" v-slot:caseRunResults>
        <div class="results">
          <div class="header">
            <h3 style="display:inline-block" class="title">测试结果</h3>
            <span
              style="float:right;margin:10px;cursor: pointer;"
              class="el-icon-close"
              @click="RunCaseResults.runCaseResultsStatus=false;RunCaseResults.loading=true"
            ></span>
          </div>
          <div class="body">
            <el-table
              :data="RunCaseResults.results"
              border
              style="width: 100%"
              :header-cell-style="textStyle"
              :cell-style="textStyle"
              v-loading="RunCaseResults.loading"
            >
              <el-table-column prop="createTime" label="执行日期" fit></el-table-column>
              <el-table-column prop="user.name" label="执行人" fit></el-table-column>
              <el-table-column prop="caseCount" label="已完成用例总数" fit></el-table-column>
              <el-table-column prop="assertSuccess" label="断言成功数量" fit></el-table-column>
              <el-table-column prop="assertFailed" label="断言失败数量" fit></el-table-column>
              <el-table-column prop="runFailed" label="报错数量" fit></el-table-column>
              <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope" fit>
                  <el-button @click="deleteTwo(pageRemove,scope.row)" type="text" size="small">删除</el-button>
                  <el-button @click="selectResult(scope.row)" type="text" size="small">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="foot">
            <page-box ref="runCaseResult"></page-box>
          </div>
          <div></div>
        </div>
      </results-box>
    </div>
  </div>
</template>
    
<script>
import {cron} from 'vue-cron';
import validator from "@/libs/validate.js";
import storage from "@/libs/storage.js";
import {
  AddCasePlan,
  getCasePlan,
  UpdateCasePlan,
  DeleteCasePlan,
  RunCaseAll,
  CaseResultsDetail,
  CaseResults,
  CaseResultsDel,
} from "../../axios/api.js";
import jsMethods from "@/libs/myJs.js";
import { Message } from "element-ui";
export default {
  components: {
    createCasePlan: () => import("../public/MessageBox.vue"),
    "run-box": () => import("../public/MessageBox.vue"),
    "results-box": () => import("../public/MessageBox.vue"),
    "page-box": () => import("../public/page.vue"),
    cron,
  },
  data() {
    return {
      cron:{
        cronPopover:false,
            cron:''  //这个字段放在datas
      },
      pageMethods: this.runResults,
      RunCaseResults: {
        loading: true,
        currentCasePlanId: null,
        runCaseResultsStatus: false, //测试结果弹窗
        runStyleCode: "width:1200px;height:750px",
        results: [],
      },

      RunStatus: 0,
      createScriptStatus: 1, //在点击结果或者执行时-判断需不需要重新创建脚本--是展示三项步骤还是四项
      runCaseBoxStatus: false,

      runStyleCode: "width:1000px;height:750px",
      buttonClickStatus: "true",
      total: null, //数据总条数
      pageSize: 10, //每页显示的数量
      page: 1, //当前请求的页面
      allPage: null, //总页数
      datas: {
        name: null, //计划名称
        cname: null, //计划英文名--自动化脚本名称
        runType: 0, //执行列表-立即执行  定时执行   轮询
        detail: null,
        caseStartTime: "", //计划开始时间
        againScript: 0, //是否重新创建脚本   1-重新创建      0-不重新创建
        cron:null
      },
      //编辑暂存
      editPlanItem: "",
      editPlanIndex: "",
      rules: {
        name: [{ required: true, message: "输入计划名", trigger: "blur" }],
        cname: [
          { required: true, message: "输入英文名", trigger: "blur" },
          { validator: validator.caseCname, trigger: "blur" },
        ],
        runType: [
          { required: true, message: "请选择执行方式", trigger: "change" },
        ],
        
      },
      loading: {
        loading_table: true,
      },
      createCasePlanStyle: "height:700px;width:500px",
      createCasePlanStatus: false,
      tableData: [
        // {
        //   id: "1",
        //   name: "TestCase",
        //   cname: "慧投1.01版接口",
        //   caseStartTime: "-",
        //   status: { id: 0, name: "未执行" },
        //   runType: { id: 0, name: "手动执行" },
        //   caseEndTime: "-",
        //   CaseCount: "888",
        //   userId: { id: 1, name: "冯凡" },
        //   createTime: "2020-06-09 16:49:55",
        //   detail: "不要删除不要删除不要删除"
        // }
      ],
      WebSocket: {
        path: "ws://192.168.0.66:8081/ws/users/runCaseSelectLog/",

        data: null,
      },
      socket: "",
      logList: [],
    };
  },
  methods: {
    changeCron(val){
            this.datas.cron=val
        },
    // websockey
    init: function () {
      if (typeof WebSocket === "undefined") {
        alert("您的浏览器不支持socket");
      } else {
        // 实例化socket
        this.socket = new WebSocket(this.WebSocket.path);
        // 监听socket连接
        this.socket.onopen = this.open;
        // 监听socket错误信息
        this.socket.onerror = this.error;
        // 监听socket消息
        this.socket.onmessage = this.getMessage;

        this.socket.onclose = this.close;
      }
    },
    open: function () {
      console.log("socket链接成功");
      this.socket.send(this.WebSocket.data);
    },
    getMessage: function (msg) {
      var data = JSON.parse(msg.data);
      var log = data.log;
      var status = data.status.status;

      this.logList.push(log);
      this.RunStatus = status;
      if (log == "结束") {
        this.socket.close();
      }

      var div = document.querySelector(".text");
      div.scrollTop = div.scrollHeight;
      console.log(this.RunStatus);
    },
    send: function () {
      this.socket.send(this.WebSocket.data);
    },
    error: function () {
      // this.init();
      console.log("连接错误");
    },
    close: function () {
      console.log("socket已经关闭");
    },

    //查看执行结果
    runResults(page = 1, pageSize = 10, type = 3) {
      this.RunCaseResults.loading = true;
      this.RunCaseResults.runCaseResultsStatus = true;
      CaseResults({
        type: type,
        c_id: this.RunCaseResults.currentCasePlanId,
        page: page,
        pageSize: pageSize,
      }).then((res) => {
        if (res.status === 200) {
          console.log("ojbk");
          this.RunCaseResults.results = res.results;
          this.$refs.runCaseResult.total = res.total;
          this.$refs.runCaseResult.allPage = res.allPage;
          this.RunCaseResults.loading = false;
        }
      });
    },

    //删除执行结果
    pageRemove(item) {
      console.log("item", item);
      var page = this.$refs.runCaseResult.currentPage;
      console.log(page);
      console.log(this.RunCaseResults.length);
      if (this.RunCaseResults.results.length === 1 && page !== 1) {
        page = page - 1;
        this.$refs.runCaseResult.currentPage = page;
      }
      CaseResultsDel({
        id: item.id,
        c_id: item.c_id,
        page: page,
        pageSize: this.$refs.runCaseResult.pageSize,
        type: item.type,
      }).then((res) => {
        if (res.status === 200) {
          this.RunCaseResults.results = res.results;
          this.$refs.runCaseResult.total = res.total;
          this.$refs.runCaseResult.allPage = res.allPage;
          Message.success(res.msg);
        }
      });
    },
    deleteTwo() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log(arguments);
          arguments[0](arguments[1]);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    runPlan(item) {
      this.logList = [];
      this.RunStatus = 0;
      this.createScriptStatus = item.againScript;
      RunCaseAll({
        id: item.id,
        userId: storage.get("userId"),
        caseCount: item.CaseCount,
        projectId: storage.get("projectId"),
        againScript: item.againScript,
        CaseCount: item.CaseCount,
      }).then((res) => {
        res.status === 200
          ? (this.runCaseBoxStatus = true)
          : Message.error(res.msg);
        this.WebSocket.data = JSON.stringify(res);
        this.init();
      });
    },

    D_ClassRemove(item, index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log(arguments);
          this.DeleteCasePlan(item, item);
          // this.$message({
          //   type: "success",
          //   message: "删除成功!"
          // });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    inCaseListRouter() {
      this.$router.push({ name: "runCaseList" });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      console.log(111, val);
      this.casePlanList(this.page, this.pageSize);
    },
    handleCurrentChange(val) {
      //选择页面
      this.page = val;
      console.log(222, val);
      this.casePlanList(this.page, this.pageSize);
    },
    handleClick() {},
    textStyle({ row, column, rowIndex, columnIndex }) {
      //tabl文字居中
      return "text-align:center";
    },
    closeTable() {
      //清空表单
      this.datas.name = null;
      this.datas.cname = null;
      this.datas.runType = 0;
      this.datas.detail = null;
      this.datas.againScript = 0;
      this.createCasePlanStatus = false;
      this.datas.cron=null
    },
    casePlanAdd() {
      //添加计划
      this.$refs.refFrom1.validate((valid) => {
        if (valid) {
          AddCasePlan({
            projectId: storage.get("projectId"),
            userId: storage.get("userId"),
            name: this.datas.name,
            cname: this.datas.cname,
            runType: this.datas.runType,
            detail: this.datas.detail,
            againScript: this.datas.againScript,
            cron:this.datas.cron,
            page: this.page,
            pageSize: this.pageSize,
          }).then((res) => {
            res.status == 200
              ? (Message.success("新增成功"),
                (this.allPage = res.allPage),
                (this.total = res.total),
                (this.createCasePlanStatus = false),
                (this.tableData = res.results))
              : null;
          });
        } else {
          return false;
        }
      });
    },
    editPlan(item, index) {
      //点击编辑按钮
      this.editPlanItem = item;
      this.editPlanIndex = index;
      console.log(item);
      this.datas.name = item.name;
      this.datas.cname = item.cname;
      this.datas.runType = item.runType.id;
      this.datas.cron=item.cron
      //时间
      this.datas.detail = item.detail;
      this.datas.againScript = item.againScript;
      this.createCasePlanStatus = true;
    },
    casePlanUpdate() {
      //点击编辑按钮直接更新
      this.$refs.refFrom1.validate((valid) => {
        if (valid) {
          var item = this.editPlanItem;
          var index = this.editPlanIndex;
          console.log("item", item, index);
           var data={
            projectId: storage.get("projectId"),
            id: item.id,
            // cron:this.cron.cron,
            name: this.datas.name,
            cname: this.datas.cname,
            runType: this.datas.runType,
            againScript: this.datas.againScript,
            detail: this.datas.detail,
          }
          if (this.datas.runType==1){
            if (!this.datas.cron){
              return Message.error("定时策略不能为空")
            }
            data["cron"]=this.datas.cron
          }
         
          UpdateCasePlan(data).then((res) => {
            res.status === 200
              ? (this.tableData.splice(index, 1, res.results),
                (this.createCasePlanStatus = false),
                this.closeTable(),
                Message.success("更新成功"))
              : null;
          });
        }
      });
    },
    DeleteCasePlan(id, index) {
      //删除计划
      DeleteCasePlan({
        projectId: storage.get("projectId"),
        id: id,
        pageSize: this.pageSize,
        page: this.page,
      }).then((res) => {
        res.status === 200
          ? (Message.success(res.msg),
            (this.tableData = res.results),
            (this.total = res.total),
            (this.allPage = res.allPage),
            this.page > this.allPage
              ? ((this.page = this.page - 1),
                this.casePlanList(this.page, this.pageSize))
              : null)
          : null;
      });
    },
    casePlanList(page, pageSize) {
      //计划列表
      getCasePlan({
        projectId: storage.get("projectId"), 
        page: page,
        pageSize: pageSize,
      }).then((res) => {
        res.status === 200
          ? ((this.tableData = res.results),
            (this.total = res.total),
            (this.allPage = res.allPage),
            (this.loading.loading_table = false))
          : null;
      });
    },
    displayNone(){
      cronSecond=document.querySelectorAll("#changeContab .el-tabs__item")[0]
      
      // cronSecond.style.cssText="display: none;"
      // cronYear=document.querySelectorAll("#changeContab .el-tabs__item")[5]
      // cronYear.style.cssText="display: none;"
    },
  },
  mounted() {
    this.casePlanList(this.page, this.pageSize);
  },
  watch:{
    "datas.cron"(a,b){
      var cronList=[]
      if(a!==null){
          cronList=a.split(" ")
      }
      
      if (cronList.length>5){
        console.log(cronList,typeof cronList)
      
      var sliceCron=cronList.slice(1,-1)
      console.log(sliceCron)
      this.datas.cron=sliceCron.join(" ")
      }
      
      
    }
  }
};
</script>

<style lang="scss" scoped>
.runCase {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  background: #eee;
  .runCase_context {
    margin: 0 10px;
  }
  .run_title {
    width: 100%;
    text-align: left;
    padding: 20px 0;
  }
}
.ccp {
  margin: 0 10px;
  .ccp-title {
    border-bottom: 1px solid #eee;
  }
  .ccp-body {
    text-align: left;
    margin-top: 10px;
    li {
      list-style: none;
    }
  }
}
.ccp-foot {
  margin-left: 200px;
  position: absolute;
  bottom: 20px;
}

.runCaseBox {
  .log .text {
    background: black;
    width: 100%;
    height: 600px;
    overflow-x: hidden;
    margin-top: 10px;
  }
}
.runCaseResults .results .body {
  height: 620px;
  overflow-x: hidden;
}


</style>

<style >
.TextCenter {
  text-align: center;
}
.againScript .el-form-item__label {
  width: 200px !important;
}

.el-tabs__nav-scroll .el-tabs__nav .el-tabs__item:nth-child(1),
.el-tabs__nav-scroll .el-tabs__nav .el-tabs__item:nth-child(6),
#changeContab .value,
.el-tabs__content .el-tab-pane:nth-child(1)
{
  display: none;
}

.el-tabs__content .el-tab-pane:nth-child(2){
  display:inherit   !important
}
.el-popover{
    transform-origin: center top;
    z-index: 2105;
    position: fixed;
    top: 250px !important;
    left:  120px !important;    
}
</style>