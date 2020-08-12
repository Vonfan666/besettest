<template>
  <div class="manageSql">
    <div class="header-t">
      <div class="search">
        <el-form ref="search" :model="search" label-width="100px">
          <el-form-item label="连接名">
            <el-input placeholder="请输入连接名" v-model="search.name" clearable size="mini"></el-input>
          </el-form-item>
 
          <el-form-item label="创建人：">
            <el-input placeholder="请输出创建人名称" v-model="search.userId" clearable size="mini"></el-input>
          </el-form-item>
          <el-button type="primary" size="mini" style="margin-left:10px" @click="searchBox_M()">搜索</el-button>
          <el-button type="primary" size="mini" @click="clickAddSql()">新增数据库</el-button>
        </el-form>
      </div>
    </div>
    <div class="sql">
      <div class="body" v-loading="status.loading_box">
        <el-table :data="addSql.sqlBoxList" border style="width: 100%" size="mini">
          <el-table-column prop="name" label="连接名" width="150"></el-table-column>
          <el-table-column prop="host" label="主机地址" width="250"></el-table-column>
          <el-table-column prop="database" label="数据库名称" width="150"></el-table-column>
          <el-table-column prop="type.name" label="数据库类型" width="100"></el-table-column>
          <el-table-column prop="userName" label="用户名" width="150"></el-table-column>
          <el-table-column prop="userId.name" label="创建用户" width="100"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="160"></el-table-column>
          <el-table-column prop="detail" label="描述" fit></el-table-column>
          <el-table-column fixed="right" prop="detail" label="操作" width="130px" >
            <template slot-scope="scope">
              <el-button
          
                type="text"
                size="small"
                @click="clickEditSqlBox(scope.$index,scope.row)"
              >编辑</el-button>
              <el-button
                @click.native.prevent="deleteTwo(removeSqlBox_M,scope.row)"
                type="text"
                size="small"
              >移除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      
    </div>
    <div class="foot">
          <page-box ref="SqlpageBox"  :page_Methods="pageMethods"></page-box>
      </div>
    <add-sql v-slot:addSql :styleCode="addSql.styleCode" v-if="status.addSqlSatus">
      <div class="addSql">
        <div class="header">
          <h3 style="display:inline-block" class="title">添加数据库</h3>
          <span
            style="float:right;margin:10px;cursor: pointer;"
            class="el-icon-close"
            @click="closeAddSql()"
          ></span>
        </div>
        <div class="body">
          <el-form
            :model="sqlFrom"
            :rules="rules"
            ref="sqlFrom"
            label-width="100px"
            class="add-body"
            label-position="left"
          >
            <el-form-item label="变量名称" prop="name" size="mini">
              <el-input type="text" v-model="sqlFrom.name" clearable placeholder="请输入英文变量名称*唯一"></el-input>
            </el-form-item>
            <el-form-item label="数据库类型" prop="name" size="mini">
              <el-select type="text" v-model="sqlFrom.type" style="width: 100%;" disabled>
                <el-option
                  v-for="(item,index) in addSql.sqlType"
                  :key="index"
                  :value="item.id"
                  :label="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="数据库名称" prop="database" size="mini">
              <el-input type="text" v-model="sqlFrom.database" clearable placeholder="请输入数据库名称"></el-input>
            </el-form-item>
            <el-form-item label="主机地址" prop="host" size="mini">
              <el-input type="text" v-model="sqlFrom.host" clearable placeholder="请输入主机host地址"></el-input>
            </el-form-item>
            <el-form-item label="端口" prop="port" size="mini">
              <el-input type="text" v-model="sqlFrom.port" clearable placeholder="请输入端口号"></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="userName" size="mini">
              <el-input type="text" v-model="sqlFrom.userName" clearable placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="passWord" size="mini">
              <el-input type="text" v-model="sqlFrom.passWord" clearable placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="描述"  size="mini">
              <el-input type="text" v-model="sqlFrom.detail" clearable placeholder="简要描述"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="foot">
          <el-button type="primary" size="mini" @click="closeAddTask()">连接测试</el-button>
          <el-button type="primary" size="mini" @click="submitSqlBox_M()" v-if="status.addSqlOkStatus">确定</el-button>
          <el-button type="primary" size="mini" @click="updateSqlBox_M()" v-if="status.updateStatus">更新</el-button>
        </div>
      </div>
    </add-sql>
 
  </div>
