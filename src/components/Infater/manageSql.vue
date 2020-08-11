<template>
  <div class="manageSql">
    <div class="header-t">
      <el-button type="primary" size="mini" @click="clickAddSql()">新增数据库</el-button>
    </div>
    <div class="sql">
      <div class="body">
        <el-table :data="addSql.sqlBoxList" border style="width: 100%" size="mini">
          <el-table-column prop="name" label="连接名" width="150"></el-table-column>
          <el-table-column prop="host" label="主机地址" width="150"></el-table-column>
          <el-table-column prop="type.name" label="数据库类型" width="150"></el-table-column>
          <el-table-column prop="userId.name" label="创建用户" width="150"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="160"></el-table-column>
          <el-table-column prop="detail" label="描述" fit></el-table-column>
          <el-table-column fixed="right" prop="detail" label="操作" min-width="130px" fit>
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="clickEdit(scope.$index, scope.row)"
                type="text"
                size="small"
              >编辑</el-button>
              <el-button
                @click.native.prevent="deleteTwo(TaskRemove,scope.row)"
                type="text"
                size="small"
              >移除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="foot"></div>
    </div>
    <div class="header-t">
      <el-button type="primary" size="mini" @click="clickWriteSql()">新增SQL</el-button>
    </div>
    <div class="w_sql">
      <div class="body">
        <el-table :data="addSql.sqlBoxList" border style="width: 100%" size="mini">
          <el-table-column prop="name" label="名称" width="150"></el-table-column>
          <el-table-column prop="host" label="所属连接" width="150"></el-table-column>
          <el-table-column prop="type.name" label="数据库类型" width="150"></el-table-column>
          <el-table-column prop="userId.name" label="创建用户" width="150"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="160"></el-table-column>
          <el-table-column prop="detail" label="描述" fit></el-table-column>
          <el-table-column fixed="right" prop="detail" label="操作" min-width="130px" fit>
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="clickEdit(scope.$index, scope.row)"
                type="text"
                size="small"
              >编辑</el-button>
              <el-button
                @click.native.prevent="deleteTwo(TaskRemove,scope.row)"
                type="text"
                size="small"
              >移除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="foot"></div>
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
            <el-form-item label="链接名" prop="name" size="mini">
              <el-input type="text" v-model="sqlFrom.name" clearable></el-input>
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
            <el-form-item label="主机地址" prop="host" size="mini">
              <el-input type="text" v-model="sqlFrom.host" clearable></el-input>
            </el-form-item>
            <el-form-item label="端口" prop="port" size="mini">
              <el-input type="text" v-model="sqlFrom.port" clearable></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="userName" size="mini">
              <el-input type="text" v-model="sqlFrom.userName" clearable></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="passWord" size="mini">
              <el-input type="text" v-model="sqlFrom.passWord" clearable></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="foot">
          <el-button type="primary" size="mini" @click="closeAddTask()">连接测试</el-button>
          <el-button type="primary" size="mini" @click="submitTask()">确定</el-button>
        </div>
      </div>
    </add-sql>
    <write-sql v-slot:writeSql :styleCode="addSql.styleCode" v-if="status.writeSqlSatus">
      <div class="writeSql">
        <div class="header">
          <h3 style="display:inline-block" class="title">添加数据库</h3>
          <span
            style="float:right;margin:10px;cursor: pointer;"
            class="el-icon-close"
            @click="closeWriteSql()"
          ></span>
        </div>
        <div class="body">
          <el-form
            :model="writeSql"
            :rules="rules"
            ref="sqlFrom"
            label-width="100px"
            class="add-body"
            label-position="left"
          >
            <el-form-item label="SQL名称" prop="name" size="mini">
              <el-input type="text" v-model="sqlFrom.name" clearable></el-input>
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
            <el-form-item label="主机地址" prop="host" size="mini">
              <el-input type="text" v-model="sqlFrom.host" clearable></el-input>
            </el-form-item>
            <el-form-item label="端口" prop="port" size="mini">
              <el-input type="text" v-model="sqlFrom.port" clearable></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="userName" size="mini">
              <el-input type="text" v-model="sqlFrom.userName" clearable></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="passWord" size="mini">
              <el-input type="text" v-model="sqlFrom.passWord" clearable></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="foot">
          <el-button type="primary" size="mini" @click="closeAddTask()">连接测试</el-button>
          <el-button type="primary" size="mini" @click="submitTask()">确定</el-button>
        </div>
      </div>
    </write-sql>
  </div>
</template>

