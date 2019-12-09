<template>
  <div class="IR">
    <div class="title">
      <span class="t-info">基本信息</span>
    </div>
    <div class="top">
      <div class="top-1">
        <el-form class="top-el-form" :model="model">
          <el-form-item label="请求方法" label-width="63px" class="top-eft">
            <el-select v-model="model.postMethods">
              <el-option
                v-for="(item,index) in dataList.methods"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="请求类型" label-width="63px" class="top-eft">
            <el-select v-model="model.postType">
              <el-option
                v-for="(item,index) in dataList.type"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="响应类型" label-width="63px" class="top-eft">
            <el-select v-model="model.responseStatus">
              <el-option
                v-for="(item,index) in dataList.resType"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="固定状态" label-width="63px" class="top-eft">
            <el-select v-model="model.InitStatus">
              <el-option
                v-for="(item,index) in dataList.resStatus"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <!-- <el-select></el-select>
              <el-select></el-select>
        <el-select></el-select>-->
      </div>
    </div>
    <div class="ir-title top-1">
      <el-form :model="model" :rules="rules">
        <el-form-item label="接口名称" prop="infaterName" label-width="70px">
          <el-input v-model="model.infaterName" clearable placeholder="请输入接口名称"></el-input>
        </el-form-item>
        <el-form-item label="请求地址" prop="postAttr" label-width="70px">
          <el-input v-model="model.postAttr" clearable placeholder="请输入请求地址"></el-input>
        </el-form-item>
        <el-form-item label="接口描述" label-width="70px">
          <el-input v-model="model.interDetail" clearable placeholder="请输入接口描述"></el-input>
        </el-form-item>
      </el-form>
    </div>

    <div class="postData">
      <div class="pd-title">
        <span @click="changeBottomColor($event,'header-com')">请求头(header)</span>
        <span @click="changeBottomColor($event,'data-com')" class="colorCode">请求参数(body)</span>
      </div>
      <div class="hd-com">
        <keep-alive>
          <component :is="bindCom" ref="child"></component>
        </keep-alive>
      </div>
      <div class="pd-title">
        <span @click="changeBottomColor2($event,'header-com')">响应头(header)</span>
        <span @click="changeBottomColor2($event,'data-com')" class="colorCode2">响应参数(body)</span>
      </div>
      <div class="hd-com">
        <keep-alive>
          <component :is="bindCom2" ref="child" :msbox.sync="messageboxStatus"></component>
        </keep-alive>
      </div>
      <div class="pd-title">
        <span class="colorCode3">示例数据</span>
      </div>
      <div class="slData">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="JSON.stringify(textarea,null,'\t')"
          :autosize="{ minRows:5, maxRows: 10}"
        ></el-input>
      </div>
    </div>
    <!-- 新建文件 -->

    <message-box v-if="messageboxStatus" v-slot:postJsonData>
        <p>导入就送数据</p>
    </message-box>
    <div class="tt">
      <button @click="test()">dianji</button>
    </div>
  </div>
</template>

