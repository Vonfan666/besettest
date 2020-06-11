<template>
  <div class="runCase">
    <div class="runCase_context">
      <div class="run_title">
        用例名称：
        <li>
          <el-input
            placeholder="请输入用例名称"
            prefix-icon="el-icon-search"
            v-model="search.caseName"
            clearable
          ></el-input>
        </li>所属接口：
        <li>
          <el-input
            placeholder="请输入用例名称"
            prefix-icon="el-icon-search"
            v-model="search.isInterface"
            clearable
          ></el-input>
        </li>
        请求类型：
        <li>
          <el-select v-model="search.postMethodsId" placeholder="请选择"  @change="searchPostMethods()">
                <el-option
                v-for="(item,index) in search.postMethods"
                :key="index"
                :label="item.name"
                :value="item.id"
               
                >
                </el-option>
            </el-select>
        </li>
      </div>
      <div class="run_body">
        <el-table
          :data="tableData"
          style="width: 100%"
          max-height="700"
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
import { GetCaseList,postMethods} from "@/axios/api.js";
import storage from "@/libs/storage.js";
export default {
  data() {
    return {
      search: {
        caseName: "",
        isInterface: "",
        postMethods:null,  //返回的列表
        postMethodsId:null,
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
    searchPostMethods(){
        //获取选中的值
      console.log(this.search.postMethodsId)
      },
    handleSizeChange(val) {
      this.pageSize = val;
      console.log(111, val);
      this.S_GetCaseList();
    },
    handleCurrentChange(val) {
      //选择页面
      this.page = val;
      console.log(222, val);
      this.S_GetCaseList();
    },
    textStyle({ row, column, rowIndex, columnIndex }) {
      return "text-align:center";
    },
    inRunCase() {
      this.$router.push({ name: "runCase" });
    },
    S_GetCaseList() {
      GetCaseList({
        projectId: storage.get("projectId"),
        page: this.page,
        pageSize: this.pageSize
      }).then(res => {
        res.status === 200
          ? ((this.tableData = res.results),
            (this.total = res.total),
            (this.allPage = res.allPage))
          : null;
      });
    },
    S_postMethods(){
        postMethods().then(res=>{
            res.status===200?
            this.search.postMethods=res.res_post_methods
            :null
        })
    }
  },
  mounted() {
    this.S_GetCaseList();
    this.S_postMethods()
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
  .run_foot {
    position: absolute;
    bottom: 20px;
    width: 90%;
  }
}
.run_title li {
  list-style: none;
  width: 200px;
  display: inline-block;
  margin-right: 20px;
}
</style>>