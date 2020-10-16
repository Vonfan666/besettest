<template>
  <div class="timedTask">
    <div class="task">
      <div class="head">
        <div class="search">
          <el-form ref="search" :model="search" label-width="90px">
            <el-form-item label="任务名称：">
              <el-input placeholder="请输入任务名称" v-model="search.taskName" clearable size="mini"></el-input>
            </el-form-item>
            <el-form-item label="计划名称：">
              <el-input placeholder="请输入计划名称" v-model="search.planName" clearable size="mini"></el-input>
            </el-form-item>
            <el-form-item label="创建人：">
              <el-input placeholder="请输出创建人名称" v-model="search.createName" clearable size="mini"></el-input>
            </el-form-item>

            <el-button type="primary" size="mini" @click="searchTask()">搜索</el-button>
            <el-button type="primary" size="mini" @click="clickTimedTask()">新建任务</el-button>
          </el-form>
        </div>
      </div>
      <div class="bod">
        <el-table :data="taskList" border style="width: 100%">
          <el-table-column prop="taskName" label="任务名称" width="150"></el-table-column>
          <el-table-column prop="plan.name" label="计划名称" width="150"></el-table-column>
          <el-table-column prop="status.name" label="状态" width="150"></el-table-column>
          <el-table-column prop="cron" label="cron表达式" width="150"></el-table-column>
          <el-table-column prop="userId.name" label="创建用户" width="150"></el-table-column>
          <el-table-column prop="lastTime" label="最近执行时间" width="160"></el-table-column>
          <el-table-column prop="lastStatus" label="最近执行结果" width="150"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="160"></el-table-column>
          <el-table-column prop="detail" label="描述" fit></el-table-column>
          <el-table-column fixed="right" prop="detail" label="操作"  min-width="130px" fit>
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="clickEdit(scope.$index, scope.row)"
                type="text"
                size="small"
              >编辑</el-button>
              <el-button
                @click.native.prevent="TaskStop(scope.$index, scope.row)"
                type="text"
                size="small"
              ><span v-if="scope.row.status.id" style="color:red">暂停</span><span v-if="!scope.row.status.id">开启</span></el-button>
              <el-button
                @click.native.prevent="deleteTwo(TaskRemove,scope.row)"
                type="text"
                size="small"
              >移除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="foot">
        <page-box ref="pageBox"  :page_Methods="pageMethods"></page-box>
        
      </div>
      <add-task
        ref="addTask"
        :styleCode="addTask.styleCode"
        v-slot:addTask
        v-if="addTask.taskStatus"
      >
        <div class="addTask">
          <div class="header">
            <h3 style="display:inline-block" class="title">新增定时任务</h3>
            <span
              style="float:right;margin:10px;cursor: pointer;"
              class="el-icon-close"
              @click="closeAddTask()"
            ></span>
          </div>
          <div class="body">
            <el-form :model="addTask" :rules="rules" label-width="80px" ref="addTaskFrom">
              <el-form-item prop="taskName" label="任务名称">
                <el-input v-model="addTask.taskName" clearable placeholder="任务名称"></el-input>
                
              </el-form-item>
              <el-form-item prop="Plan" label="计划名称" width="100%">
                <el-select v-model="addTask.Plan" clearable placeholder="计划名称" filterable >
                  <el-option  v-for="(item,index) in  planList"  :key="index" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="cron" label="执行时间">
                <el-input v-model="addTask.cron" clearable placeholder="五位Crom表达式:* * * * * 空格隔开"></el-input>
              </el-form-item>
              <el-form-item label="最近执行" v-if="addTask.validCronStatus">
                <!-- <el-input v-model="addTask.validCron" clearable placeholder="当前表达式最近执行时间"></el-input> -->
                <div style="height: 150px;
    overflow-x: hidden;list-style-type: none;border: 1px solid #DCDFE6;padding: 10px;">
                  <li style="color:red">最近执行时间：</li>
                  <li v-for="(item,index) in addTask.validCron" :key="index">{{item}}</li>
                </div>
                
              </el-form-item>
              <el-form-item prop="taskMethond" label="执行方法">
                <el-input v-model="addTask.taskMethond" clearable placeholder="执行方法" :disabled="true"></el-input>
              </el-form-item>

              <el-form-item  label="任务状态">
                <el-radio-group v-model="addTask.status" >
                  <el-radio :label="0">暂停</el-radio>
                  <el-radio :label="1">有效</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item  label="任务描述">
                <el-input v-model="addTask.detail" clearable placeholder="请输入任务描述"></el-input>
              </el-form-item>
              
            </el-form>
          </div>
          <div class="foot">
            
            <el-button type="primary" size="mini" @click="closeAddTask()">取消</el-button>
            <el-button type="primary" size="mini" @click="submitTask()" v-if="status.addStatus"> 确定</el-button>
            <el-button type="primary" size="mini" @click="updateTask()" v-if="status.editStatus">更新</el-button>
            <el-button type="primary" size="mini" @click="ValidCronClick">Cron检测</el-button>
          </div>
        </div>
      </add-task>
    </div>
  </div>
