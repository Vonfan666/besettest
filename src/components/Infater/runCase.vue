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
          :data="tableData"
          style="width: 100%"
          max-height="700"
          border
          :header-cell-style="textStyle"
          :cell-style="textStyle"
        >
          <el-table-column prop="id" label="Id" width="50"></el-table-column>
          <el-table-column prop="name" label="名称" width="150"></el-table-column>
          <el-table-column prop="cname" label="中文名称" width="160"></el-table-column>
          <el-table-column prop="runType.name" label="执行方式" width="80"></el-table-column>
          <el-table-column prop="caseStartTime" label="执行开始时间" width="160"></el-table-column>
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
                @click="DeleteCasePlan(scope.row.id,scope.$index)"
              >删除</el-button>
              <el-button type="text" size="small">执行</el-button>
              <el-button type="text" size="small">结果</el-button>
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
                  <el-radio :label="1">定时执行(待扩展)</el-radio>
                  <el-radio :label="2" disabled>轮询(待扩展)</el-radio>
                </el-radio-group>
                <el-date-picker
                  v-model="datas.caseStartTime"
                  type="datetime"
                  placeholder="选择日期时间"
                  v-if="datas.runType==1"
                ></el-date-picker>
              </el-form-item>
              <el-form-item prop="code" label="计划描述">
                <el-input v-model="datas.detail" placeholder="请输入计划描述" clearable></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="ccp-foot">
            <el-button type="primary" size="small" @click="close()">取消</el-button>
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
  </div>
</template>
    
<script>
import validator from "@/libs/validate.js";
import storage from "@/libs/storage.js";
import { AddCasePlan, getCasePlan,UpdateCasePlan,DeleteCasePlan} from "../../axios/api.js";
import { Message } from "element-ui";
export default {
  components: {
    createCasePlan: () => import("../public/MessageBox.vue")
  },
  data() {
    return {
      buttonClickStatus:"true",
      total: null,  //数据总条数
      pageSize: 10, //每页显示的数量
      page: 1, //当前请求的页面
      allPage:null, //总页数
      datas: {
        name: null, //计划名称
        cname: null, //计划英文名--自动化脚本名称
        runType: 0, //执行列表-立即执行  定时执行   轮询
        detail: null,
        caseStartTime: "" //计划开始时间
      },
      //编辑暂存
      editPlanItem:"",
      editPlanIndex:"",
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
      ]
    };
  },
  methods: {
    inCaseListRouter(){
        this.$router.push({"name":"runCaseList"})
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
    close() {
        //清空表单
        this.createCasePlanStatus = false;
        this.datas.name=""
        this.datas.cname=""
        this.datas.runType=0
        this.datas.detail=""
    },
    casePlanAdd() {
      //添加计划
      this.$refs.refFrom1.validate(valid => {
        if (valid) {
          AddCasePlan({
            projectId: storage.get("projectId"),
            userId: storage.get("userId"),
            name: this.datas.name,
            cname: this.datas.cname,
            runType: this.datas.runType,
            detail: this.datas.detail,
            page:this.page,
            pageSize:this.pageSize,
          }).then(res => {
            res.status == 200
              ? (Message.success("新增成功"),
                this.allPage=res.allPage,
                this.total=res.total,
                this.createCasePlanStatus = false,
                this.tableData=res.results)   
              : null;
          });
        }else{
            return false
        }
      });
    },
    editPlan(item,index){
        //点击编辑按钮
        this.editPlanItem=item
        this.editPlanIndex=index
        console.log(item)
        this.datas.name=item.name
        this.datas.cname=item.cname
        this.datas.runType=item.runType.id
        //时间
        this.datas.detail=item.detail
        this.createCasePlanStatus=true
        

    },
    casePlanUpdate(){
        //点击编辑按钮直接更新
        var item=this.editPlanItem
        var index=this.editPlanIndex
        console.log("item",item,index)
        UpdateCasePlan({
            projectId:storage.get("projectId"),
            id:item.id,
            name:this.datas.name,
            cname:this.datas.cname,
            runType:this.datas.runType,
            detail:this.datas.detail
        }).then(res=>{
            res.status===200
            ?
            (
                this.tableData.splice(index,1,res.results),
                this.createCasePlanStatus=false,
                Message.success("更新成功")
            )
            :
            null
        })
    },
    DeleteCasePlan(id,index){
        //删除计划
        DeleteCasePlan({
            projectId:storage.get("projectId"),
            id:id,
            pageSize:this.pageSize,
            page:this.page
        }).then(res=>{
            res.status===200
            ?
            (Message.success(res.msg),
            this.tableData=res.results,
            this.total=res.total,
            this.allPage=res.allPage,
            (this.page>this.allPage
            ?
            (this.page=this.page-1,
            this.casePlanList(this.page,this.pageSize))
            :null)
            
            )
            :
            null
        })
    },
    casePlanList(page, pageSize) {
        //计划列表
      getCasePlan({
        projectId: storage.get("projectId"),
        page: page,
        pageSize: pageSize
      }).then(res => {
        res.status === 200
          ? ((this.tableData = res.results), (this.total = res.total),(this.allPage=res.allPage))
          : null;
      });
    }
  },
  mounted() {
    
    this.casePlanList(this.page, this.pageSize);
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