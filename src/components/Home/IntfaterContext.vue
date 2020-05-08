<template>
  <div class="IR">
    <div class="title">
      <span class="t-info">基本信息</span>
      <div class="Environment">
        <el-form class="top-el-form" :model="model">
          <el-form-item label label-width="63px" label-height="20px" class="top-eft">
            <el-select v-model="model.postMethods">
              <el-option
                v-for="(item,index) in dataList.methods"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <span class="el-icon-plus EnvironmentIcon" @click="EnvironmentIcon()"></span>
          </el-form-item>
        </el-form>
      </div>
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
            <el-select v-model="model.resType">
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
        <el-button type="primary" size="small" @click="mockRequests()">
          <span class="mockRequests"></span>&#12288;接口请求
        </el-button>
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
        <el-button type="primary" size="small" class="mockRequestsButton" @click="mockStatus=true">
          <span class="mockRequests"></span>&#12288;mock返回数据
        </el-button>
      </div>
      <div class="mockData" v-if="mockStatus">
        <mock-box :styleCode="styleCode" :statusCode.sync="mockStatus" v-slot:mockData>
          <div class="mockDataTitle">
            <h3 style="text-align:center">mock数据返回</h3>
          </div>
          <div class="mockDataBody">
            <div class="mockDataBody1">
              <template>
                <span class="t1">选择返回类型：</span>
                <el-radio v-model="mockRadio" label="1">文档返回</el-radio>
                <el-radio v-model="mockRadio" label="2">自定义返回</el-radio>
              </template>
            </div>
            <div class="mockDataBody2">
              <span class="t2">自定义返回数据：</span>
              <div v-if="mockRadio==1">
                <!-- <el-form :model="mockDatas" :rules="rulesMock" ref="mockDataRef" >
                <el-form-item prop="mockData">-->
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 6, maxRows: 6}"
                  placeholder="请输入标准的json数据"
                  v-model="mockDatas.mockData"
                  resize="none"
                  clearable
                ></el-input>
                <!-- </el-form-item>
                </el-form>-->
              </div>
              <div v-else>
                <el-form :model="mockDatas" :rules="rulesMock" ref="mockDataRef">
                  <el-form-item prop="mockData">
                    <el-input
                      type="textarea"
                      :autosize="{ minRows: 6, maxRows: 6}"
                      placeholder="请输入标准的json数据"
                      v-model="mockDatas.mockData"
                      resize="none"
                      clearable
                    ></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="mockDataFoot">
            <el-button type="primary" size="small" @click="mockStatus=false">取消</el-button>
            <el-button type="primary" size="small" @click="mockDataSubmit()">确认</el-button>
          </div>
        </mock-box>
      </div>
      <div class="hd-com">
        <keep-alive>
          <component
            :is="bindCom2"
            ref="child"
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
            <!-- <span class="colorCode3">新增环境变量</span> -->

            <el-button type="primary" size="small" @click="clickEnvironment()" class="addCode">
              <span>添加变量</span>
            </el-button>

            <environment-box
              v-slot:environment
              :styleCode="environmentStyle"
              v-if="EnvironmentStatus"
            >
              <div class="environments" v-if="environments">
                <div class="environmentsHeader" style="text-align:center">
                  <h2>添加环境</h2>
                </div>
                <div class="environmentsbody">
                  <div class="environmentsName" v-for="(item,index) in Environments" :key="index">
                    <div
                      @click="EnvironmentsMethod(item.children,item.name);addStatus=1;EnvironmentsIndex=index"
                    >
                      <span class="name">{{item.name}}</span>
                    </div>

                    <div class="EnvironmentsFloat" @click="environmentsDelete(index)">
                      <!-- <span class="environmentsType" v-if="item.type==0 ">环境变量</span>
                      <span class="environmentsType" v-else>全局变量</span>-->
                      <span class="environmentsDelete el-icon-close"></span>
                    </div>
                  </div>
                </div>

                <div class="environmentsFoot">
                  <el-button
                    type="primary"
                    class="environmentsBottom"
                    size="small"
                    @click="environments=false;
                    EnvironmentStatused=true;
                    EnvironmentStatus=true;
                    environmentType=0;
                    addStatus=0
                    "
                  >添加</el-button>
                  <el-button
                    type="primary"
                    class="environmentsBottom"
                    size="small"
                    @click="environments=false;
                    EnvironmentStatused=true;
                    EnvironmentStatus=true;
                    environmentType=1;
                    ifEnvironment()
                    "
                  >全局变量</el-button>
                  <el-button
                    type="primary"
                    class="environmentsBottom"
                    size="small"
                    @click="EnvironmentStatus=false;
                    environments=false;
                    ;
                    "
                  >关闭</el-button>
                </div>
              </div>

              <div class="enviromentClass" v-if="EnvironmentStatused">
                <div class="environmenttitle" style="text-align:center">
                  <h2 style="margin: 19px 30px;" v-if="environmentType==0">环境变量</h2>
                  <h2 style="margin: 19px 30px;" v-if="environmentType==1">全局变量</h2>
                </div>
                <div class="addEnvironmentName" v-if="environmentType==0">
                  <div>Environment Name</div>
                  <div>
                    <input class="addEnvironmentInput" v-model="Environmentname" />
                  </div>
                </div>
                <div class="environmentbody">
                  <el-table :data="EnvironmentList" border style="width: 100%; margin-top: 20px">
                    <el-table-column label width="59">
                      <template slot-scope="scope">
                        <span
                          class="environmentDelete el-icon-close"
                          @click="environmentDelete(scope.$index)"
                        ></span>
                      </template>
                    </el-table-column>
                    <el-table-column label="key" prop="key">
                      <template slot-scope="scope">
                        <input class="input" v-model="EnvironmentList[scope.$index].key" />
                      </template>
                    </el-table-column>
                    <el-table-column label="value" prop="value">
                      <template slot-scope="scope">
                        <input v-model="EnvironmentList[scope.$index].value" />
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <div class="environmentFoot">
                  <el-button
                    v-if="addStatus==0"
                    type="primary"
                    class="environmentBottom"
                    size="small"
                    @click="EnvironmentUpdate()"
                  >添加</el-button>
                  <el-button
                    v-if="addStatus==1"
                    type="primary"
                    class="environmentBottom"
                    size="small"
                    @click="EnvironmentUpdate()"
                  >更新</el-button>
                  <el-button
                    type="primary"
                    class="environmentBottom"
                    size="small"
                    @click="EnvironmentInsert()"
                  >新增</el-button>
                  <el-button
                    type="primary"
                    class="environmentBottom"
                    size="small"
                    @click="EnvironmentStatus=true;
                    EnvironmentStatused=false;
                    environments=true;
                    EnvironmentClear()"
                  >返回</el-button>
                  <el-button
                    type="primary"
                    class="environmentBottom"
                    size="small"
                    @click="environments=false;
                    EnvironmentStatused=false;
                    EnvironmentStatus=false;
                    EnvironmentClear()"
                  >关闭</el-button>
                </div>
              </div>
            </environment-box>
          </div>
          <!-- <el-col :span="12"> -->
          <!-- <div class="sub-title" v-for="(item,index) in selected" :key="index">
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
                    <span
                      class="el-icon-remove-outline"
                      @click="removeEnvironment(index)"
                      :disabled="disabled"
          ></span>-->

          <!-- el-icon-remove-outline
                    <span class="el-icon-circle-plus-outline" @click="addEnvironment(index)"></span>
                  </div>
                </el-form>
              </div>
          </div>-->
          <br />
          <!-- </el-col> -->
        </el-row>
        <!-- {{selected}} -->
      </div>
      <div class="pd-title">
        <span class="colorCode3">返回数据</span>
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
      <el-button type="primary" size="small" @click="Submit()">确认</el-button>
    </div>
  </div>