</template>

<script>
import { cron } from "vue-cron";
import { getCasePlan ,
addTimedTask,
ValidCron,
GetTimedTask,
RemoveTimedTask,
UpdateTimedTask
} from "../../axios/api.js";
import validator from "@/libs/validate.js";
import storage from "@/libs/storage.js";
import { Message } from 'element-ui';
// import jsMethods from "@/libs/myJs.js";
export default {
  components: {
    cron,
    "page-box": () => import("../public/page.vue"),
    "add-task": () => import("../public/MessageBox.vue"),
  },
  data() {
    return {
      status:{
        editStatus:false,
        addStatus:true
      },
      pageMethods:this.page,
      addTask: {
        index:null, //编辑时候的索引
        item:{},
        validCronStatus:false,
        validCron:[

        ],
        styleCode: "width:500px;height:750px",
        taskStatus: false,

        taskName: null, //任务名称
        Plan: null, //所属计划
        cron: null, //crom表达式
        taskMethond: "case.tasks.timedTask", //执行定时任务的方法--目前后台只有一个是固定写死的。。后续在调整
        status: 1, //定时任务是否有效  0  暂停   1有效
        detail: null, //任务描述
      },
      search: {
        celeryTask: null,
        createName: null,
        planName: null,
      },
      planList: [],
      taskList: [
       
      ],
      cronPopover: false,
      cron: "",
      rules: {
        taskName: [{ required: true, message: "请输入任务名称", trigger: "blur" }],
        Plan: [{ required: true, message: "输入计划名称", trigger: "change" }],
        cron: [{ required: true, message: "请输入五位Cron表达式:* * * * *", trigger: "blur" }],
      },
    };
  },
  methods: {



    //移除二次确认
    deleteTwo() {
        
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        })
            .then(() => {
                console.log(arguments)
                // console.log(func)
                arguments[0](arguments[1])
                // this.$message({
                //   type: "success",
                //   message: "删除成功!"
                // });
            })
            .catch(() => {
                this.$message({
                    type: "info",
                    message: "已取消删除"
                });
            });
    },
    //删除
    TaskRemove(item){
      var page=this.$refs.pageBox.currentPage
      console.log(this.taskList.length)
      console.log(page)
      if (this.taskList.length === 1 && page !== 1) {
        page = page - 1;
        this.$refs.pageBox.currentPage = page;
      }
      console.log(item)
      RemoveTimedTask({
        page:this.$refs.pageBox.currentPage,
        pageSize:this.$refs.pageBox.pageSize,
        id:item.id,
        projectId:storage.get("projectId")
      }).then(res=>{
        if(res.status===200){
          this.taskList = res.results;
          this.$refs.pageBox.total = res.total;
          this.$refs.pageBox.allPage = res.allPage;
          Message.success(res.msg)
        }
      })
    },
    //分页
    page(page=1,pageSize=10){
      GetTimedTask({
        projectId:storage.get("projectId"),
        taskName:this.search.taskName,
        casePlanId:this.search.planName,
        userId:this.search.createName,
        page:page,
        pageSize:pageSize,
      }).then(res=>{
        if(res.status===200){
          this.taskList = res.results;
          this.$refs.pageBox.total = res.total;
          this.$refs.pageBox.allPage = res.allPage;
        }
      })
    },
    //cron表达式校验
    ValidCronClick(){
      console.log(this.addTask.cron)
      ValidCron({
        cron:this.addTask.cron
      }).then(res=>{
        if(res.status===200 && res.results.status===1 ){
          this.addTask.validCronStatus=true
          this.addTask.validCron=res.results.data
        }else{
          this.addTask.validCronStatus=false
          this.addTask.validCron=[]
          Message.error(res.results.info)
        }
      })
    },

    clearAddTask(){
      this.addTask.taskStatus=null,
      this.addTask.taskName=null,
      this.addTask.cron=null,
      this.addTask.Plan=null,
      // this.addTask.status=null,  //任务状态是默认的
      this.addTask.detail=null
      this.addTask.validCronStatus=false
      this.addTask.validCron=[]
    },
    changeCron(val) {
      this.cron = val;
    },
    closeAddTask(){  //关闭新增弹窗
      this.addTask.taskStatus = false;
      this.clearAddTask()
    },
    clickTimedTask() {
      this.status.addStatus=true
      this.status.editStatus=false
      this.getCasePlan_M();
      this.addTask.taskStatus = true;
    },
    //计划列表
    getCasePlan_M() {
      getCasePlan({
        projectId: storage.get("projectId"),
      }).then((res) => {
        if (res.status === 200) {
          this.planList = res.results;
        }
      });
    },
    clickEdit(index,item){
      console.log(item)
      this.getCasePlan_M();
      this.status.addStatus=false;
      this.status.editStatus=true
      this.addTask.taskStatus = true;
      this.addTask.taskName=item.taskName;
      this.addTask.cron=item.cron;
      this.addTask.Plan=item.plan.id;
      this.addTask.status=item.status.id;  //任务状态是默认的
      this.addTask.detail=item.detail;
      this.addTask.item=item;
      this.addTask.index=index;
    },
    TaskStop(index,item){
      var itemCode=null
      item.status.id?itemCode=0:itemCode=1
      UpdateTimedTask({
        id:item.id,
        status:itemCode,
        cron:item.cron,
        Plan:item.plan.id,
      }).then(res=>{
        if(res.status===200){
          this.taskList.splice(index,1,res.results)
          Message.success(res.msg)
        }
      })
    },
    updateTask(){
      console.log(this.addTask.item)
      console.log(this.addTask.item.id)
      UpdateTimedTask({
        id:this.addTask.item.id,
        // userId:storage.get("userId"),
        cron:this.addTask.cron,
        taskName:this.addTask.taskName,
        Plan:this.addTask.Plan,
        status:this.addTask.status,
        detail:this.addTask.detail,
      }).then(res=>{
        if(res.status===200){
          this.clearAddTask()
          this.taskList.splice(this.addTask.index,1,res.results)
          Message.success(res.msg)
        }
      })
    },
    searchTask(){
      GetTimedTask({
        page:1,
        pageSize:this.$refs.pageBox.pageSize,
        projectId:storage.get("projectId"),
        taskName:this.search.taskName,
        casePlanId:this.search.planName,
        userId:this.search.createName
      }).then(res=>{
        if(res.status===200){
          this.taskList = res.results;
          this.$refs.pageBox.total = res.total;
          this.$refs.pageBox.allPage = res.allPage;
        }
      })
    },
    submitTask(){
      
      addTimedTask({
        Plan:this.addTask.Plan,
        projectId:storage.get("projectId"),
        userId:storage.get("userId"),
        cron:this.addTask.cron,
        taskName:this.addTask.taskName,
        status:this.addTask.status,
        detail:this.addTask.detail,
        page:this.$refs.pageBox.currentPage,
        pageSize:this.$refs.pageBox.pageSize
      }).then(res=>{
        if(res.status===200){
          this.taskList = res.results;
          this.$refs.pageBox.total = res.total;
          this.$refs.pageBox.allPage = res.allPage;
          this.clearAddTask()
          Message.success(res.msg)
        }
      })
    },
  },
  mounted(){
    this.page()
  },
  watch: {
    $route: {
      handler: function (newValue, oldValue) {
        console.log("路由变化", newValue, oldValue);
        if (newValue !== oldValue) {
          console.log("1111");
        }
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.timedTask {
  .task {
    overflow-x: hidden;
    position: absolute;
    margin: 10px;
    right: 0;
    left: 0;
    top: 0;
    // background: red;
    bottom: 0;
    .head {
      text-align: left;
    }
  }
  .search .el-form-item {
    display: inline-block;
    margin-right: 10px;
  }
  .bod {
    overflow-x: hidden;
    height: 720px;
    margin-top: 10px;
  }
  .foot {
    margin-top: 30px;
  }
  .addTask {
    .body {
      margin: 10px;
    }
    .el-select{
      width: 100%;
    }
    .el-form-item {
      text-align: left
    }
   .foot{
     position: absolute;
     bottom: 20px;
     right: 0px;
     left: 0px;
   }
  }
}
</style>
<style >
.search .el-form-item .el-form-item__label {
  color: #666 !important;
}
</style>