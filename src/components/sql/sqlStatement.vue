<template>
  <div class="manageSql">
    <div class="header-t">
      <div class="search">
        <el-form ref="search" :model="search" label-width="100px">
          <el-form-item label="任务名称：">
            <el-input placeholder="请输入任务名称" v-model="search.name" clearable size="mini"></el-input>
          </el-form-item>
          <!-- <el-form-item label="计划名称：">
            <el-input placeholder="请输入计划名称" v-model="search.sqlBoxId" clearable size="mini"></el-input>
          </el-form-item>-->
          <el-form-item label="创建人：">
            <el-input placeholder="请输出创建人名称" v-model="search.userId" clearable size="mini"></el-input>
          </el-form-item>
          <el-button type="primary" size="mini" style="margin-left:10px" @click="search_M()">搜索</el-button>
          <el-button type="primary" size="mini" @click="clickAddSql()">新增SQL</el-button>
        </el-form>
      </div>
    </div>
    <div class="w_sql">
      <div class="body">
        <el-table :data="writeSqlBox.sqlList" border style="width: 100%" size="mini">
          <el-table-column prop="name" label="变量名称" width="150"></el-table-column>
          <el-table-column prop="BoxId.name" label="所属数据库" width="150"></el-table-column>
          <el-table-column prop="type.name" label="操作类型" width="150"></el-table-column>
          <el-table-column prop="userId.name" label="创建用户" width="150"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="160"></el-table-column>
          <el-table-column prop="detail" label="描述" fit></el-table-column>
          <el-table-column fixed="right" prop="detail" label="操作" min-width="130px" fit>
            <template slot-scope="scope">
              <!-- <el-button
                @click.native.prevent="clickEdit(scope.$index, scope.row)"
                type="text"
                size="small"
              >执行SQL</el-button>-->
              <el-button @click="clickEdit(scope.$index, scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="deleteTwo(remove_M,scope.row)" type="text" size="small">移除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="foot">
      <page-box ref="pageBox" :page_Methods="pageMethods"></page-box>
    </div>
    <write-sql v-slot:writeSql :styleCode="writeSqlBox.styleCode" v-if="status.writeSqlSatus">
      <div class="writeSql">
        <div class="header">
          <h3 style="display:inline-block" class="title">添加SQL</h3>
          <span
            style="float:right;margin:10px;cursor: pointer;"
            class="el-icon-close"
            @click="closeAddSql()"
          ></span>
        </div>
        <div class="body">
          <el-form
            :model="writeSql"
            :rules="rules"
            ref="writeSql"
            label-width="100px"
            class="add-body"
            label-position="left"
          >
            <el-form-item label="SQL变量名" prop="name" size="mini">
              <el-input type="text" v-model="writeSql.name" clearable placeholder="请输入英文变量名"></el-input>
            </el-form-item>
            <el-form-item label="数据库" prop="BoxId" size="mini">
              <el-select type="text" v-model="writeSql.BoxId" style="width: 100%;">
                <el-option
                  v-for="(item,index) in writeSqlBox.sqlBoxList"
                  :key="index"
                  :value="item.id"
                  :label="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="类型" prop="type" size="mini">
              <el-select type="text" v-model="writeSql.type" style="width: 100%;">
                <el-option
                  v-for="(item,index) in writeSqlBox.sqlType"
                  :key="index"
                  :value="item.id"
                  :label="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="SQL语句" prop="sql" size="mini">
              <el-input
                type="textarea"
                v-model="writeSql.sql"
                clearable
                :autosize="{ minRows: 4, maxRows: 4}"
                resize="none"
                placeholder="只允许写一条sql,暂不支持同时执行多条"
              ></el-input>
            </el-form-item>
            <el-form-item label="执行结果" size="mini" v-if="status.validStatus">
              <!-- <el-input
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 4}"
                resize="none"
                readonly
                v-model="writeSql.SqlRunResults"
                clearable
                placeholder="[(1,2,3),(4,5,6)]"
                
              ></el-input> -->
              <div class="SqlRunResults">
                <li v-for="(item,index) in writeSql.SqlRunResults" :key="index">{{item}}</li>
              </div>
            </el-form-item>
            <el-form-item label="后置处理" size="mini" >
              <el-input
                
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 4}"
                resize="none"
                v-model="writeSql.SqlActionResults"
                clearable
                :placeholder="resultsAction"
              ></el-input>
            </el-form-item>
             <el-form-item label="处理结果" size="mini"  v-if="status.validStatus">
              <el-input
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 4}"
                resize="none"
                readonly
                v-model="writeSql.actionResults"
                clearable
                placeholder="展示处理后的结果"
                ></el-input>
                <!-- <div class="SqlRunResults">
                  <li v-for="(item,index) in writeSql.actionResults" :key="index">{{item}}</li>
                </div> -->
            </el-form-item>
            <el-form-item label="描述" size="mini">
              <el-input type="text" v-model="writeSql.detail" clearable placeholder="简要描述"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="foot">
          <el-button type="primary" size="mini" @click="ValidSql_M()">执行SQL</el-button>
          <el-button type="primary" size="mini" @click="addSql_M()" v-if="status.addStatus">确定</el-button>
          <el-button type="primary" size="mini" @click="update_M()" v-if="status.updateStatus">更新</el-button>
        </div>
      </div>
    </write-sql>
  </div>