</template>

<script>
// import  headerCom from "./IrPost/postHeader.vue"
// import  dataCom from "./IrPost/PostData"
import {
  postMethods,
  SelectFile,
  EditInterfaceDetail,
  MockPost,
  MockResData
} from "../../axios/api.js";
import { Message } from "element-ui";
import storage from "../../libs/storage";
export default {
  components: {
    "header-com": () => import("./IrPost/postHeader.vue"),
    "data-com": () => import("./IrPost/PostData"),
    "header-com2": () => import("./IrPost/postHeader.vue"),
    "data-com2": () => import("./IrPost/PostData"),
    "message-box": () => import("../public/MessageBox.vue"),
    "environment-box": () => import("../public/MessageBox.vue"),
    "mock-box": () => import("../public/MessageBox.vue")
  },
  data() {
    return {
      mockDatas: {
        mockData: null
      },
      mockRadio: "1",
      mockStatus: false,
      // postIndent:[],
      l: [], //将后台返回数据转化为一级目录的数据
      disabled: false,
      environmentType: 1, //0是环境变量  1是全局变量
      Environment: {
        value: []
      },
      addStatus: 0, //判断是新增还是更新 0为新增 1为更新  返回或者关闭改为null
      environments: false, //环境名
      Environmentname: "",
      EnvironmentsIndex: null, //点击名称进入变量列表时的index
      Environments: [
        //环境变量列表
        {
          name: "测试环境1",
          id: 1,
          type: 1,
          value: "https://www.baidu.com",
          children: [
            {
              key: "key",
              value: "value"
            },
            {
              key: "key",
              value: "value"
            }
          ]
        },

        {
          name: "测试环境2",
          id: 2,
          type: 0,
          value: "https://www.baidu.com",
          children: [
            {
              key: "key",
              value: "value"
            }
          ]
        },
        {
          name: "测试环境3",
          id: 3,
          type: 0,
          value: "https://www.baidu.com",
          children: [
            {
              key: "key",
              value: "value"
            }
          ]
        },
        {
          name: "测试环境4",
          id: 4,
          type: 0,
          value: "https://www.baidu.com",
          children: [
            {
              key: "key",
              value: "value"
            }
          ]
        },
        {
          name: "测试环境5",
          id: 5,
          type: 0,
          value: "https://www.baidu.com",
          children: [
            {
              key: "key",
              value: "value"
            }
          ]
        },
        {
          name: "测试环境6",
          id: 6,
          type: 0,
          value: "https://www.baidu.com",
          children: [
            {
              key: "key",
              value: "value"
            }
          ]
        },
        {
          name: "测试环境7",
          id: 7,
          type: 0,
          value: "https://www.baidu.com",
          children: [
            {
              key: "key",
              value: "value"
            }
          ]
        }
      ],
      globalVariables: [], //提交时把Environments里type=1的独立出来---返回时加入进去
      EnvironmentList: [],
      EnvironmentStatus: false,
      EnvironmentStatused: false,
      environmentStyle: "height:700px;width:700px",
      // EnvironmentAdd: [0],
      valueStatus: [], //存储环境变量临时值  [{"value":value}]
      restaurants: [], //将对象所有key放到一个列表--先把后端返回的内容的key全部组成一个数组放到这里，
      selected: [{ keys: "", value: "" }],
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
      rulesMock: {
        mockData: [
          { required: true, message: "请输入标准的json数据", trigger: "blur" }
        ]
      },

      //后台返回的数据
      dataList: {
        methods: null,
        type: null,
        resType: null,

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
      //只有一级的数据包含id和parentId
      //前端输入返回请求头字段

      postheaders: [],
      postDatas: [],
      resHeaders: [],
      resDatas: [],
      requestsResDatas: [
        //  实际请求返回参数
      ],
      type: [
        { id: 1, name: "string" },
        { id: 2, name: "number" },
        { id: 3, name: "boolean" },
        { id: 4, name: "object" },
        { id: 5, name: "array" },
        { id: 6, name: "file" },
        { id: 7, name: "null" }
      ]
    };
  },
  methods: {
    addEnvironment(index) {
      this.selected.splice(index + 1, 0, { keys: "e", value: "t" });

      this.Environment.value.splice(index + 1, 0, "t");
      this.restaurants.splice(index + 1, 0, "");
      this.valueStatus.splice(index + 1, 0, "");
      console.log(this.postheaders);
    },
    removeEnvironment(index) {
      if (this.selected.length == 1) {
        // document.querySelector(".el-icon-remove-outline").style.color="#606266"
        this.disabled = "disabled";
      } else {
        this.selected.splice(index, 1);
        this.Environment.value.splice(index, 1);
        this.restaurants.splice(index, 1);
        this.valueStatus.splice(index, 1);
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
      var l = [];
      this.restaurants.forEach((item1, index1) => {
        l.push(item1.value);
      });
      this.selected[index].value = this.valueStatus[l.indexOf(item)];
      this.Environment.value.splice(index, 1, this.selected[index].value);
    },
    isValid(newObj, oldObj) {
      //导入数据格式校验
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
      //确认json数据提交--判断是导入到什么参数
      //  postType判断类型   postJson临时绑定上传的数据   postJHeader一级的请求头数据
      console.log(this.postType);
      try {
        switch (this.postType) {
          case "header-com":
            this.postJHeader = JSON.parse(this.postJson);
            this.isValid(this.postJHeader, this.postheaders);
            var dataCode = JSON.parse(JSON.stringify(this.postheaders));
            var a = this.addObjectSatrt(dataCode); //该请求是在提交数据的时候才做处理  a是标准的json数据--
            console.log(a);
            break;
          case "data-com":
            this.postJData = JSON.parse(this.postJson); //postJson导入的标准json数据
            this.isValid(this.postJData, this.postDatas); //postJData新数据 this.postDatas老数据
            var dataCode = JSON.parse(JSON.stringify(this.postDatas));
            var a = this.addObjectSatrt(dataCode);
            // console.log("导入成功后处理的数据",JSON.stringify(a));
            // this.postDatas=a
            // var  c=this.SplitData(a)
            // console.log("haha",JSON.stringify(c))
            // // var postDataIndent=this.$refs.child.indent

            // console.log(this.$refs.child.indent)
            // console.log("postDatas最终数据结构",JSON.stringify(this.postDatas))
            break;
          case "header-com2":
            this.resJHeader = JSON.parse(this.postJson);
            this.isValid(this.resJHeader, this.resHeaders); //this.postDatas老数据   postJData新数据
            var dataCode = JSON.parse(JSON.stringify(this.resHeaders));
            var a = this.addObjectSatrt(dataCode);
            console.log(a);
            break;
          case "data-com2":
            this.resJData = JSON.parse(this.postJson);
            this.isValid(this.resJData, this.resDatas); //this.postDatas老数据   postJData新数据
            // var dataCode = JSON.parse(JSON.stringify(this.resDatas));
            // var a = this.addObjectSatrt(dataCode);

            // console.log(a);
            // this.resDatas=a
            break;
          default:
            open3("未知错误，请重新上传");
        }
      } catch (e) {
        this.open3("数据格式有误,请认真检查后上传", "warning");
      }
    },

    SplitData(a) {
      var l = [];
      //数据库存的是父子id
      //将父子id的列表转化拆分成全部为一级目录的父子列表
      if (a != null || a != undefined) {
        a.forEach((item, index) => {
          if (item.children.length === 0) {
            l.push(item);
          }
          if (item.children.length > 0) {
            var itemCode = JSON.parse(JSON.stringify(item));

            itemCode.children.splice(0, itemCode.children.length);
            l.push(itemCode);
            this.SplitDataChild(l, item.children);
          }
        });
        return l;
      }
    },
    SplitDataChild(l, a) {
      a.forEach((item, index) => {
        if (item.children.length === 0) {
          l.push(item);
        }
        if (item.children.length > 0) {
          var itemCode = JSON.parse(JSON.stringify(item));

          itemCode.children.splice(0, itemCode.children.length);
          l.push(itemCode);
          this.SplitDataChild(l, item.children);
        }
      });
    },

    addObjectSatrt(dataCode) {
      //在提交请求是将导入的数据处理成标准的json
      var postheadersCommit = [];
      for (var v = 0; v < dataCode.length; v++) {
        //第一次遍历--将所有parentId==0的push到新列表-全是顶级
        if (dataCode[v].parentId == 0) {
          postheadersCommit.push(dataCode[v]);
          dataCode.splice(v, 1);
          v--;
        }
      }
      return this.addObject(dataCode, postheadersCommit); //push完了之后执行这个方法-dataCode原始数据（只有一级的）
    },
    addObject(data, postheadersCommit) {
      for (var m = 0; m < postheadersCommit.length; m++) {
        for (var n = 0; n < data.length; n++) {
          if (postheadersCommit[m].id == data[n].parentId) {
            postheadersCommit[m].children.push(data[n]);
            data.splice(n, 1);
            n--;
          }
        }

        if (postheadersCommit[m].children.length > 0) {
          this.addObject(data, postheadersCommit[m].children);
        }
      }
      return postheadersCommit;
    },

    jsonMethod(newData, oldData) {
      //newData传进来的json数据
      var falg = 0;
      var fatherList = Object.keys(newData);
      console.log("fatherList", fatherList);
      fatherList.forEach((item, index) => {
        var id = oldData.length + 1; //改过
        if (typeof newData[item] == "object") {
          if (newData[item] instanceof Object) {
            var typeCode = "object";
            if (newData[item] instanceof Array) {
              var typeCode = "Array";
            }
          }
          oldData.splice(oldData.length, 0, {
            cname: item,
            isrequired: "ture",
            type: typeCode,
            detail: "",
            id: id,
            parentId: 0,
            children: [],
            mockValue: ""
          }); //如果是对象则先把这个字段加入对应列表
          this.$refs.child.indent.push(falg); //如果是对象则先把这个字段加入对应的边距列表，
          this.forE(newData[item], falg + 15, oldData, id); //然后继续遍历其下的内容  ---去掉newData参数
        } else {
          oldData.splice(oldData.length, 0, {
            cname: item,
            isrequired: "ture",
            type: typeof item,
            detail: "",
            id: oldData.length + 1, //改动
            parentId: 0,
            children: [],
            mockValue: ""
          });
          this.$refs.child.indent.push(falg);
        }
      });
    },
    forE(obj, falg, oldData, parentId) {
      // debugger
      //改动
      // 三种情况  1 对象包含list  list包含对象   对象list并存
      if (obj instanceof Array) {
        //判断对象是否为列表
        //如果是一个list--首先得记住他的父id或者是属于第几层循环
        var n = obj.length - 1;
        obj.splice(0, n);
        //以上两句是   列表里面一般都是包含不同的对象--但是每个对象的字段名字都是一样的-我们只需要最后一个就得字段就可以了
        obj.forEach((item, index) => {
          if (typeof obj[index] == "object") {
            // oldData.splice({ cname: item, isrequired: "ture", type: "ture", detail: "" })  //如果是对象则先把这个字段加入对应列表
            // this.$refs.child.indent.push(falg) //如果是对象则先把这个字段加入对应的边距列表，
            this.forE(obj[index], falg, oldData, oldData.length); //然后继续遍历其下的内容  gaihuo
          } else {
            oldData.splice(oldData.length, 0, {
              cname: item,
              isrequired: "ture",
              type: typeof item,
              detail: "",
              id: oldData.length + 1,
              parentId: parentId,
              children: [],
              mockValue: ""
            });
            this.$refs.child.indent.push(falg);
          }
        });
      } else {
        Object.keys(obj).forEach((item, index) => {
          //如果是非列表
          //如果里面包含字典
          if (typeof obj[item] == "object") {
            //是一个对象
            var typeCode = typeof obj[item]; // 定义类型
            if (obj[item] instanceof Array) {
              //如果是列表
              var typeCode = "Array"; //定义类型为列表
            }
            var id = oldData.length + 1; //改过     id等于oldData也就是存解析数据列表的长度-也就是最大id+1
            oldData.splice(oldData.length, 0, {
              //如果是对象则先把这个key加入对应列表
              cname: item,
              isrequired: "ture",
              type: typeCode,
              detail: "",
              id: id,
              parentId: parentId,
              children: [],
              mockValue: ""
            });
            this.$refs.child.indent.push(falg); //如果是对象则先把这个字段加入对应的边距列表，
            this.forE(obj[item], falg + 15, oldData, id); //然后继续遍历其下的内容
          } else {
            //如果里面只有键值对-则直接把每个key插入即可
            oldData.splice(oldData.length, 0, {
              cname: item,
              isrequired: "ture",
              type: typeof item,
              detail: "",
              id: oldData.length + 1,
              parentId: parentId,
              children: [],
              mockValue: ""
            });
            this.$refs.child.indent.push(falg);
          }
        });
      }
      console.log(oldData);
    },
    EnvironmentsMethod(item, name) {
      console.log(name);
      //将环境大列表的类容push到环境列表
      console.log(JSON.stringify(item));
      this.EnvironmentList.splice(0, this.EnvironmentList.length);
      this.Environmentname = name;
      item.forEach((item1, idnex) => {
        this.EnvironmentList.push(item1);
      });
      // this.EnvironmentList.push({ key: "", value: "" });
      this.environments = false;
      this.EnvironmentStatused = true;
    },
    EnvironmentInsert() {
      //sasa
      this.EnvironmentList.push({ key: "", value: "" });
    },
    EnvironmentUpdate() {
      console.log("this.addStatus", this.addStatus);
      console.log("this.EnvironmentList", this.EnvironmentList);
      //新增变量-更新到主Environments并提交到后端保存
      if (this.Environmentname == "") {
        // this.addStatus=0
        this.open3("名称不能为空", "warning");
      } else {
        if (this.addStatus == 0) {
          //状态等于0就是新增环境以及对应变量
          var name = this.Environmentname;
          var indexCode = this.Environments.length;
          //现在环境列表插入父级
          this.Environments.push({
            name: name,
            id: indexCode,
            type: this.environmentType,
            children: []
          });
          // console.log(JSON.stringify(this.EnvironmentList),"---")
          this.EnvironmentList.forEach((item, index) => {
            console.log(item, indexCode, this.Environments.length);
            this.Environments[indexCode].children.push(item);
          });
          this.open3("添加成功", "success");
          this.Environmentname = ""; //名称置空
          this.EnvironmentStatused = false; //隐藏变量页面
          this.environments = true; //打开环境页面
          this.EnvironmentList.splice(0, this.EnvironmentList.length); //置空EnvironmentList
          this.addStatus = null; //重置添加类型
          console.log(this.Environments);
        }
      }
      if (this.addStatus == 1) {
        //状态等于1就是在原有的基础上更新  首先直接提交给后台-页面处理-先删除环境列表原来的-然后在
        //提交请求成功之后
        var name = this.Environmentname;
        this.Environments[this.EnvironmentsIndex].name = name;
        //以上是如果用户修改环境名称
        this.EnvironmentList.forEach((item, index) => {
          this.Environments[this.EnvironmentsIndex].children.splice(
            index,
            1,
            item
          );
        });

        console.log(this.Environments);
        this.open3("更新成功", "success");
        this.Environmentname = "";
        this.EnvironmentStatused = false;
        this.environments = true;
        this.EnvironmentList.splice(0, this.EnvironmentList.length);
        this.addStatus = null;
      }
    },
    ifEnvironment() {
      var l = [];
      this.Environments.forEach((item, index) => {
        l.push(item.type);
      });
      console.log(l);
      if (l.indexOf(1) >= 0) {
        console.log("_______________");
        this.addStatus = 1;
        this.EnvironmentsIndex = l.indexOf(1);
        var item = this.Environments[this.EnvironmentsIndex].children;
        var name = this.Environments[this.EnvironmentsIndex].name;
        this.EnvironmentList.splice(0, this.EnvironmentList.length);
        this.Environmentname = name;
        item.forEach((item1, idnex) => {
          this.EnvironmentList.push(item1);
        });
        // this.EnvironmentList.push({ key: "", value: "" });
        this.environments = false;
        this.EnvironmentStatused = true;
      } else {
        console.log("++++++++");
        this.addStatus = 0;
      }

      console.log(this.addStatus);
    },
    EnvironmentClear() {
      this.addStatus = null;
      this.Environmentname = "";
      this.EnvironmentList.splice(0, this.EnvironmentList.length);
    },
    environmentDelete(index) {
      //删除变量
      var indexCode = this.EnvironmentsIndex;
      console.log(indexCode);
      console.log(index, this.Environments[this.EnvironmentsIndex]);
      this.EnvironmentList.splice(index, 1);
      this.Environments[indexCode].children.splice(index, 1);
      //删除环境中的key
    },
    environmentsDelete(index) {
      //删除环境
      this.Environments.splice(index, 1);
    },

    changeBottomColor(event, value) {
      this.postType = value;
      // this.bus.$emit("loading", true);
      if (document.querySelector(".colorCode")) {
        document.querySelector(".colorCode").classList.remove("colorCode");
      }
      event.currentTarget.classList.add("colorCode");

      // if (this.bindCom=="data-com"){
      //   this.bindCom="header-com"
      // }else{
      //   this.bindCom="data-com"
      // }

      // if(value=="header-com"){
      //   this.tableDataCode=this.postheaders
      // }else if(value=="data-com"){
      //   this.postDatasCode=this.postDatas
      // }
      this.bindCom = value;

      // this.bus.$emit("loading", true);
      // debugger
    },
    changeBottomColor2(event, value) {
      this.postType = value;

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
    test() {
      console.log(1);
    },
    open3(msg, status) {
      this.$message({
        message: msg,
        type: status
      });
    },
    clickEnvironment() {
      //点击查看环境变量
      this.EnvironmentStatus = !this.EnvironmentStatus;
      this.environments = !this.environments;
    },
    Submit() {
      console.log("请求接口", this.$refs.child.indent);
      console.log(this.$route.query.childId);
      var dataCode1 = JSON.parse(JSON.stringify(this.postheaders));
      var a1 = this.addObjectSatrt(dataCode1);

      var dataCode2 = JSON.parse(JSON.stringify(this.postDatas));
      var a2 = this.addObjectSatrt(dataCode2);

      var dataCode3 = JSON.parse(JSON.stringify(this.resHeaders));
      var a3 = this.addObjectSatrt(dataCode3);

      var dataCode4 = JSON.parse(JSON.stringify(this.resDatas));
      var a4 = this.addObjectSatrt(dataCode4);

      EditInterfaceDetail({
        id: this.$route.query.childId,
        filesName: this.model.infaterName,
        postMethodsId: this.model.postMethods,
        postTypeId: this.model.postType,
        resTypeId: this.model.resType,
        post_attr: this.model.postAttr,
        interface_detail: this.model.interDetail,
        mock_attr: this.model.mockAttr,
        post_header: JSON.stringify(a1),
        post_data: JSON.stringify(a2),
        res_header: JSON.stringify(a3),
        res_data: JSON.stringify(a4)
        // indent:JSON.stringify(this.$refs.child.indent)
      }).then(res => {
        console.log(this.$parent.updateFiels.fielsName, "111");
        if (res.status === 200) {
          Message.success("更新成功");
          console.log(res.results.res_data);
          this.postheaders = this.SplitData(res.results.post_header);

          this.postDatas = this.SplitData(res.results.post_data);
          this.resHeaders = this.SplitData(res.results.res_header);
          this.resDatas = this.SplitData(res.results.res_data);
          if (res.results.post_methods != null) {
            this.model.postMethods = res.results.post_methods.id;
          }
          if (res.results.post_type != null) {
            this.model.postType = res.results.post_type.id;
          }
          if (res.results.res_type != null) {
            this.model.resType = res.results.res_type.id;
          }

          this.model.infaterName = res.results.filesName;
          //修改左侧导航接口文档名称

          // this.$parent.updateFiels.fielsName=res.results[0].filesName
          this.model.postAttr = res.results.post_attr;
          this.model.interDetail = res.results.interface_detail;
          this.model.mockAttr = res.results.mock_attr;
          if (this.postheaders == null) {
            this.postheaders = [];
          }
          if (this.postDatas == null) {
            this.postDatas = [];
          }
          if (this.resHeaders == null) {
            this.resHeaders = [];
          }
          if (this.resDatas == null) {
            this.resDatas = [];
          }
        }
      });
    },
    mockRequests() {
      var headers = {};
      this.postheaders.forEach((item, index) => {
        headers[item.cname] = item.mockValue;
      });
      var data = {}; //多级需要递归遍历
      this.postDatas.forEach((item, index) => {
        data[item.cname] = item.mockValue;
      });
      MockPost({
        headers: JSON.stringify(headers),
        url: this.model.mockAttr, //这个地址是测试环境地址-不是mock地址，该请求是真实请求
        data: JSON.stringify(data)
      }).then(res => {
        if (Object.keys(res).length >= 0) {
          console.log(res.results);
          this.jsonDemo1 = JSON.stringify(res, null, 4);
          Message.success("接口请求成功");
        } else {
          Message.error("接口请求失败");
        }
      });
    },
    mockDataSubmit() {
      console.log(storage.get("projectId"));
      var obj = {
        id: this.$route.query.childId,
        mock_type: "1",
        mock_data: null
      };
      if (this.mockRadio === "2") {
        this.$refs.mockDataRef.validate(valid => {
          if (valid) {
            obj["mock_type"] = "2";
            obj["mock_data"] = this.mockDatas.mockData;

            if (
              Object.prototype.toString.call(
                JSON.parse(this.mockDatas.mockData)
              ) === "[object Object]"
            ) {
              MockResData(obj).then(res => {
                res.status === 200
                  ? (Message.success(res.msg), (this.mockStatus = false))
                  : Message.error(msg);
              });
            } else {
              Message.error("数据格式错误");
            }
          } else {
            return false;
          }
        });
      }
      if (this.mockRadio === "1") {
        this.mockDatas.mockData != null && this.mockDatas.mockData != ""
          ? Object.prototype.toString.call(
              JSON.parse(this.mockDatas.mockData)
            ) == "[object Object]"
            ? ((obj["mock_data"] = this.mockDatas.mockData),
              MockResData(obj).then(res => {
                res.status === 200
                  ? (Message.success(res.msg), (this.mockStatus = false))
                  : Message.error(msg);
              }))
            : Message.error("请输入标准的json数据,或者清空数据后提交")
          : MockResData(obj).then(res => {
              res.status === 200
                ? (Message.success(res.msg), (this.mockStatus = false))
                : Message.error(msg);
            });
      }
    },
    EnvironmentIcon() {
      this.clickEnvironment();
    }
  },

  beforeMount() {
    this.bindCom = "header-com";
    // this.restaurants=[]
    // this.postheaders.forEach((item,index)=>{
    //   this.restaurants.push({"value":item.cname})
    // })
    // this.bindCom
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
    // if (this.selected.length == 1) {
    //   document.querySelector(".el-icon-remove-outline").style.color = "#606266";
    //   this.disabled = "disabled";
    // } else {
    //   document.querySelector(".el-icon-remove-outline").style.color = "#409eff";
    // }
    if (this.jsonDemo1) {
    } else {
      this.jsonDemo1 = this.jsonDemo;
    }
    console.log(this.$route.query, "---");
  },
  mounted() {

    this.restaurants = [];
    this.valueStatus = [];
    this.requestsResDatas.forEach((item, index) => {
      this.restaurants.push({ value: item.cname });
      this.valueStatus.push(item.value);
    });
    this.selected.forEach((item, index) => {
      this.Environment.value.push("");
    });
    console.log(this.$route, "---");

    postMethods() //获取请求方法 请求类型 响应类型列表数据
      .then(res => {
        if (res.status == 200) {
          this.dataList.methods = res.res_post_methods;
          this.dataList.type = res.res_post_type;
          this.dataList.resType = res.res_res_type;

        } else {
          Message.error("服务器异常");
        }
      })
      .catch(res => {
        Message.error(res);
      });
    //子组件
  },

  watch: {
    $route: {
      handler: function(newValue, oldValue) {},
      deep: true
    }
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
  min-width: 500px;
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
    .el-form {
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
.pd-title .el-button {
  float: right;
}
.pd-title .addCode {
  position: relative;
  top: -30px;
}
// .environmentbody  .cell input{
//   // position: absolute ;

//   // margin: 0 2px;

//   // height: 100%;
// }
.environments {
  margin: 0 30px;
}
.environmentsHeader {
  border-bottom: 1px solid #c9b2b2;
}
.environmentsbody {
  height: 550px;
  border-bottom: 1px solid #c9b2b2;
  overflow-y: auto;
}
.environmentsFoot {
  margin: 30px 0;
  .environmentsBottom {
    margin-left: 10px;
  }
}
.environmentsbody .environmentsName .name {
  font-size: 15px;
}
.environmentsbody .environmentsName {
  cursor: pointer;
  border-bottom: 1px solid #c9b2b2;
  padding: 15px 0;
  position: relative;
}

.environmentsbody .environmentsName:hover > .name {
  color: #409eff;
}
.EnvironmentsFloat {
  display: inline-block;
  right: 0px;
  position: absolute;
  top: 0px;
}

// .EnvironmentsFloat  {
//   // padding: 0 20px 4px 20px;

// }
.EnvironmentsFloat :hover {
  background: grey;
}
.environmentsType {
  padding: 16px 0px !important;
  margin-right: 0px !important;
  color: rgb(196, 193, 193);
}
.environmentsDelete {
  padding: 18.5px 15px !important;
  margin-right: 0px !important;
  margin-left: 10px !important;
}
.environmentsName:hover .name {
  color: #1e87f0;
}

.enviromentClass {
  margin: 0 30px;
}
.environmentbody {
  margin: 10px 0;
  height: 470px;
  overflow-y: auto;
  border-bottom: 1px solid #c9b2b2;
  border-top: 1px solid #c9b2b2;
}
.environmentFoot {
  margin: 30px 0;
}
.environmentFoot .environmentBottom {
  margin-left: 10px;
}

.addEnvironmentInput {
  width: 100%;
  height: 20px;
  margin-top: 10px;
  border-radius: 2px;
  border: 2px solid #ebeef5;
}

.Environment {
  position: relative;
  float: right;
  right: -6px;
  /* top: 10px; */
  top: -14px;
  margin-bottom: -30px;
  .EnvironmentIcon {
    font-size: 15px;
    padding: 12px;
    margin-left: 5px;
  }
  .EnvironmentIcon:hover {
    background: rgb(194, 193, 193);
    color: #409eff;
  }
  .mockRequestsButton {
    padding: 0px 0px !important ;
  }
}
</style>
<style>
.mockData .mockDataBody1 {
  margin: 20px 40px;
  font-size: 17px;
}

.mockData .mockDataBody .mockDataBody2 {
  font-size: 17px;
  margin: 20px;
}

.mockData .mockDataBody .mockDataBody2 .t2 {
  display: block;
  margin-bottom: 10px;
}

.mockDataFoot {
  text-align: center;
}
.mockRequestsButton {
  padding: 9px 0px !important ;
}
.IR .el-form-item__label {
  color: #666;
  text-align: right;
  padding: 0;
  margin: 0;
}
.IR .el-input {
  margin-left: 5px;
}
/* .environmentbody .cell{
    position: relative;
    width: 100%;
    height: 100%;
    
} */
.environmentbody
  .el-table
  .el-table__body-wrapper
  .el-table__body
  tbody
  tr:hover
  > td {
  background-color: #ffffff !important;
}
/* .environmentbody
  .el-table
  .el-table__body-wrapper
  .el-table__body
  tbody tr .el-table_3_column_14  {
    padding: none !important;
  } */

/* .environmentbody .el-table .el-table__body-wrapper .el-table__body .el-table__row  {
  position: relative;
  height: 100%;
} */

.environmentbody .el-table__header .has-gutter .is-leaf .cell {
  text-align: center;
}

.environmentbody
  .el-table
  .el-table__body-wrapper
  .el-table__body
  .el-table__row
  .cell
  input {
  width: 100%;
  /* height: 95%;
  top: 0px; */
  outline: none;
  border-color: #ffffff !important;
  border-style: none;
}

/* .environmentbody
  .el-table
  .el-table__body-wrapper
  .el-table__body
  tbody
  .el-table__row
  .cell {
  width: 100%;
  top: 0px;
} */

/* .environmentbody
  .el-table
  .el-table__body-wrapper
  .el-table__body
  .el-table__row
  .el-table_3_column_14  {
    position: relative;
  } */
.environmentbody .el-table .el-table__body-wrapper .el-table__body tbody tr td {
  padding: 0 !important;
}
</style>