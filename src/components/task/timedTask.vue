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

            <el-button type="primary" size="mini">搜索</el-button>
            <el-button type="primary" size="mini">新建任务</el-button>
          </el-form>
        </div>
      </div>
      <div class="bod">
        <el-table :data="taskList" border style="width: 100%">
          <el-table-column prop="celeryTask" label="任务名称" width="150"></el-table-column>
          <el-table-column prop="planName" label="计划名称" width="150"></el-table-column>
          <el-table-column prop="status" label="状态" width="150"></el-table-column>
          <el-table-column prop="cronTime" label="cron表达式" width="150"></el-table-column>
          <el-table-column prop="user" label="创建用户" width="150"></el-table-column>
          <el-table-column prop="lastTime" label="最近执行时间" width="150"></el-table-column>
          <el-table-column prop="lastStatus" label="最近执行结果" width="150"></el-table-column>
          <el-table-column prop="detail" label="描述" fit></el-table-column>
          <el-table-column fixed="right" prop="detail" label="操作" width="150" min-width="130px">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, tableData)"
                type="text"
                size="small"
              >编辑</el-button>
              <el-button
                @click.native.prevent="deleteRow(scope.$index, tableData)"
                type="text"
                size="small"
              >暂停</el-button>
              <el-button
                @click.native.prevent="deleteRow(scope.$index, tableData)"
                type="text"
                size="small"
              >移除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="foot">
        
          <page-box></page-box>
      </div>
    </div>
  </div>
</template>

<script>
import { cron } from "vue-cron";
export default {
  components: {
    cron,
    "page-box": () => import("../public/page.vue"),
  },
  data() {
    return {
      search: {
        celeryTask: null,
        createName: null,
        planName: null,
      },
      taskList: [
        {
          celeryTask: null,
          planName: null,
          status: null, //暂停或者有效
          cronTime: null,
          user: null,
          lastTime: null, //最后一次执行时间
          lastStatus: null, //最后一次执行状态
          detail: null,
        },
        {
          celeryTask: null,
          planName: null,
          status: null, //暂停或者有效
          cronTime: null,
          user: null,
          lastTime: null, //最后一次执行时间
          lastStatus: null, //最后一次执行状态
          detail: null,
        },
        {
          celeryTask: null,
          planName: null,
          status: null, //暂停或者有效
          cronTime: null,
          user: null,
          lastTime: null, //最后一次执行时间
          lastStatus: null, //最后一次执行状态
          detail: null,
        },
        {
          celeryTask: null,
          planName: null,
          status: null, //暂停或者有效
          cronTime: null,
          user: null,
          lastTime: null, //最后一次执行时间
          lastStatus: null, //最后一次执行状态
          detail: null,
        },
        {
          celeryTask: null,
          planName: null,
          status: null, //暂停或者有效
          cronTime: null,
          user: null,
          lastTime: null, //最后一次执行时间
          lastStatus: null, //最后一次执行状态
          detail: null,
        },

      ],
      cronPopover: false,
      cron: "",
    };
  },
  methods: {
    changeCron(val) {
      this.cron = val;
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
  .bod{
    overflow-x: hidden;
    height: 720px;
  }
  .foot{
    margin-top: 30px;
  }
}
</style>
<style >
.search .el-form-item .el-form-item__label {
  color: #666 !important;
}
</style>