<template>
  <div class="runCase">
    <div class="runCase_context">
      <div class="run_title">
        <el-button
          type="primary"
          size="small"
          class="el-icon-plus"
          @click="createCasePlanStatus=true"
        >新建测试计划</el-button>
      </div>
      <div class="run_body">
        <el-table
          :data="tableData"
          style="width: 100%"
          max-height="250"
          border
          :header-cell-style="textStyle"
          :cell-style="textStyle"
        >
          <el-table-column prop="id" label="Id" width="50"></el-table-column>
          <el-table-column prop="name" label="名称" width="150"></el-table-column>
          <el-table-column prop="cname" label="中文名称" width="160"></el-table-column>
          <el-table-column prop="caseStartTime" label="执行开始时间" width="160"></el-table-column>
          <el-table-column prop="status" label="状态" width="150"></el-table-column>
          <el-table-column prop="caseEndTime" label="执行完成时间" width="160"></el-table-column>
          <el-table-column prop="CaseCount" label="用例数量" width="100"></el-table-column>
          <el-table-column prop="user" label="创建人" width="150"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="160"></el-table-column>
          <el-table-column prop="detail" label="备注" width="160"></el-table-column>
          <el-table-column fixed="right" label="操作" width="230" height="50">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
              <el-button type="text" size="small">删除</el-button>
              <el-button type="text" size="small">执行</el-button>
              <el-button type="text" size="small">结果</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div v-if="createCasePlanStatus">
      <createCasePlan :styleCode="createCasePlanStyle" v-slot:createCasePlan>
        <div class="ccp">
          <div class="ccp-title">
            <h3>创建计划</h3>
          </div>
          <div class="ccp-body">
            <el-form :model="datas" :rules="rules" label-width="80px" ref="refFrom" >
              <el-form-item prop="name" label="计划名称">
                <el-input v-model="datas.name" clearable placeholder="计划名称"></el-input>
              </el-form-item>
              <el-form-item prop="cname" label="英文名称">
                <el-input v-model="datas.cname" placeholder="输入自动生成的脚本名称" clearable></el-input>
              </el-form-item>
              <el-form-item prop="runType" label="开始时间">
                <el-radio-group v-model="datas.runType">
                  <el-radio :label="1">手动执行</el-radio>
                  <el-radio :label="2">定时执行(待扩展)</el-radio>
                  <el-radio :label="3" disabled>轮询(待扩展)</el-radio>
                </el-radio-group>
                <el-date-picker
                  v-model="datas.caseStartTime"
                  type="datetime"
                  placeholder="选择日期时间"
                  v-if="datas.runType==2"
                ></el-date-picker>
              </el-form-item>
              <el-form-item prop="code" label="计划描述">
                <el-input v-model="datas.detail" placeholder="请输入计划描述" clearable></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="ccp-foot">
            <el-button type="primary" size="small" @click="close()">取消</el-button>
            <el-button type="primary" size="small" @click="create()">创建</el-button>
          </div>
        </div>
      </createCasePlan>
    </div>
  </div>
</template>
    
<script>
import validator from "@/libs/validate.js";

export default {
  components: {
    createCasePlan: () => import("../public/MessageBox.vue")
  },
  data() {
    return {
      datas: {
        name: null, //计划名称
        cname: null, //计划英文名--自动化脚本名称
        runType: 1, //执行列表-立即执行  定时执行   轮询
        detail: null,
        caseStartTime: "" //计划开始时间
      },
      rules: {
        name: [{ required: true, message: "输入计划名", trigger: "blur" }],
        cname: [
          { required: true, message: "输入英文名", trigger: "blur" },
          { validator: validator.caseCname, trigger: "blur" }
        ],
        runType: [
          { required: true, message: "请选择执行方式", trigger: "change" }
        ]
      },
      createCasePlanStyle: "height:700px;width:500px",
      createCasePlanStatus: true,
      tableData: [
        {
          id: "1",
          name: "TestCase",
          cname: "慧投1.01版接口",
          caseStartTime: "立即执行",
          status: "未执行",
          caseEndTime: "-",
          CaseCount: "888",
          user: "冯凡",
          createTime: "2020-06-09 16:49:55",
          detail: "不要删除不要删除不要删除"
        }
      ]
    };
  },
  methods: {
    handleClick() {},
    textStyle({ row, column, rowIndex, columnIndex }) {
      //tabl文字居中
      return "text-align:center";
    },
    close() {
      this.createCasePlanStatus = false;
      this.$refs.refFrom.resetFields();
      
    }
  }
};
</script>

<style lang="scss" scoped>
.runCase {
  width: 100%;
  height: 100%;
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
</style>

<style >
.TextCenter {
  text-align: center;
}
</style>