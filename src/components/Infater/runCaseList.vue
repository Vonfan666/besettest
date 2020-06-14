<template>
  <div class="runCase">
    <div class="runCase_context">
      <div class="run_title">
        <div class="seach">
          用例名称：
          <li>
            <el-input
              placeholder="请输入用例名称"
              prefix-icon="el-icon-search"
              v-model="search.caseName"
              clearable
            ></el-input>
          </li>
        </div>

        <div class="seach">
          所属接口：
          <li>
            <el-input
              placeholder="请输入用例名称"
              prefix-icon="el-icon-search"
              v-model="search.isInterface"
              clearable
            ></el-input>
          </li>
        </div>
        <div class="seach">
          请求类型：
          <el-select
            clearable
            v-model="search.postMethodsId"
            placeholder="请选择"
            @change="searchPostMethods()"
          >
            <el-option
              v-for="(item,index) in search.postMethods"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div class="seach">
          <div class="block">
            <span class="demonstration">创建时间：</span>
            <el-date-picker
              v-model="createTime"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              :default-time="['00:00:00', '23:59:59']"
            ></el-date-picker>
          </div>
        </div>
        <div class="seach">
          <div class="block">
            <span class="demonstration">修改时间：</span>
            <el-date-picker
              v-model="updateTime"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              :default-time="['00:00:00', '23:59:59']"
            ></el-date-picker>
          </div>
        </div>
        <el-button type="primary" size="small" @click="getCaseList()">搜索</el-button>
      </div>
      <div class="run_body">
        <el-table
          v-loading="loading.loading_table"
          :data="tableData"
          style="width: 100%"
          max-height="700"
          :header-cell-style="textStyle"
          :cell-style="textStyle"
        >
          <el-table-column prop="id" label="ID" width="50"></el-table-column>
          <el-table-column prop="order" label="执行顺序" width="80"></el-table-column>
          <el-table-column prop="name" label="用例名称" fit></el-table-column>
          
          <el-table-column prop="isInterface.name" label="所属接口" fit></el-table-column>
          <el-table-column prop="isClass.name" label="所属分类" width="150"></el-table-column>
          <el-table-column prop="postMethod.name" label="请求类型" width="80"></el-table-column>
          <el-table-column prop="user.name" label="创建人" width="80"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="150"></el-table-column>
          <el-table-column prop="updateUser.name" label="修改人" width="80"></el-table-column>
          <el-table-column prop="updateTime" label="最后一次修改时间" width="150"></el-table-column>
          <el-table-column prop="detail" label="用例描述" width="150"></el-table-column>
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="editCaseOrder(scope.row,scope.$index)">编辑</el-button>
              <el-button type="text" size="small" @click="D_ClassRemove(scope.row,scope.$index)">删除</el-button>
              <el-button type="text" size="small" @click="debugCase(scope.row,scope.$index)">调试</el-button>
            </template>
          </el-table-column>
        </el-table>
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
      <div class="run_foot">
        <el-button type="primary" size="small" @click="inRunCase()">返回</el-button>
      </div>
    </div>
    <caseEdit v-slot:caseEdit v-if="caseEdit.caseEditStatus" :styleCode="caseEdit.styleCode">
      <div class="caseEdit">
        <div class="header">
          <h4>用例编辑</h4>
        </div>
        <div class="body">
          <li>
            用例名称：
            <div class="b1">
              <el-input clearable v-model="caseEdit.name" placeholder="请输入用例名称"></el-input>
            </div>
          </li>
          <li>
            接口顺序：
            <div class="b1">
              <el-input clearable v-model="caseEdit.iorder" maxlength="7" placeholder="请输入接口顺序"></el-input>
            </div>
          </li>
          <li>
            用例顺序：
            <div class="b1">
              <el-input clearable v-model="caseEdit.corder" maxlength="7" placeholder="请输入用例执行顺序"></el-input>
            </div>
          </li>

          <li>
            请求类型：
            <div class="b1">
              <el-select clearable v-model="caseEdit.postMethod" placeholder="请选择请求方法" label="0">
                <el-option
                  v-for="(item,index) in search.postMethods"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>
          </li>
        </div>
        <div class="foot">
          <el-button type="primary" size="small" @click="caseEdit.caseEditStatus=false">取消</el-button>
          <el-button type="primary" size="small" @click="editCaseOrderSubmit()">确定</el-button>
        </div>
      </div>
    </caseEdit>

    <el-drawer :visible.sync="statusIng.drawerStatus" :with-header="false" size="60%">
      <div>
        <left-box
          :list.sync="resResults"
          :code.sync="code"
          ref="letfBox"
          v-if="statusIng.drawerStatus"
        ></left-box>
      </div>
    </el-drawer>
  </div>
