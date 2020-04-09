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
          <el-input
            v-model="model.mockAttr"
            clearable
            placeholder="请确保接口路径填写正确后自动生成mock地址"
            readonly
          ></el-input>
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
          <component
            :is="bindCom"
            ref="child"
            :msbox.sync="messageboxStatus"
            :indextp="bindCom"
            :tableData.sync="postheaders"
            :postData.sync="postDatas"
          ></component>
        </keep-alive>
      </div>
      <div class="pd-title">
        <span @click="changeBottomColor2($event,'header-com2')">响应头(header)</span>
        <span @click="changeBottomColor2($event,'data-com2')" class="colorCode2">响应参数(body)</span>
      </div>
      <div class="hd-com">
        <keep-alive>
          <component
            :is="bindCom2"
            ref="child2"
            :msbox.sync="messageboxStatus"
            :indextp="bindCom2"
            :tableData.sync="resHeaders"
            :postData.sync="resDatas"
          ></component>
        </keep-alive>
      </div>
      <div>
        <!--    
          <select aria-setsize="40" v-model="selected" before="shez">
              <option disabled value="">请选择需要保存的变量</option>
              <option v-for="(item,index) in  postheaders" :key=index >{{item.cname}} </option>
    
        </select>-->
        <!-- <el-form>
          <el-form-item label="请求方法" label-width="63px" class="top-eft">
            <el-select v-model="selected">
              <el-option disabled value>请选择需要保存的变量</el-option>
              <el-option
                v-for="(item,index) in  postheaders"
                :key="index"
                :label="item.cname"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>-->
        <el-row class="demo-autocomplete">
          <div class="pd-title">
            <span class="colorCode3">新增环境变量</span>
          </div>
          <el-col :span="12">
            <div class="sub-title" v-for="(item,index) in selected" :key="index">
              <div class="left">
                <span>key</span>
                <el-autocomplete
                  class="inline-input"
                  v-model="selected[index]['keys']"
                  :fetch-suggestions="querySearch"
                  placeholder="请输入变量名"
                  :trigger-on-focus="false"
                  @select="handleSelect(item.keys,index)"
                ></el-autocomplete>
              </div>
              <div class="right">
                <el-form :model="Environment">
                  <el-form-item label="value" label-width="70px">
                    <el-input v-model="Environment.value[index]" clearable placeholder="自动返回变量的值"></el-input>
                  </el-form-item>
                  <div class="icon">
                    <span class="el-icon-remove-outline" @click="removeEnvironment(index)" :disabled="disabled"></span>

                    <!-- el-icon-remove-outline -->
                    <span class="el-icon-circle-plus-outline" @click="addEnvironment(index)"></span>
                  </div>
                </el-form>
              </div>
            </div>
            <br />
          </el-col>
        </el-row>
        {{selected}}
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
          resize="none"
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
      disabled:false,
      Environment: {
        value: []
      },
      // EnvironmentAdd: [0],
      valueStatus: [], //存储环境变量临时值  [{"value":value}]
      restaurants: [], //将对象所有key放到一个列表--先把后端返回的内容的key全部组成一个数组放到这里，
      selected: [
        { keys: "", value: "" },
      ],
      postType: "", //在导入json数据时，通过子组件点击导入json数据时修改该值，从而确定导入json所属模块
      postJson: "", //导入json数据,临时存储
      returnJson: "", //返回json数据,临时存储
      // treeList:[],  //定义一个空列表，将从第一个值开始一个个append到列表，从而得到一个树状
      // treeDict:{},
      styleCode: "height:340px;width:500px", //弹出框大小
      messageboxStatus: false, //是否展示弹出框
      // jsonDemoCode: {},  //示例数据
      postJHeader: "", //导入的请求头数据
      postJData: "", //导入的请求参数
      resJHeader: "", // 返回的请求头数据
      resJData: "", // 返回的请求数据

      // this.jsonDemo1=JSON.stringify(this.jsonDemo, null, 4),
      jsonDemo: JSON.stringify(
        {
          //示例数据
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
          cao: "1"
        },
        null,
        4
      ),
      jsonDemo1: null, //示例数据
      bindCom: "data-com", //动态组件名
      bindCom2: "data-com2", //动态组件名
      model: {
        postMethods: "", //请求方法
        postType: "", //请求类型
        resType: "", //响应类型
        responseStatus: "", // 固定状态
        infaterName: "", // 接口名称
        postAttr: "", //请求地址
        interDetail: "", //接口描述
        mockAttr: "" //mock地址
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

      postheaders: [
        //前端输入返回请求头字段
        {
          cname: "aaa111",
          isrequired: "ture",
          type: "ture",
          detail: "这是请求头1",
          children: [],id:0,parentId: 0
        },
        { cname: "b", isrequired: "ture", type: "ture", detail: "这是请求头2" ,children: [],id:1,parentId: 0},
        { cname: "c", isrequired: "ture", type: "ture", detail: "这是请求头3" ,children: [],id:2,parentId: 0},
        { cname: "d", isrequired: "ture", type: "ture", detail: "这是请求头4" ,children: [],id:3,parentId: 0},
        { cname: "e", isrequired: "ture", type: "ture", detail: "这是请求头5" ,children: [],id:4,parentId: 0},
        { cname: "f", isrequired: "ture", type: "ture", detail: "这是请求头6" ,children: [],id:5,parentId: 0}
      ],
      postDatas: [
        //输入请求参数
        {
          cname: "a2",
          isrequired: "ture",
          type: "ture",
          detail: "这是请求参数1"
        },
        {
          cname: "b2",
          isrequired: "ture",
          type: "ture",
          detail: "这是请求参数2"
        },
        {
          cname: "c2",
          isrequired: "ture",
          type: "ture",
          detail: "这是请求参数3"
        },
        {
          cname: "d2",
          isrequired: "ture",
          type: "ture",
          detail: "这是请求参数4"
        },
        {
          cname: "e2",
          isrequired: "ture",
          type: "ture",
          detail: "这是请求参数5"
        },
        {
          cname: "f2",
          isrequired: "ture",
          type: "ture",
          detail: "这是请求参数6"
        }
      ],
      resHeaders: [
        //后台返回请求头字段
        {
          cname: "aaa",
          isrequired: "ture",
          type: "ture",
          detail: "这是响应头1"
        },
        { cname: "b", isrequired: "ture", type: "ture", detail: "这是响应头2" },
        { cname: "c", isrequired: "ture", type: "ture", detail: "这是响应头3" },
        { cname: "d", isrequired: "ture", type: "ture", detail: "这是响应头4" },
        { cname: "e", isrequired: "ture", type: "ture", detail: "这是响应头5" },
        { cname: "f", isrequired: "ture", type: "ture", detail: "这是响应头6" }
      ],
      resDatas: [
        //返回参数
        {
          cname: "a2111",
          isrequired: "ture",
          type: "ture",
          detail: "这是返回参数1",
          value: "11"
        },
        {
          cname: "b2",
          isrequired: "ture",
          type: "ture",
          detail: "这是返回参数2",
          value: "11"
        },
        {
          cname: "c2",
          isrequired: "ture",
          type: "ture",
          detail: "这是请返回参数3",
          value: "11"
        },
        {
          cname: "d2",
          isrequired: "ture",
          type: "ture",
          detail: "这是返回参数4",
          value: "11"
        },
        {
          cname: "e2",
          isrequired: "ture",
          type: "ture",
          detail: "这是返回参数5",
          value: "11"
        },
        {
          cname: "f2",
          isrequired: "ture",
          type: "ture",
          detail: "这是返回参数6",
          value: "121"
        }
      ],
      requestsResDatas: [
        //返回参数
        {
          cname: "a2111",
          isrequired: "ture",
          type: "ture",
          detail: "这是返回参数1",
          value: "a111"
        },
        {
          cname: "b2",
          isrequired: "ture",
          type: "ture",
          detail: "这是返回参数2",
          value: "b22"
        },
        {
          cname: "c2",
          isrequired: "ture",
          type: "ture",
          detail: "这是请返回参数3",
          value: "c22"
        },
        {
          cname: "d2",
          isrequired: "ture",
          type: "ture",
          detail: "这是返回参数4",
          value: "d22"
        },
        {
          cname: "e2",
          isrequired: "ture",
          type: "ture",
          detail: "这是返回参数5",
          value: "e322"
        },
        {
          cname: "f2",
          isrequired: "ture",
          type: "ture",
          detail: "这是返回参数6",
          value: "f22"
        }
      ],
      type: ["string", "number", "boolean", "object", "array", "file", "null"]
    };
  },
  methods: {
    addEnvironment(index) {
      
      this.selected.splice(index + 1, 0, { keys: "e", value: "t" });
      
      this.Environment.value.splice(index+1,0,"t")
      this.restaurants.splice(index+1,0,"")
      this.valueStatus.splice(index+1,0,"")
      console.log(this.selected, "selected");
      console.log(this.selected, "Environment");
      console.log(this.selected, "restaurants");
      console.log(this.selected, "valueStatus");
    },
    removeEnvironment(index) {
      if(this.selected.length==1){
        console.log("--------------------")
        // document.querySelector(".el-icon-remove-outline").style.color="#606266"
        this.disabled="disabled"
      }else{
        this.selected.splice(index , 1);
      this.Environment.value.splice(index,1)
      this.restaurants.splice(index,1)
      this.valueStatus.splice(index,1)
      }
      
      
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    handleSelect(item, index) {
      console.log(this.restaurants, "这是啥 ");
      var l = [];
      this.restaurants.forEach((item1, index1) => {
        l.push(item1.value);
      });
      console.log(l);
      this.selected[index].value = this.valueStatus[l.indexOf(item)];
      this.Environment.value.splice(index,1,this.selected[index].value);  
    },
    isValid(newObj,oldObj){
          if (newObj instanceof Array) {
            this.open3("数据格式不能是数组", "warning");
          } else if (newObj instanceof Object) {
            this.jsonMethod(newObj, oldObj);
            this.messageboxStatus = !this.messageboxStatus;
            this.open3("数据导入成功", "success");
          } else if (newObj == null || newObj == "") {
            this.open3("数据不能为空", "warning");
          } else {
            this.open3("数据格式错误", "warning");
          }
    },
    postJsonSubmit() {
      //确认json数据提交
      try {
        if (this.postType == "header-com") {
          this.postJHeader = JSON.parse(this.postJson);
          console.log(typeof this.postJHeader);
          this.isValid( this.postJHeader,this.postheaders)
          // console.log(postJson)
          // if (this.postJHeader instanceof Array) {
          //   this.open3("数据格式不能是数组", "warning");
          // } else if (this.postJHeader instanceof Object) {
          //   this.jsonMethod(this.postJHeader, this.postheaders);
          //   this.messageboxStatus = !this.messageboxStatus;
          //   this.open3("数据导入成功", "success");
          // } else if (this.postJHeader == null || this.postJHeader == "") {
          //   this.open3("数据不能为空", "warning");
          // } else {
          //   this.open3("数据格式错误", "warning");
          // }
        }
      } catch (e) {
        console.log(e, "1111");
        this.open3("数据格式有误,请认真检查后上传", "warning");
      }
      console.log(JSON.stringify(this.postheaders))
      var  postheadersCommit=[]
      this.postheaders.forEach((item,index)=>{
        if(item.parentId==0){
          postheadersCommit.push(item)
        }else{
         
         //   postheadersCommit[index-1].id      上次的id
        //  //  postheadersCommit[postheadersCommit.length-1] 最后一个祖先对象
        //   this.addObject(item ,  //   item.parentId  本次的对象
        //                 postheadersCommit[postheadersCommit.length-1],   //目录层级
        //                 postheadersCommit.length-1,   //祖先元素的索引-
        //                 postheadersCommit)   //已添加到新列表对象的数据
        this.addObject(currentObj,postheadersCommit,postheadersCommit.length)
        }

      })
      console.log(JSON.stringify(postheadersCommit))
    },
    addObject(currentObj,newArrayObj,newArrayObjIndex){
      currentParentId=currentObj.parentId  //当前OBJ的父id
      topObj         =newArrayObj[newArrayObjIndex]
      topObjId       =topObj.id
      if(topObjId==currentParentId){
        topObj.push(currentObj)
      }else{
        
      }


      // var objCode=obj.children
      // //objId==本次对象的parentId
      // // obj 本次对象所在的祖先对象
      // // index本次循环最上级的索引
      // if(objI.parentId==obj.id){   //如果本次对象的parentId等于祖先id-则表明是二级对象-所以直接push到祖先的children就可以
      //   obj.children.push(objI)
      // }else{   // 操作三级
      //     objCode.forEach((item,index1)=>{
      //     if (objI.parentId==item.id){
      //       objCode[index1].children.push(objI)
      //       // objCode=obj[index1].children
      //       // objCode[index1].children[index].children()
      //     }
      //     else{
            
      //       // this.addObject(objI,objCode,index,postheadersCommit)
      //     }
      //   })
        
      // }
    },

  



    jsonMethod(newData, oldData) {
      var falg = 0;
      var fatherList = Object.keys(newData);
      fatherList.forEach((item, index) => {
        var id=this.postheaders.length
        if (typeof newData[item] == "object") {
          oldData.splice(oldData.length, 0, {
            cname: item,
            isrequired: "ture",
            type: typeof item,
            detail: "",children: [],id:id,parentId:0
          }); //如果是对象则先把这个字段加入对应列表
          this.$refs.child.indent.push(falg); //如果是对象则先把这个字段加入对应的边距列表，
          this.forE(newData[item], falg + 15, oldData,id); //然后继续遍历其下的内容
        } else {
          oldData.splice(oldData.length, 0, {
            cname: item,
            isrequired: "ture",
            type: typeof item,
            detail: "",children: [],id:this.postheaders.length,parentId:0
          });
          this.$refs.child.indent.push(falg);
        }
      });
    },
    forE(obj, falg, oldData,parentId) {
      // 三种情况  1 对象包含list  list包含对象   对象list并存
      if (obj instanceof Array) {
        //判断对象是否为列表
        //如果是一个list--首先得记住他的父id或者是属于第几层循环
        var n = obj.length - 1;
        obj.splice(0, n);
        //以上两句是去掉list几个其他的,list只需要一个字段就好了
        obj.forEach((item, index) => {
          if (typeof obj[index] == "object") {
            // oldData.splice({ cname: item, isrequired: "ture", type: "ture", detail: "" })  //如果是对象则先把这个字段加入对应列表
            // this.$refs.child.indent.push(falg) //如果是对象则先把这个字段加入对应的边距列表，
            this.forE(obj[index], falg, oldData,this.postheaders.length-1); //然后继续遍历其下的内容
          } else {
            oldData.splice(oldData.length, 0, {
              cname: item,
              isrequired: "ture",
              type: typeof item,
              detail: "",children: [],id:this.postheaders.length,parentId:parentId
            });
            this.$refs.child.indent.push(falg);
          }
        });
      } else {
        Object.keys(obj).forEach((item, index) => {
          //如果里面包含字典
          if (typeof obj[item] == "object") {
            var typeCode = typeof obj[item];
            if (obj[item] instanceof Array) {
              var typeCode = "Array";
            }
            var id=this.postheaders.length
            oldData.splice(oldData.length, 0, {
              cname: item,
              isrequired: "ture",
              type: typeCode,
              detail: "",children: [],id:id,parentId:parentId
            }); //如果是对象则先把这个字段加入对应列表
            this.$refs.child.indent.push(falg); //如果是对象则先把这个字段加入对应的边距列表，
            this.forE(obj[item], falg + 15, oldData,id); //然后继续遍历其下的内容
          } else {
            //如果里面只有键值对
            oldData.splice(oldData.length, 0, {
              cname: item,
              isrequired: "ture",
              type: typeof item,
              detail: "",children: [],id:this.postheaders.length,parentId:parentId
            });
            this.$refs.child.indent.push(falg);
          }
        });
      }
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
    },
    test() {},
    open3(msg, status) {
      this.$message({
        message: msg,
        type: status
      });
    }
  },

  created() {
    if (this.jsonDemo1) {
    } else {
      this.jsonDemo1 = this.jsonDemo;
    }
    // this.restaurants=[]
    // this.postheaders.forEach((item,index)=>{
    //   this.restaurants.push({"value":item.cname})
    // })
    // console.log(this.restaurants,"111")
  },
  updated() {
    // this.jsonDemo1=JSON.stringify(this.jsonDemo, null, 4),
    // this.jsonDemo1=JSON.stringify(this.jsonDemo1, null, 4),
    this.valueStatus = [];
    this.restaurants = [];
    this.requestsResDatas.forEach((item, index) => {
      this.restaurants.push({ value: item.cname });
      this.valueStatus.push(item.value);
    });
    if(this.selected.length==1){
        console.log("--------------------")
        document.querySelector(".el-icon-remove-outline").style.color="#606266"
        this.disabled="disabled"} else{
          document.querySelector(".el-icon-remove-outline").style.color="#409eff"
        }
  },
  mounted() {
    this.restaurants = [];
    this.valueStatus = [];
    this.requestsResDatas.forEach((item, index) => {
      this.restaurants.push({ value: item.cname });
      this.valueStatus.push(item.value);
    });
    this.selected.forEach((item,index)=>{
      this.Environment.value.push("")
    })
    

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
.el-col {
  width: 100%;
  margin-top: 15px;
}

.sub-title {
  // display: inline-block;
  position: relative;
  width: 100%;
  // margin: auto 0;
  display: flex;
  .left {
    widows: 250px;
    // background-color: blue;
    display: inline-block;
  }
  .right {
    position: relative;
    // background-color: red;
    display: inline-block;
    flex: 1;
    .el-icon-circle-plus-outline,
    .el-icon-remove-outline {
      // position: absolute;
      font-size: 25px;
      line-height: 40px;
      margin-left: 10px;
      color: #409eff;
      cursor: pointer;
    }
    .el-form{
      width: 100%;
    }
    .el-form-item {
      width: 87%;
    }
    .icon {
      position: absolute;
      display: inline-block;
      width: 13%;
    }

    .el-icon-circle-plus-outline:hover,
    .el-icon-remove-outline:hover {
      color: rgb(128, 186, 252);
    }
    .el-form {
      display: inline-block;
      .el-form-item {
        display: inline-block;
        .el-form-item__content {
          display: inline-block;
          .el-input {
            display: inline-block;
          }
        }
      }
    }
  }
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