<script>
// import  headerCom from "./IrPost/postHeader.vue"
// import  dataCom from "./IrPost/PostData"
export default {
  components: {
    "header-com": () => import("./IrPost/postHeader.vue"),
    "data-com": () => import("./IrPost/PostData"),
    "header-com2": () => import("./IrPost/postHeader.vue"),
    "data-com2": () => import("./IrPost/PostData"),
    "message-box":()=>import("../public/MessageBox.vue")
  },
  data() {
    return {
      
      messageboxStatus:false,
      textarea: {        
        status: "0",
        msg: "操作成功",
        result: {
          pageEnity: {
            currentPage: 2,
            pageSize: 10,
            totalCount: 16,
            totalPage: 2
          },
          list: [
            {
              imageUrl:
                "http://hbimg.b0.upaiyun.com/c8aee369ba87fe1e2e366fc81d53c0a85fd2a5147a8d6-QvfJEx_fw658",
              desc: "美女13"
            },
            {
              imageUrl:
                "http://hbimg.b0.upaiyun.com/c8aee369ba87fe1e2e366fc81d53c0a85fd2a5147a8d6-QvfJEx_fw658",
              desc: "美女14"
            },
            {
              imageUrl:
                "http://hbimg.b0.upaiyun.com/c8aee369ba87fe1e2e366fc81d53c0a85fd2a5147a8d6-QvfJEx_fw658",
              desc: "美女0"
            },
            {
              imageUrl:
                "http://hbimg.b0.upaiyun.com/c8aee369ba87fe1e2e366fc81d53c0a85fd2a5147a8d6-QvfJEx_fw658",
              desc: "美女1"
            },
            {
              imageUrl:
                "http://hbimg.b0.upaiyun.com/c8aee369ba87fe1e2e366fc81d53c0a85fd2a5147a8d6-QvfJEx_fw658",
              desc: "美女2"
            },
            {
              imageUrl:
                "http://hbimg.b0.upaiyun.com/c8aee369ba87fe1e2e366fc81d53c0a85fd2a5147a8d6-QvfJEx_fw658",
              desc: "ddd"
            }
          ]
        }
      },
      bindCom: "data-com",
      bindCom2: "data-com2",
      model: {
        postMethods: "",
        postType: "",
        resType: "",
        responseStatus: "",
        infaterName: "",
        postAttr: "",
        interDetail: "",
      },
      rules: {
        infaterName: [
          { required: true, message: "请输入接口名称", trigger: "blur" }
        ],
        postAttr: [
          { required: true, message: "请输入请求地址", trigger: "blur" }
        ],
   
      },

      //后台返回的数据
      dataList: {
        methods: [
          { id: 1, name: "GET" },
          { id: 2, name: "POST" },
          { id: 3, name: "PUT" },
          { id: 4, name: "DELETE" },
          { id: 5, name: "PATCH" },
          { id: 6, name: "COPY" },
          { id: 7, name: "OPTIONS" }
        ],
        type: [
          { id: 1, name: "X-WWW-FORM-URLENCODED" },
          { id: 2, name: "JSON" },
          { id: 3, name: "FORM-DATA" },
          { id: 4, name: "BINARY" },
          { id: 5, name: "RAW" },
          { id: 6, name: "XML" }
        ],
        resType: [
          { id: 1, name: "JSON" },
          { id: 2, name: "JSONP" },
          { id: 3, name: "TEXT" },
          { id: 3, name: "XML" },
          { id: 4, name: "HTML" },
          { id: 5, name: "IMAGE" },
          { id: 6, name: "BINARY" }
        ],
        resStatus: [
          { id: 1, name: "JSON" },
          { id: 2, name: "JSONP" },
          { id: 3, name: "TEXT" },
          { id: 3, name: "XML" },
          { id: 4, name: "HTML" },
          { id: 5, name: "IMAGE" },
          { id: 6, name: "BINARY" }
        ]
      }
    };
  },
  methods: {
    

    changeBottomColor(event, value) {
      if (document.querySelector(".colorCode")) {
        document.querySelector(".colorCode").classList.remove("colorCode");
      }
      event.currentTarget.classList.add("colorCode");
      console.log(this.bindCom);
      // if (this.bindCom=="data-com"){
      //   this.bindCom="header-com"
      // }else{
      //   this.bindCom="data-com"
      // }
      this.bindCom = value;
    },
    changeBottomColor2(event, value) {
      if (document.querySelector(".colorCode2")) {
        document.querySelector(".colorCode2").classList.remove("colorCode2");
      }
      event.currentTarget.classList.add("colorCode2");
      console.log(this.bindCom2);
      // if (this.bindCom=="data-com"){
      //   this.bindCom="header-com"
      // }else{
      //   this.bindCom="data-com"
      // }
      this.bindCom2 = value;
    },
    test() {
      console.log(this.$refs.child.tableData);
    }
  }
};
</script>

<style lang="scss" scoped>
.mbAddFiels{
  margin: 10px;
  .bt-botton{
    float: right;
    margin-top: 30px;
    margin-right: 20px;
  }
  .bt-botton .bottom{
    margin-left: 20px;
  }
}
.IR {
  margin: 10px;
  text-align: left;
  color: #666;
}

.title {
  text-align: left;
  border-bottom: 1px solid rgb(201, 178, 178);
  // padding: 10px
  padding: 10px 0;
  .t-info {
    border-bottom: 1px solid #1e87f0;
    padding: 11px 10px;
    margin-right: -20px;
  }
}
.top-1 {
  margin: 20px 0 0 10px;
  .top-el-form {
    display: flex;
    justify-content: space-between;
    .top-eft {
    }
  }
}
.postData {
  font-size: 14px;
  .pd-title {
    border-bottom: 1px solid rgb(201, 178, 178);
    padding: 15px 0;
  }
  .pd-title span {
    margin-right: 20px;
    cursor: pointer;
    padding: 16px 10px;
  }
  .colorCode {
    border-bottom: 1px solid #1e87f0;
  }
}
.colorCode2 {
  border-bottom: 1px solid #1e87f0;
}
.colorCode3 {
  border-bottom: 1px solid #1e87f0;
}
.slData {
  margin: 20px 0;
}
</style>
<style>
.IR .el-form-item__label {
  color: #666;
  text-align: right;
  padding: 0;
  margin: 0;
}
.IR .el-input {
  margin-left: 5px;
}
</style>