</template>
    
<script>
import {
  GetCaseList,
  postMethods,
  EditCaseOrder,
  ClassRemove,
  Runcase
} from "@/axios/api.js";
import storage from "@/libs/storage.js";
import { Message } from "element-ui";
export default {
  components: {
    caseEdit: () => import("../public/MessageBox.vue"),
    "left-box": () => import("../public/manageCaseComponents/leftBox.vue")
  },
  data() {
    return {
      code: null, //判断是否启动websocket
      resResults: [], //调试返回接口
      statusIng: {
        drawerStatus: false
      },
      caseEdit: {
        id: null,
        index: null,
        caseEditStatus: false, //编辑用例弹窗
        styleCode: "height:500px;width:500px",
        postMethod: null,
        corder: null,
        iorder: null,
        isInterface: null,
        updateUser: null,
        name: null
      },
      createTime: null,
      updateTime: null,
      loading: {
        loading_table: true
      },
      search: {
        caseName: null,
        isInterface: null,
        postMethods: null, //返回的列表
        postMethodsId: null
      },
      total: null, //数据总条数
      pageSize: 10, //每页显示的数量
      page: 1, //当前请求的页面
      allPage: null, //总页数
      tableData: [
        //          {
        //     "id": 1,
        //     "order":"1-2",
        //     "name": "321",
        //     "postMethod": {
        //         "id": 1,
        //         "name": "GET"
        //     },
        //     "isInterface": {
        //         "id": 13,
        //         "name": "deng1",
        //         "order": 1
        //     },
        //     "isClass": {
        //         "id": 21,
        //         "name": "登录注册"
        //     },
        //     "detail": "3322",
        //     "user": {
        //         "id": 14,
        //         "name": "冯凡"
        //     },
        //     "updateUser": {
        //         "id": null,
        //         "name": "马不凡"
        //     },
        //     "createTime": "2020-05-25 18:21:26",
        //     "updateTime": "2020-06-01 18:36:51"
        // },
      ]
    };
  },
  methods: {
    //调试用例
    debugCase(item, index) {
      Runcase({
        id: JSON.stringify([item.id])
      }).then(res => {
        res.status === 200
          ? ((this.resResults = res.results),
            (this.statusIng.drawerStatus = true)) //展开左侧
          : Message.error(res.msg);
      });
    },
    //二次确认删除
    D_ClassRemove(item,index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log(arguments)
          this.M_ClassRemove(item,item) 
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

    M_ClassRemove(item, index) {
      ClassRemove({
        id: item.id
      }).then(res => {
        res.status === 200
          ? (Message.success(res.msg),
            this.S_GetCaseList(
              this.search.caseName,
              this.search.isInterface,
              this.search.postMethodsId,
              this.createTime,
              this.updateTime
            ))
          : null;
      });
    },
    //编辑用例排序
    editCaseOrder(item, index) {
      console.log(item, index);
      (this.caseEdit.id = item.id),
        (this.caseEdit.index = index),
        (this.caseEdit.name = item.name),
        (this.caseEdit.corder = item.order.split("-")[1]),
        (this.caseEdit.iorder = item.order.split("-")[0]),
        (this.caseEdit.postMethod = item.postMethod.id);
      this.caseEdit.isInterface = item.isInterface.id;
      this.caseEdit.caseEditStatus = true;
    },
    editCaseOrderSubmit() {
      EditCaseOrder({
        id: this.caseEdit.id,
        name: this.caseEdit.name,
        corder: this.caseEdit.corder,
        iorder: this.caseEdit.iorder,
        postMethod: this.caseEdit.postMethod,
        isInterface: this.caseEdit.isInterface,
        updateUser: storage.get("userId")
      }).then(res => {
        res.status === 200
          ? (this.tableData.splice(this.caseEdit.index, 1, res.results),
            (this.caseEdit.id = null),
            (this.caseEdit.index = null),
            (this.caseEdit.name = null),
            (this.caseEdit.corder = null),
            (this.caseEdit.iorder = null),
            (this.caseEdit.postMethod = null),
            (this.caseEdit.isInterface = null),
            (this.caseEdit.caseEditStatus = false),
            Message.success(res.msg))
          : null;
      });
    },
    getCaseList() {
      //用例搜索

      this.search.caseName === "" ? (this.search.caseName = null) : null;
      this.search.isInterface === "" ? (this.search.isInterface = null) : null;
      this.search.postMethodsId === ""
        ? (this.search.postMethodsId = null)
        : null;

      this.S_GetCaseList(
        this.search.caseName,
        this.search.isInterface,
        this.search.postMethodsId,
        this.createTime,
        this.updateTime
      );
    },
    searchPostMethods() {
      //获取选中的值
      console.log(this.search.postMethodsId);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.S_GetCaseList(
        this.search.caseName,
        this.search.isInterface,
        this.search.postMethodsId,
        this.createTime,
        this.updateTime
      );
    },
    handleCurrentChange(val) {
      //选择页面

      this.page = val;
      this.loading.loading_table = true;

      this.S_GetCaseList(
        this.search.caseName,
        this.search.isInterface,
        this.search.postMethodsId,
        this.createTime,
        this.updateTime
      );
    },
    textStyle({ row, column, rowIndex, columnIndex }) {
      return "text-align:center";
    },
    inRunCase() {
      this.$router.push({ name: "runCase" });
    },

    S_GetCaseList(name, isInterface, postMethods, ctime, utime) {
      if (ctime !== null) {
        var ctime = JSON.stringify(ctime);
      }
      if (utime !== null) {
        var utime = JSON.stringify(utime);
      }
      GetCaseList({
        name: name,
        isInterface: isInterface,
        postMethods: postMethods,
        ctime: ctime,
        utime: utime,
        projectId: storage.get("projectId"),
        page: this.page,
        pageSize: this.pageSize
      }).then(res => {
        res.status === 200
          ? ((this.tableData = res.results),
            (this.total = res.total),
            (this.allPage = res.allPage),
            (this.loading.loading_table = false))
          : (this.loading.loading_table = false);
      });
    },
    S_postMethods() {
      postMethods().then(res => {
        res.status === 200
          ? (this.search.postMethods = res.res_post_methods)
          : null;
      });
    }
  },
  mounted() {
    this.S_GetCaseList(
      this.search.caseName,
      this.search.isInterface,
      this.search.postMethodsId,
      this.createTime,
      this.updateTime
    );
    this.S_postMethods();
  },
  watch: {
    createTime(a, b) {
      console.log("新", a);
      console.log("旧", b);
    },
    updateTime(a, b) {
      console.log("2321", a, b);
    }
  }
};
</script>

<style lang="scss" scoped>
.runCase {
  width: 100%;
  height: 100%;
  min-width: 1130px;
  overflow-x: hidden;
  background: #eee;
  .runCase_context {
    margin: 0 10px;
  }
  .run_title {
    width: 100%;
    text-align: left;
    padding: 10px 0;
  }
  .run_foot {
    margin: 20px 0;
    // bottom: 20px;
    // position: absolute;
    width: 99%;
  }
}
.run_title {
  word-wrap: break-word;
  word-break: normal;
  font-size: 14px;
}
.run_title .seach {
  display: inline-block;
  margin: 10px 0;
  margin-right: 20px;
}

.run_title li {
  list-style: none;

  display: inline-block;
}

.caseEdit {
  margin: 0 10px 10px 10px;
  text-align: left;
  .header {
    text-align: center;
    margin-bottom: 30px;
  }
  li {
    list-style: none;
    width: 100%;
    margin: 20px;
  }
  .b1 {
    width: 300px;
    display: inline-block;
    margin-left: 20px;
  }
  .foot {
    text-align: center;
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    width: 100%;
  }
}
</style>>