</template>

<script>
import {
  addSqlBox,
  addSqlStatement,
  GetSqlBox,
  removeSqlBox,
  updateSqlBox
} from  "../../axios/api"
import { Message } from 'element-ui';
import storage from '../../libs/storage';
export default {
  components: {
    "page-box": () => import("../public/page.vue"),
    "add-sql": () => import("../public/MessageBox.vue"),
    "write-sql": () => import("../public/MessageBox.vue"),
    "page-box": () => import("../public/page.vue"),
  },
  data() {
    return {
      pageMethods:this.GetSqlBox_M,  //分页
      status: {
        addSqlSatus: false,
        loading_box:true,
        addSqlOkStatus:true,
        updateStatus:false,
        updateIndex:null, //更新时候存的index
        updateId:null,   //更新时临时存储id
      },

      search:{
        name:null,
        sqlBoxId:null,
        userId:null,
      },
      addSql: {
        styleCode: "width:500px;height:520px",
        sqlType: [{ id: 1, name: "mysql" }],
        sqlBoxList: [
        ],
      },
      sqlFrom: {
        name: null,
        type: 1,
        host: null,
        port: null,
        userName: null,
        passWord: null,
        database:null,
        detail:null,
      },

      rules: {
        name: [{ required: true, message: "请输入连接名", trigger: "blur" }],
        type: [
          { required: true, message: "请选择数据库类型", trigger: "change" },
        ],
        host: [{ required: true, message: "请输入主机地址", trigger: "blur" }],
        port: [{ required: true, message: "请输入端口", trigger: "blur" }],
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        database: [
          { required: true, message: "请输入数据库名称", trigger: "blur" },
        ],
        passWord: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    clickAddSql() {
      this.status.addSqlSatus = true;
      this.status.addSqlOkStatus=true,
      this.status.updateStatus = false
      self.closeAddSql()
    },

    closeAddSql() {
      this.status.addSqlSatus = false;
      this.sqlFrom.name= null;
      this.sqlFrom.type= 1;
      this.sqlFrom.host= null;
      this.sqlFrom.port= null;
      this.sqlFrom.userName= null;
      this.sqlFrom.passWord= null;
      this.sqlFrom.database= null;
      this.sqlFrom.detail= null;
    },
    clickEditSqlBox(index,item){
      // 点击首先打开弹窗
      this.status.addSqlSatus = true;
      // 将确定按钮换成更新按钮
      this.status.updateStatus = true
      this.status.addSqlOkStatus=false,
      // 首先填充编辑表单数据
      this.sqlFrom.name= item.name;
      this.sqlFrom.type= 1;
      this.sqlFrom.host= item.host;
      this.sqlFrom.port= item.port;
      this.sqlFrom.userName= item.userId.name;
      this.sqlFrom.database= item.database;
      this.sqlFrom.passWord= item.passWord;
      this.sqlFrom.detail= item.detail;
      // 临时存储index
      this.status.updateIndex=index
      this.status.updateId=item.id

    },
    getAddSql(){

    },
    submitSqlBox_M(){
      addSqlBox({
        s_name: this.search.name,
        s_userId: this.search.userId,
        name: this.sqlFrom.name,
        type: this.sqlFrom.type,
        host: this.sqlFrom.host,
        port: this.sqlFrom.port,
        database:this.sqlFrom.database,
        userName: this.sqlFrom.userName,
        passWord: this.sqlFrom.passWord,
        detail:this.sqlFrom.detail,
        userId:storage.get("userId"),
        projectId:storage.get("projectId"),
        page:this.$refs.SqlpageBox.currentPage,
        pageSize:this.$refs.SqlpageBox.pageSize,
      }).then(res=>{
        if(res.status===200){
          this.status.loading_box=false
          this.addSql.sqlBoxList=res.results
          this.$refs.SqlpageBox.total = res.total;
          this.$refs.SqlpageBox.allPage = res.allPage;
          this.closeAddSql()
          Message.success(res.msg)
        }
      })
    },
    
    GetSqlBox_M(page=1,pageSize=10){
      GetSqlBox({
        name: this.search.name,
        userId: this.search.userId,
        projectId: storage.get("projectId"),
        page:page,
        pageSize:pageSize,
      }).then(res=>{
        if(res.status===200){
          this.status.loading_box=false
          this.addSql.sqlBoxList=res.results
          this.$refs.SqlpageBox.total = res.total;
          this.$refs.SqlpageBox.allPage = res.allPage;

        }
      })
    },
    searchBox_M(){
      
      GetSqlBox({
        name: this.search.name,
        userId: this.search.userId,
        projectId: storage.get("projectId"),
        page:1,
        pageSize:this.$refs.SqlpageBox.pageSize,
      }).then(res=>{
        if(res.status===200){
          this.status.loading_box=false
          this.addSql.sqlBoxList=res.results
          this.$refs.SqlpageBox.total = res.total;
          this.$refs.SqlpageBox.allPage = res.allPage;

        }
      })
    },
    updateSqlBox_M(){
      updateSqlBox({
        id:this.status.updateId,  
        name: this.sqlFrom.name,
        type: this.sqlFrom.type,
        host: this.sqlFrom.host,
        port: this.sqlFrom.port,
        database: this.sqlFrom.database,
        userName: this.sqlFrom.userName,
        passWord: this.sqlFrom.passWord,
        detail:this.sqlFrom.detail,
      }).then(res=>{
        if (res.status===200){
          this.addSql.sqlBoxList.splice(this.status.updateIndex,1,res.results)
          // 关闭弹窗
          this.status.addSqlSatus=false
          //清除临时index
          this.status.updateIndex=null,
          Message.success(res.msg)
        }
      })
    },
    removeSqlBox_M(item){
      var page=this.$refs.SqlpageBox.currentPage
      if (this.addSql.sqlBoxList.length === 1 && page !== 1) {
        page = page - 1;
        this.$refs.SqlpageBox.currentPage = page;
      }
      removeSqlBox({
        name: this.search.name,
        userId: this.search.userId,
        id:item.id,
        projectId:storage.get("projectId"),
        page:page,
        pageSize:this.$refs.SqlpageBox.pageSize,
      }).then(res=>{
        if(res.status===200){
          this.status.loading_box=false
          this.addSql.sqlBoxList=res.results
          this.$refs.SqlpageBox.total = res.total;
          this.$refs.SqlpageBox.allPage = res.allPage;
          Message.success(res.msg)
        }
      })
    },
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
  },
  mounted() {
    this.GetSqlBox_M();
  }
};
</script>

<style  lang="scss" scoped>
.header-t {
  text-align: left;
  // margin-top: 10px;
}
.manageSql {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  // overflow: hidden;
    .search{
        margin:10px 0 10px  ;
    
    }
    .search .el-form-item{
      display: inline-block;
      margin-right: 10px;  
   
  }
}

.manageSql .sql{
  margin: 0 10px ;
  text-align: left;
  overflow-x: hidden;
   flex: 1;
}

// .sql .body{
//     margin-top: 20px;

//     height: 270px;
// }   

.addSql .body 
{
  margin: 0 20px ;
  
}
.addSql .foot {
  margin-top: 40px;
}

</style>>

<style >
.manageSql .header-t .search .el-form-item .el-form-item__label {
  color: #666 !important;
}
</style>