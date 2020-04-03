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
        <el-form-item label="mock地址" label-width="70px">
          <el-input v-model="model.mockAttr" clearable placeholder="请确保接口路径填写正确后自动生成mock地址"  readonly=""></el-input>
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
          <component :is="bindCom" ref="child" 
          :msbox.sync="messageboxStatus" 
          :indextp="bindCom" 
          :tableData.sync="postheaders" 
          :postData.sync="postDatas"></component>
        </keep-alive>
      </div>
      <div class="pd-title">
        <span @click="changeBottomColor2($event,'header-com2')">响应头(header)</span>
        <span @click="changeBottomColor2($event,'data-com2')" class="colorCode2">响应参数(body)</span>
      </div>
      <div class="hd-com">
        <keep-alive>
          <component :is="bindCom2" ref="child2" 
          :msbox.sync="messageboxStatus" 
          :indextp="bindCom2" 
          :tableData.sync="resHeaders"
          :postData.sync="resDatas"></component>
        </keep-alive>
      </div>
      <div class="pd-title">
        <span class="colorCode3">示例数据</span>
      </div>
      <div class="slData">
               
<!--  // this.jsonDemo1 = JSON.stringify(this.jsonDemo, null, 4); -->
        <el-input
          v-model="jsonDemo1"
          type="textarea"
          :rows="2"
          
          :autosize="{ minRows:5, maxRows: 10}"
          
        ></el-input>
      </div>
    </div>
    <!-- 新建文件 -->

    <message-box v-if="messageboxStatus" v-slot:postJsonData :styleCode="styleCode">
      <h3 style="text-align:center">导入json数据</h3>
      <div class="slData">
        <el-input
          v-model="postJson"
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          :autosize="{ minRows:10, maxRows: 10}"
          resize=none
          clearable
        ></el-input>
        <div
          class="jsonButton"
          style="
            bottom: 10px;
            position: absolute;
            margin-left: 200px;"
        >
          <el-button type="primary" size="small" @click="messageboxStatus=false">取消</el-button>
          <el-button type="primary" size="small" @click="postJsonSubmit()">确认</el-button>
        </div>
      </div>
    </message-box>
    <div class="tt">
      <button @click="test()">确认</button>
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
    "message-box": () => import("../public/MessageBox.vue")
  },
  data() {
    return {
      postType:"",  //在导入json数据时，通过子组件点击导入json数据时修改该值，从而确定导入json所属模块
      postJson: "", //导入json数据
      // returnJson: "", //返回json数据
      styleCode: "height:340px;width:500px",  //弹出框大小
      messageboxStatus: false,  //是否展示弹出框
      // jsonDemoCode: {},  //示例数据
     
      // this.jsonDemo1=JSON.stringify(this.jsonDemo, null, 4),
      jsonDemo:JSON.stringify(
      {//示例数据
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
        },
        "cao":"1"
      },null,4),
      jsonDemo1:null,  //示例数据
      bindCom: "data-com",  //动态组件名
      bindCom2: "data-com2",//动态组件名
      model: {    
        postMethods: "",   //请求方法
        postType: "",//请求类型
        resType: "",//响应类型
        responseStatus: "",// 固定状态
        infaterName: "",// 接口名称
        postAttr: "",//请求地址
        interDetail: "",//接口描述
        mockAttr:"", //mock地址
      },
      rules: {
        infaterName: [
          { required: true, message: "请输入接口名称", trigger: "blur" }
        ],
        postAttr: [
          { required: true, message: "请输入请求地址", trigger: "blur" }
        ]
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
      },

      postheaders: [   //前端输入返回请求头字段
        { cname: "aaa", isrequired: "ture", type: "ture", detail: "这是请求头1" },
        { cname: "b", isrequired: "ture", type: "ture", detail: "这是请求头2" },
        { cname: "c", isrequired: "ture", type: "ture", detail: "这是请求头3" },
        { cname: "d", isrequired: "ture", type: "ture", detail: "这是请求头4" },
        { cname: "e", isrequired: "ture", type: "ture", detail: "这是请求头5" },
        { cname: "f", isrequired: "ture", type: "ture", detail: "这是请求头6" }
      ],
      postDatas:[  //输入请求参数
        { cname: "a2", isrequired: "ture", type: "ture", detail: "这是请求参数1" },
        { cname: "b2", isrequired: "ture", type: "ture" , detail: "这是请求参数2"},
        { cname: "c2", isrequired: "ture", type: "ture", detail: "这是请求参数3" },
        { cname: "d2", isrequired: "ture", type: "ture", detail: "这是请求参数4" },
        { cname: "e2", isrequired: "ture", type: "ture", detail: "这是请求参数5" },
        { cname: "f2", isrequired: "ture", type: "ture", detail: "这是请求参数6" }
      ],
      resHeaders:[   //后台返回请求头字段
        { cname: "aaa", isrequired: "ture", type: "ture", detail: "这是响应头1" },
        { cname: "b", isrequired: "ture", type: "ture", detail: "这是响应头2" },
        { cname: "c", isrequired: "ture", type: "ture", detail: "这是响应头3" },
        { cname: "d", isrequired: "ture", type: "ture", detail: "这是响应头4" },
        { cname: "e", isrequired: "ture", type: "ture", detail: "这是响应头5" },
        { cname: "f", isrequired: "ture", type: "ture", detail: "这是响应头6" }
      ],
      resDatas:[  //返回参数
        { cname: "a2111", isrequired: "ture", type: "ture", detail: "这是返回参数1" },
        { cname: "b2", isrequired: "ture", type: "ture" , detail: "这是返回参数2"},
        { cname: "c2", isrequired: "ture", type: "ture", detail: "这是请返回参数3" },
        { cname: "d2", isrequired: "ture", type: "ture", detail: "这是返回参数4" },
        { cname: "e2", isrequired: "ture", type: "ture", detail: "这是返回参数5" },
        { cname: "f2", isrequired: "ture", type: "ture", detail: "这是返回参数6" }
      ],
      
    };
  },
  methods: {
      postJsonSubmit(){   //确认json数据提交
        console.log(this.bindCom);
        console.log(this.postType,"postType")
        if(this.postType=="header-com"){
          this.newJson(JSON.parse(this.postJson),this.postheaders)
          
        }
      },

    newJson(a,b){   //a是导入的数据   b是原来存在的数据

      var listA=Object.keys(a)

      var initLenght=this.$refs.child.indent.length   //初始长度
      // var postheadersLenght=this.postheaders.length  //未新增之前最大长度
      listA.forEach((item,index)=>{
        var postheadersLenght=this.postheaders.length  //实时最大长度

          //索引最大值
          console.log("实时最大长度",postheadersLenght)
        if(typeof(a[item]) ==  "object" ){     
          var indexd=postheadersLenght

          console.log(indexd,index,"dasdsas")
          this.listFor(a[item],indexd)
          // console.log(a[item],"whiqhweiqhwheuiewq")
        }
        this.$refs.child.indent.splice(postheadersLenght,0,0)

        b.splice(postheadersLenght,0,{ "cname":item,"isrequired": "ture", "type": "ture"," detail":""})


        
      })
      // console.log(this.$refs.child.indent)
    },

    listFor(data,indexd){
      
      // console.log(data,"daya")
      // console.log(typeof data,"类型")
      var  listB=Object.keys(data)
      console.log(indexd,"-------------")
      listB.forEach((item,index)=>{
        // console.log(typeof(data[item]),"zheshi ")
        console.log(item,index,indexd,"+++++++")
        this.postheaders.splice(indexd+index,0,{ "cname":item,"isrequired": "ture", "type": "ture"," detail":""})  //在原来的基础上添加数据
        console.log(indexd,"啥情况")
        this.$refs.child.indent.splice(indexd+index,0,this.$refs.child.indent[indexd-index-1]+15)  //
        
        if(typeof(data[item]) ==  "object"){  //递归
          var a =this.postheaders.length
          console.log(data[item])
          this.listFor(data[item],a)
          console.log(indexd,"最后的打印indexd")

        }

      }
      )
    },

    changeBottomColor(event, value) {
      this.bus.$emit("loading", true);
      if (document.querySelector(".colorCode")) {
        document.querySelector(".colorCode").classList.remove("colorCode");
      }
      event.currentTarget.classList.add("colorCode");

      // if (this.bindCom=="data-com"){
      //   this.bindCom="header-com"
      // }else{
      //   this.bindCom="data-com"
      // }

      // console.log(this.tableDataCode)
      // if(value=="header-com"){
      //   this.tableDataCode=this.postheaders
      // }else if(value=="data-com"){
      //   console.log(value,"va;uie")
      //   this.postDatasCode=this.postDatas
      // }
      this.bindCom = value;
      
      this.bus.$emit("loading", true);
      // debugger
      console.log(this.bindCom);
    },
    changeBottomColor2(event, value) {
      if (document.querySelector(".colorCode2")) {
        document.querySelector(".colorCode2").classList.remove("colorCode2");
      }
      event.currentTarget.classList.add("colorCode2");
      // if(value=="header-com2"){
      //   this.tableDataCode=this.resHeaders
      // }else if(value=="data-com2"){
      //   this.postDatasCode=this.resDatas
      // }
      // if (this.bindCom=="data-com"){
      //   this.bindCom="header-com"
      // }else{
      //   this.bindCom="data-com"
      // }
      this.bindCom2 = value;
      console.log(this.bindCom2);
    },
    test() {
      console.log(this.postheaders);
      console.log(this.postDatas);
      console.log(this.resDatas)
      
    }
  },
  created(){
    if(this.jsonDemo1){}else{
      this.jsonDemo1=this.jsonDemo
    }
  },
  updated() {
    // this.jsonDemo1=JSON.stringify(this.jsonDemo, null, 4),
    // this.jsonDemo1=JSON.stringify(this.jsonDemo1, null, 4),
    console.log(this.postheaders)
    
  }
};
</script>

<style lang="scss" scoped>
.mbAddFiels {
  margin: 10px;
  .bt-botton {
    float: right;
    margin-top: 30px;
    margin-right: 20px;
  }
  .bt-botton .bottom {
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
    // .top-eft {
    // }
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