<script>
export default {
  components: {
    "page-box": () => import("../public/page.vue"),
    "add-sql": () => import("../public/MessageBox.vue"),
    "write-sql": () => import("../public/MessageBox.vue"),
  },
  data() {
    return {
      status: {
        addSqlSatus: false,
        writeSqlSatus: false
      },
      writeSql: {
        styleCode: "width:500px;height:450px",
        sqlList: [
          {
            name: "test",
          },
        ],
      },
      addSql: {
        styleCode: "width:500px;height:450px",
        sqlType: [{ id: 1, name: "mysql" }],
        sqlBoxList: [
          {
            name: "test",
            host: "192.169.0.0.1",
            type: { id: 1, name: "mysql" },
            userId: { id: 1, name: "冯凡" },
            createTime: "2020-20-20 10:10:01",
            detail: "没有",
          },
          {
            name: "test",
            host: "192.169.0.0.1",
            type: { id: 1, name: "mysql" },
            userId: { id: 1, name: "冯凡" },
            createTime: "2020-20-20 10:10:01",
            detail: "没有",
          },
          {
            name: "test",
            host: "192.169.0.0.1",
            type: { id: 1, name: "mysql" },
            userId: { id: 1, name: "冯凡" },
            createTime: "2020-20-20 10:10:01",
            detail: "没有",
          },
          {
            name: "test",
            host: "192.169.0.0.1",
            type: { id: 1, name: "mysql" },
            userId: { id: 1, name: "冯凡" },
            createTime: "2020-20-20 10:10:01",
            detail: "没有",
          },
          {
            name: "test",
            host: "192.169.0.0.1",
            type: { id: 1, name: "mysql" },
            userId: { id: 1, name: "冯凡" },
            createTime: "2020-20-20 10:10:01",
            detail: "没有",
          },
          {
            name: "test",
            host: "192.169.0.0.1",
            type: { id: 1, name: "mysql" },
            userId: { id: 1, name: "冯凡" },
            createTime: "2020-20-20 10:10:01",
            detail: "没有",
          },
          {
            name: "test",
            host: "192.169.0.0.1",
            type: { id: 1, name: "mysql" },
            userId: { id: 1, name: "冯凡" },
            createTime: "2020-20-20 10:10:01",
            detail: "没有",
          },
          {
            name: "test",
            host: "192.169.0.0.1",
            type: { id: 1, name: "mysql" },
            userId: { id: 1, name: "冯凡" },
            createTime: "2020-20-20 10:10:01",
            detail: "没有",
          },
          {
            name: "test",
            host: "192.169.0.0.1",
            type: { id: 1, name: "mysql" },
            userId: { id: 1, name: "冯凡" },
            createTime: "2020-20-20 10:10:01",
            detail: "没有",
          },
          {
            name: "test",
            host: "192.169.0.0.1",
            type: { id: 1, name: "mysql" },
            userId: { id: 1, name: "冯凡" },
            createTime: "2020-20-20 10:10:01",
            detail: "没有",
          },
          {
            name: "test",
            host: "192.169.0.0.1",
            type: { id: 1, name: "mysql" },
            userId: { id: 1, name: "冯凡" },
            createTime: "2020-20-20 10:10:01",
            detail: "没有",
          },
          {
            name: "test",
            host: "192.169.0.0.1",
            type: { id: 1, name: "mysql" },
            userId: { id: 1, name: "冯凡" },
            createTime: "2020-20-20 10:10:01",
            detail: "没有",
          },
          {
            name: "test",
            host: "192.169.0.0.1",
            type: { id: 1, name: "mysql" },
            userId: { id: 1, name: "冯凡" },
            createTime: "2020-20-20 10:10:01",
            detail: "没有",
          },
          {
            name: "test",
            host: "192.169.0.0.1",
            type: { id: 1, name: "mysql" },
            userId: { id: 1, name: "冯凡" },
            createTime: "2020-20-20 10:10:01",
            detail: "没有",
          },
          {
            name: "test",
            host: "192.169.0.0.1",
            type: { id: 1, name: "mysql" },
            userId: { id: 1, name: "冯凡" },
            createTime: "2020-20-20 10:10:01",
            detail: "没有",
          },
          {
            name: "test",
            host: "192.169.0.0.1",
            type: { id: 1, name: "mysql" },
            userId: { id: 1, name: "冯凡" },
            createTime: "2020-20-20 10:10:01",
            detail: "没有",
          },
          {
            name: "test",
            host: "192.169.0.0.1",
            type: { id: 1, name: "mysql" },
            userId: { id: 1, name: "冯凡" },
            createTime: "2020-20-20 10:10:01",
            detail: "没有",
          },
          {
            name: "test",
            host: "192.169.0.0.1",
            type: { id: 1, name: "mysql" },
            userId: { id: 1, name: "冯凡" },
            createTime: "2020-20-20 10:10:01",
            detail: "没有",
          },
          {
            name: "test",
            host: "192.169.0.0.1",
            type: { id: 1, name: "mysql" },
            userId: { id: 1, name: "冯凡" },
            createTime: "2020-20-20 10:10:01",
            detail: "没有",
          },
          {
            name: "test1",
            host: "192.169.0.0.1",
            type: { id: 1, name: "mysql" },
            userId: { id: 1, name: "冯凡" },
            createTime: "2020-20-20 10:10:01",
            detail: "没有",
          },
        ],
      },
      sqlFrom: {
        name: null,
        type: 1,
        host: null,
        port: null,
        userName: null,
        passWord: null,
      },
      writeSql: {
        name: null,
        isBoxSql: 1,
        host: null,
        port: null,
        userName: null,
        passWord: null,
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
        passWord: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    clickAddSql() {
      this.status.addSqlSatus = true;
    },
    clickWriteSql(){
        this.status.writeSqlSatus = true;
    },
    closeAddSql() {
      this.status.addSqlSatus = false;
    },
    closeWriteSql(){
        this.status.writeSqlSatus = false;
    }
  },
};
</script>

<style  lang="scss" scoped>
.header-t {
  text-align: left;
  margin-left: 10px;
  margin-top: 10px;
}
.manageSql {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  overflow: hidden;
}
.sql {
  height: 300px;
  overflow-x: hidden;
}
.w_sql {
  flex: 1;
  overflow-x: hidden;
}
.manageSql .sql,
.manageSql .w_sql {
  margin: 10px;
  text-align: left;
}
// .sql .body{
//     margin-top: 20px;

//     height: 270px;
// }

.addSql .body ,
.writeSql .body{
  margin: 0 20px;
}
.addSql .foot {
  margin-top: 40px;
}
</style>>