</template>

<script>
import {
  GetBoxOrSqlType,
  AddSql,
  GetSql,
  UpdateSql,
  RemoveSql,
  ValidSql
} from "../../axios/api";
import { Message } from "element-ui";
import storage from "../../libs/storage";

export default {
  components: {
    "page-box": () => import("../public/page.vue"),
    "add-sql": () => import("../public/MessageBox.vue"),
    "write-sql": () => import("../public/MessageBox.vue"),
    "page-box": () => import("../public/page.vue"),
  },
  data() {
    return {
      pageMethods: this.getSql_M,
      resultsAction:
        "如果执行结果为:[(1,2,3),(4,5,6)]\nres[0][0]取出值为1\nc=res[0],c[0]同样取值也是1,这种用逗号分割\n支持python列表操作",
      status: {
        writeSqlSatus: false,
        addStatus: false,
        updateStatus: false,
        validStatus:false,
      },
      writeSqlBox: {
        styleCode: "width:40%;height:70%",
        sqlList: [
          //sql语句列表
        ],
        sqlBoxList: [], //新增时的数据库列表
        sqlType: [], //sql类型列表
        editIndex: null,
        editId: null,
      },

      writeSql: {
        name: null,
        BoxId: null,
        type: null,
        sql: null,
        SqlRunResults: null,
        SqlActionResults: null,
        actionResults:null,
        detail: null,
      },
      search: {
        name: null,
        sqlBoxId: null,
        userId: null,
      },
      rules: {
        name: [{ required: true, message: "请输入变量名称", trigger: "blur" }],
        BoxId: [{ required: true, message: "请选择数据库", trigger: "change" }],
        type: [{ required: true, message: "请选择SQL类型", trigger: "change" }],
        sql: [{ required: true, message: "请输入端口", trigger: "blur" }],
      },
    };
  },
  methods: {
    openAddSql() {
      this.status.writeSqlSatus = true;
      this.status.addStatus = true; //显示确定按钮
      this.status.updateStatus = false; //关闭更新按钮
    },

    closeAddSql() {
      this.status.writeSqlSatus = false;
      this.status.validStatus = false;
      this.writeSql.name = null;
      this.writeSql.BoxId = null;
      this.writeSql.type = null;
      this.writeSql.sql = null;
      this.writeSql.SqlRunResults = null;
      this.writeSql.SqlActionResults = null;
      this.writeSql.detail = null;
    },
    clickEdit(index, item) {
      this.GetBoxOrSqlType_M();
      this.status.writeSqlSatus = true;

      this.status.addStatus = false; //关闭确定按钮
      this.status.updateStatus = true; //显示更新按钮
      //先将index和id临时存储起来
      this.writeSqlBox.editIndex = index;
      this.writeSqlBox.editId = item.id;
      //赋值给writeSql下
      this.writeSql.name = item.name;
      this.writeSql.BoxId = item.BoxId.id;
      this.writeSql.type = item.type.id;
      this.writeSql.sql = item.sql;
      this.writeSql.SqlRunResults = item.SqlRunResults;
      this.writeSql.SqlActionResults = item.SqlActionResults;
      this.writeSql.detail = item.detail;
    },
    clickAddSql() {
      this.openAddSql(); //打开弹窗
      //请求数据库和类型数据
      this.GetBoxOrSqlType_M();
    },
    GetBoxOrSqlType_M() {
      //查询库和请求类型
      GetBoxOrSqlType({
        projectId: storage.get("projectId"),
      }).then((res) => {
        if (res.status === 200) {
          this.writeSqlBox.sqlBoxList = res.results.sqlBoxList;
          this.writeSqlBox.sqlType = res.results.sqlType;
        }
      });
    },
    getSql_M(page = 1, pageSize = 10) {
      GetSql({
        s_name: this.search.name,
        s_userId: this.search.userId,
        projectId: storage.get("projectId"),
        page: page,
        pageSize: pageSize,
      }).then((res) => {
        if (res.status === 200) {
          this.$refs.pageBox.allPage = res.all_page;
          this.$refs.pageBox.total = res.total;
          this.writeSqlBox.sqlList = res.results;
        }
      });
    },
    search_M() {
      GetSql({
        s_name: this.search.name,
        s_userId: this.search.userId,
        projectId: storage.get("projectId"),
        page: 1,
        pageSize: this.$refs.pageBox.pageSize,
      }).then((res) => {
        if (res.status === 200) {
          this.$refs.pageBox.allPage = res.all_page;
          this.$refs.pageBox.total = res.total;
          this.writeSqlBox.sqlList = res.results;
        }
      });
    },
    update_M() {
      UpdateSql({
        s_name: this.search.name,
        s_userId: this.search.userId,
        id: this.writeSqlBox.editId,
        name: this.writeSql.name,
        BoxId: this.writeSql.BoxId,
        SqlActionResults:this.writeSql.SqlActionResults,
        type: this.writeSql.type,
        sql: this.writeSql.sql,
        detail: this.writeSql.detail,
      }).then((res) => {
        if (res.status === 200) {
          this.writeSqlBox.sqlList.splice(
            this.writeSqlBox.editIndex,
            1,
            res.results
          );
          this.closeAddSql();
          Message.success(res.msg);
        }
      });
    },

    remove_M(item) {
      var page = this.$refs.pageBox.currentPage;
      if (this.writeSqlBox.sqlList.length === 1 && page !== 1) {
        page = page - 1;
        this.$refs.pageBox.currentPage = page;
      }
      RemoveSql({
        s_name: this.search.name,
        s_userId: this.search.userId,
        id: item.id,
        projectId: storage.get("projectId"),
        page: page,
        pageSize: this.$refs.pageBox.pageSize,
      }).then((res) => {
        if (res.status === 200) {
          this.writeSqlBox.sqlList = res.results;
          this.$refs.pageBox.total = res.total;
          this.$refs.pageBox.allPage = res.allPage;
          Message.success(res.msg)
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
          // console.log(func)
          arguments[0](arguments[1]);
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
    ValidSql_M() {
      //新增SQL时校验sql结果
      ValidSql({
        name: this.writeSql.name,
        BoxId: this.writeSql.BoxId,
        SqlActionResults:this.writeSql.SqlActionResults,
        type: this.writeSql.type,
        sql: this.writeSql.sql,
        detail: this.writeSql.detail,
      }).then(res=>{
        if(res.status===200){
            this.status.validStatus = true;

          this.writeSql.actionResults=res.results.res
          console.log(this.writeSql.actionResults)
          
          if (res.results.code===1){
            this.writeSql.SqlRunResults=res.results.data
            
          }else{
            this.writeSql.SqlRunResults=res.results.msg
          }
          
          Message.success(res.msg)
        }
      })
    },
    addSql_M() {
      //提交新增请求
      AddSql({
        s_name: this.search.name,
        s_userId: this.search.userId,
        name: this.writeSql.name,
        BoxId: this.writeSql.BoxId,
        type: this.writeSql.type,
        sql: this.writeSql.port,
        SqlActionResults:this.writeSql.SqlActionResults,
        detail: this.writeSql.detail,
        userId: storage.get("userId"),
        projectId: storage.get("projectId"),
        page: this.$refs.pageBox.currentPage,
        pageSize: this.$refs.pageBox.pageSize,
      }).then((res) => {
        if (res.status === 200) {
          this.$refs.pageBox.allPage = res.all_page;
          this.$refs.pageBox.total = res.total;
          this.writeSqlBox.sqlList = res.results;
          this.closeAddSql();
          Message.success(res.msg);
        }
      });
    },
  },
  mounted() {
    this.getSql_M();
  },
};
</script>

<style  lang="scss" scoped>
.header-t {
  text-align: left;
}
.manageSql {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  //   overflow: hidden;
  .search {
    margin: 10px 0 10px;
  }
  .search .el-form-item {
    display: inline-block;
    margin-right: 10px;
  }
}

.w_sql {
  flex: 1;
  overflow-x: hidden;
}

.manageSql .w_sql {
  margin: 0 10px;
  text-align: left;
}
.writeSql {
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
}
.writeSql .body {
  margin: 0 20px;
  flex: 1;
  //   min-height: 450px;
  overflow-x: hidden;
}
.writeSql .foot {
  margin: 20px 0;
}
.writeSql .SqlRunResults{
  color: red;
  // list-style-type: none;
  font-size: 10px;
  // overflow-x: hidden;
  height: 120px;
  width: 100%;
  text-align: left;
  border:1px solid #DCDFE6 ;
  border-radius: 4px;
  // font-size: inherit;
  
  overflow: auto;
  word-break:keep-all;      /* 不换行 */
   white-space:nowrap;
  li{
    display: block;
    margin:0 30px 0px  10px;
  }
}

</style>>
<style >
.manageSql .header-t .search .el-form-item .el-form-item__label {
  color: #666 !important;
}
</style>
