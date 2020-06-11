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
          <li>
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
          </li>
        </div>
        <div class="seach">
          创建时间：
          <li>
            <el-date-picker
              v-model="createTime"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
            ></el-date-picker>
          </li>
        </div>
        <div class="seach">
          修改时间：
          <li>
            <el-date-picker
              v-model="updateTime"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
            ></el-date-picker>
          </li>
        </div>
        <el-button type="primary" size="small" @click="getCaseList()">搜索</el-button>
      </div>
      <div class="run_body">
        <el-table
          v-loading="loading.loading_table"
          :data="tableData"
          style="width: 100%"
          max-height="600"
          :header-cell-style="textStyle"
          :cell-style="textStyle"
        >
          <el-table-column prop="id" label="ID" width="50"></el-table-column>
          <el-table-column prop="order" label="执行顺序" width="80"></el-table-column>
          <el-table-column prop="name" label="用例名称" width="150"></el-table-column>
          <el-table-column prop="postMethod.name" label="请求类型" width="80"></el-table-column>
          <el-table-column prop="isInterface.name" label="所属接口" width="150"></el-table-column>
          <el-table-column prop="isClass.name" label="所属分类" width="150"></el-table-column>
          <el-table-column prop="detail" label="用例描述" width="150"></el-table-column>
          <el-table-column prop="user.name" label="创建人" width="80"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="150"></el-table-column>
          <el-table-column prop="updateUser.name" label="修改人" width="80"></el-table-column>
          <el-table-column prop="updateTime" label="最后一次修改时间" width="150"></el-table-column>
          <el-table-column fixed="right" label="操作" width="150"></el-table-column>
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
  </div>
</template>
    
<script>
import { GetCaseList, postMethods } from "@/axios/api.js";
import storage from "@/libs/storage.js";
export default {
  data() {
    return {
      createTime: null,
      updateTime: null,
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
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
    getCaseList() {
      //用例搜索
      console.log(this.createTime);
      console.log(this.updateTime);
      console.log(111,this.search.caseName,this.search.isInterface,this.search.postMethodsId,)
      this.search.caseName===""?this.search.caseName=null:null
      this.search.isInterface===""?this.search.isInterface=null:null
      this.search.postMethodsId===""?this.search.postMethodsId=null:null
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
      console.log(111, val);
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
      console.log(222, val);
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
    S_GetCaseList(name, isInterface, postMethods,ctime,utime) {
      GetCaseList({
        name: name ,
        isInterface: isInterface,
        postMethods: postMethods,
        ctime:ctime,
        utime:utime,
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
    padding: 20px 0;
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
</style>>