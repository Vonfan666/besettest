<template>
  <div class="manageCase">
    <div class="manageCase-left">
      <div class="resize-bar"></div>
      <div class="resize-line"></div>
      <div class="manageCase-left-context">
        <!-- <div class="leftTitle">
                <span>接口分组</span>
                <span>全部接口</span>
        </div>-->
        <!-- 左侧顶部搜索 -->
        <div class="it-search">
          <el-form>
            <el-form-item>
              <el-input
                prefix-icon="el-icon-search"
                v-model="searchName"
                placeholder="搜索接口……"
                clearable
                @input="searchNameMethod()"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="searchPopOver" v-if="statusIng.searchStatus">
          <div class="search-context">
            <p
              v-for="(item,index) in searchList"
              :key="index"
              @click="searchResult(item.fid,item.id)"
            >{{item.name}}</p>
          </div>
        </div>
        <!-- 新建一级分组 -->
        <div class="addFiles" @click="addFiles()" v-show="!statusIng.searchStatus">
          <span class="el-icon-plus"></span>
          <span>新建文件夹</span>
        </div>

        <!-- 文档内容 -->
        <div class="FilesContext" v-show="!statusIng.searchStatus">
          <div class="fileName" v-for="(item,index) in caseGroupList" :key="index">
            <div class="fileName-father" @click="isOpen($event,index)">
              <span :class="fileNameIcon[index]">{{item.name}}</span>
              <div class="addTextFather">
                <!-- <div class="addtext-code">
                    <span class="el-icon-plus it-icon-addtext"></span>
                    <span class="it-box"  style="display:none">删除</span>
                </div>-->
                <el-dropdown class="it-text-pop" @command="GroupFatherAction">
                  <span class="el-dropdown-link">
                    <i class="el-icon-arrow-down"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command="['a',item.id,index,'father']">添加</el-dropdown-item>
                    <el-dropdown-item :command="['b',item.id,index,'father']">重命名</el-dropdown-item>
                    <!-- <el-dropdown-item :command="['c',item.id,index]">复制</el-dropdown-item> -->
                    <el-dropdown-item :command="['c',item.id,index,'father']">删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
            <div
              class="fileNameChild"
              v-for="(item1,index1) in item.Clist"
              :name="item1.id"
              :key="index1"
              @click="changeColor($event)"
              v-show="fileNameChildStatus[index]"
            >
              <span class="file">{{item1.name}}</span>

              <div class="addTextChild">
                <!-- <div class="addtext-code">
                    <span class="el-icon-plus it-icon-addtext"></span>
                    <span class="it-box"  style="display:none">删除</span>
                </div>-->
                <el-dropdown class="it-text-pop" @command="GroupChildAction">
                  <span class="el-dropdown-link">
                    <i class="el-icon-arrow-down"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <!-- <el-dropdown-item :command="['a',item1.id,index1]">添加</el-dropdown-item> -->
                    <el-dropdown-item :command="['b',item.id,index,item1.id,index1,'child']">重命名</el-dropdown-item>
                    <!-- <el-dropdown-item :command="['c',item.id,index]">复制</el-dropdown-item> -->
                    <el-dropdown-item :command="['c',item.id,index,item1.id,index1,'child']">删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="manageCase-right">
      <div class="right-title">
        <div class="right-title-detail">
          <div class="title-detail">
            <span class="tt">基本信息</span>
          </div>
          <div class="title-detail-context">
            <el-form :model="datas" :rules="rules" ref="refFrom" label-width="100px">
              <div class="interfaName-1">
                <el-form-item label="选择接口" prop>
                  <el-select v-model="datas.isInterfaceId" filterable placeholder="请选择接口文档">
                    <el-option
                      v-for="(item,index) in filesName"
                      :key="index"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="interfaName-1">
                <el-form-item label="选择分组" prop="caseGroupId">
                  <el-select v-model="datas.caseGroupId" filterable placeholder="请选择用例分组">
                    <el-option
                      v-for="(item,index) in caseGroupList"
                      :key="index"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div></div>
              <div class="interfaName">
                <el-form-item label="用例名称" prop="interfaceName">
                  <el-input placeholder="请输入接口名称" v-model="datas.interfaceName" v-if="inputStatus"></el-input>
                  <!-- <div contenteditable="true" class="inputStatus" v-if="!inputStatus" :model="datas.interfaceName">
                    <span class="colors">111</span>
                    <span>3232</span>
                  </div>-->
                </el-form-item>
              </div>
              <div class="interfaName">
                <el-form-item label="用例状态" prop>
                  <el-select v-model="datas.interfaceIsOk">
                    <el-option
                      v-for="(item,index) in interfaceIsOkList"
                      :key="index"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="interfaName-2">
                <el-form-item label="请求地址" prop="urlAttr">
                  <div class="postAttr-1">
                    <el-select v-model="datas.urlHttp">
                      <el-option
                        v-for="(item,index) in urlHttp"
                        :key="index"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </div>
                  <div class="postAttr-4">
                    <el-select v-model="datas.urlPostType" prop="urlPostType">
                      <el-option
                        v-for="(item,index) in urlPostType"
                        :key="index"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </div>

                  <div class="postAttr-2">
                    <el-input placeholder="地址：192.168.0.0" v-model="datas.urlAttr"></el-input>
                  </div>
                  <div class="postAttr-3">
                    <el-input placeholder="端口：8080" v-model="datas.urlPort"></el-input>
                  </div>
                </el-form-item>
              </div>
              <div class="interfaName-3">
                <el-form-item label="用例描述" prop>
                  <el-input
                    :autosize="{minRows:4,maxRows:4}"
                    resize="none"
                    type="textarea"
                    placeholder="请输入用例描述 如:验证正确账号,错误密码情况下,接口返回情况"
                    v-model="datas.caseDetail"
                  ></el-input>
                </el-form-item>
              </div>
            </el-form>
          </div>
          <div class="title-detail-class">
            <div class="title-detail">
              <span class="tt">请求参数</span>
            </div>
            <div class="requests-detail">
              <div class="requests-title">
                <span @click="clickReqTitle($event,0)" class="t2">前置操作</span>
                <span @click="clickReqTitle($event,1)" class="t2">请求头</span>
                <span @click="clickReqTitle($event,2)" class="t2">请求参数</span>
                <span @click="clickReqTitle($event,3)" class="t2">后置操作</span>
              </div>
              <div class="requestsContext">
                <div class="requestsFrom" v-show="statusIng.requestsStatus[0]">
                  <div class="t1">
                    <span class="requestsTitile1">序号</span>
                    <span class="requestsTitile2">操作名称</span>
                    <span class="requestsTitile3">操作类型</span>
                    <span class="requestsTitile4">操作处理</span>
                    <span class="requestsTitile5">操作描述</span>
                  </div>
                  <div class="requestsTitile">
                    <el-form :model="beforeAction" ref="refFrom" class="beforeFrom">
                      <div v-for="(item,index) in beforeAction.keys" :key="item.key">
                        <el-form-item
                          hide-required-asterisk
                          class="requestsTitile1"
                          :prop="'keys.' + index + '.beforeIndex'"
                          :rules="{ required: true, message: '必填' }"
                        >
                          <el-input
                            placeholder="序号"
                            v-model="item.beforeIndex"
                            @change="changeIndex(index,0)"
                          ></el-input>
                        </el-form-item>
                        <el-form-item
                          class="requestsTitile2"
                          :prop="'keys.'+index+ '.beforeName'"
                          hide-required-asterisk
                          :rules="{ required: true, message: '必填' }"
                        >
                          <el-input v-model="item.beforeName" placeholder="条件名称"></el-input>
                        </el-form-item>
                        <el-form-item
                          class="requestsTitile3"
                          :prop="'keys.'+index+ '.beforeType'"
                          hide-required-asterisk
                          :rules="{ required: true, message: '必填' }"
                        >
                          <el-select
                            placeholder="选择处理类型"
                            v-model="item.beforeType"
                            @change="clearBeforePlan(index)"
                          >
                            <el-option
                              v-for="(item1,index1)  in beforeTypeList"
                              :key="index1"
                              :label="item1.name"
                              :value="item1.id"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item
                          class="requestsTitile4"
                          :prop="'keys.'+index+ '.beforePlan'"
                          hide-required-asterisk
                          :rules="{ required: true, message: '必填' }"
                        >
                          <el-select placeholder="选择前置操作" v-model="item.beforePlan">
                            <el-option
                              v-for="(item1,index2)  in selection(index)"
                              :key="index2"
                              :label="item1.name"
                              :value="item1.id"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item class="requestsTitile5">
                          <el-input placeholder="简要描述前置操作" v-model="item.beforeDetail"></el-input>
                        </el-form-item>
                        <!-- <div class="delete">
                      <span @click="addBefore(index)">新增</span>
                      <span @click.prevent="removeBefore(item)">删除</span>
                        </div>-->
                        <!-- v-if="index===beforeAction.keys.length-1" 只有最后一个有添加删除按钮 -->
                        <el-form-item class="delete">
                          <el-button @click.prevent="addDictToList(index,0)">添加</el-button>
                          <el-button @click.prevent="removeListToDict(item,0)" v-if="index!=0">删除</el-button>
                        </el-form-item>
                      </div>
                    </el-form>
                  </div>
                </div>
                <div class="requestsFrom" v-show="statusIng.requestsStatus[1]">
                  <div class="t1">
                    <span class="requestsHeaderTitle">KEY</span>
                    <span class="requestsHeaderTitle">VALUE</span>
                    <span class="requestsHeaderTitle">描述</span>
                  </div>
                  <div class="requestsTitile">
                    <el-form :model="requestsHeader" ref="refFrom" class="beforeFrom">
                      <div v-for="(item,index) in requestsHeader.keys" :key="index">
                        <el-form-item class="headerInput">
                          <el-input
                            v-model="requestsHeader.keys[index].headerKey"
                            clearable
                            placeholder="请输入key"
                          ></el-input>
                        </el-form-item>
                        <el-form-item class="headerInput">
                          <el-input
                            v-model="requestsHeader.keys[index].headerValue"
                            clearable
                            placeholder="请输入value"
                          ></el-input>
                        </el-form-item>
                        <el-form-item class="headerInput">
                          <el-input
                            v-model="requestsHeader.keys[index].headerDetail"
                            clearable
                            placeholder="请输入描述"
                          ></el-input>
                        </el-form-item>
                        <el-form-item class="delete">
                          <el-button @click.prevent="addDictToList(index,1)">添加</el-button>
                          <el-button @click.prevent="removeListToDict(item,1)" v-if="index!=0">删除</el-button>
                        </el-form-item>
                      </div>
                    </el-form>
                  </div>
                </div>
                <div class="requestsFrom" v-show="statusIng.requestsStatus[2]">
                  <div class="t1">
                    <span class="dataTitle1"></span>
                    <span class="dataTitle">Key</span>
                    <span class="dataTitle">Value</span>
                    <span class="dataTitle">操作描述</span>
                    <span class="dataTitle">导入json</span>
                  </div>
                  <div class="requestsTitile">
                    <el-form :model="requestsData" ref="refFrom" class="beforeFrom">
                      <div v-for="(item,index) in requestsData.keys" :key="index">
                        <el-form-item class="dataTitle1">
                          <el-switch
                            v-model="item.isRequestsData"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                          ></el-switch>
                        </el-form-item>
                        <el-form-item class="dataTitle">
                          <el-input v-model="item.dataKey" placeholder="Key"></el-input>
                        </el-form-item>
                        <el-form-item class="dataTitle">
                          <el-input v-model="item.dataValue" placeholder="Value"></el-input>
                        </el-form-item>
                        <el-form-item class="dataTitle">
                          <el-input placeholder="简要描述前置操作" v-model="item.beforeDetail"></el-input>
                        </el-form-item>
                        <!-- <div class="delete">
                      <span @click="addBefore(index)">新增</span>
                      <span @click.prevent="removeBefore(item)">删除</span>
                        </div>-->
                        <!-- v-if="index===beforeAction.keys.length-1" 只有最后一个有添加删除按钮 -->
                        <el-form-item class="delete">
                          <el-button @click.prevent="addDictToList(index,2)">添加</el-button>
                          <el-button @click.prevent="removeListToDict(item,2)" v-if="index!=0">删除</el-button>
                        </el-form-item>
                      </div>
                    </el-form>
                  </div>
                </div>
                <div class="requestsFrom" v-show="statusIng.requestsStatus[3]">
                  <div class="t1">
                    <span class="requestsTitile1">序号</span>
                    <span class="requestsTitile2">操作名称</span>
                    <span class="requestsTitile3">操作类型</span>
                    <span class="requestsTitile4">操作数据</span>
                    <span class="requestsTitile5">操作描述</span>
                  </div>
                  <div class="requestsTitile">
                    <el-form :model="afterAction" ref="refFrom" class="beforeFrom">
                      <div v-for="(item,index) in afterAction.keys" :key="item.key">
                        <el-form-item
                          hide-required-asterisk
                          class="requestsTitile1"
                          :prop="'keys.' + index + '.beforeIndex'"
                          :rules="{ required: true, message: '必填' }"
                        >
                          <el-input
                            placeholder="序号"
                            v-model="item.beforeIndex"
                            @change="changeIndex(index,3)"
                          ></el-input>
                        </el-form-item>
                        <el-form-item
                          class="requestsTitile2"
                          :prop="'keys.'+index+ '.beforeName'"
                          hide-required-asterisk
                          :rules="{ required: true, message: '必填' }"
                        >
                          <el-input v-model="item.beforeName" placeholder="条件名称"></el-input>
                        </el-form-item>
                        <el-form-item
                          class="requestsTitile3"
                          :prop="'keys.'+index+ '.beforeType'"
                          hide-required-asterisk
                          :rules="{ required: true, message: '必填' }"
                        >
                          <el-select placeholder="选择处理类型" v-model="item.beforeType">
                            <el-option
                              v-for="(item1,index1)  in beforeTypeList"
                              :key="index1"
                              :label="item1.name"
                              :value="item1.id"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item
                          class="requestsTitile4"
                          :prop="'keys.'+index+ '.beforePlan'"
                          hide-required-asterisk
                          :rules="{ required: true, message: '必填' }"
                        >
                          <el-select placeholder="选择后置操作" v-model="item.beforePlan">
                            <el-option
                              v-for="(item1,index2)  in beforePlanList"
                              :key="index2"
                              :label="item1.name"
                              :value="item1.id"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item class="requestsTitile5">
                          <el-input placeholder="简要描述后置操作" v-model="item.beforeDetail"></el-input>
                        </el-form-item>
                        <!-- <div class="delete">
                      <span @click="addBefore(index)">新增</span>
                      <span @click.prevent="removeBefore(item)">删除</span>
                        </div>-->
                        <!-- v-if="index===beforeAction.keys.length-1" 只有最后一个有添加删除按钮 -->
                        <el-form-item class="delete">
                          <el-button @click.prevent="addDictToList(index,3)">添加</el-button>
                          <el-button @click.prevent="removeListToDict(item,3)" v-if="index!=0">删除</el-button>
                        </el-form-item>
                      </div>
                    </el-form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <caseAddFiles-box
      v-slot:caseAddFiles
      :styleCode="caseAddFilesBoxStyle"
      v-if="statusIng.caseAddFilesBoxStatus"
    >
      <div class="caseBox" >
        <h3>新建用例分组</h3>

        <div class="caseBoxInput">
          <el-form :model="caseGroupDatats" :rules="rules" ref="refFrom" label-width="80px">
            <el-form-item label="分组名称" prop="addGroupName">
              <el-input v-model="caseGroupDatats.addGroupName"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="caseBoxButton">
          <el-button type="primary" size="small" @click="statusIng.caseAddFilesBoxStatus=false">取消</el-button>
          <el-button type="primary" size="small" @click="caseAddGroupSubmit()">确认</el-button>
        </div>
      </div>
    </caseAddFiles-box>
    <caseAddFiles-box
      v-slot:caseAddInterface
      :styleCode="caseAddFilesBoxStyle"
      v-if="statusIng.caseAddInterfaceBoxStatus"
    >
      <div class="caseBox">
        <h3>{{caseBoxTtile}}</h3>

        <div class="caseBoxInput">
          <el-form :model="caseGroupDatats" :rules="rules" ref="refFrom" label-width="80px">
            <el-form-item :label="caseBoxLable" prop="addInterfaceName">
              <el-input v-model="caseGroupDatats.addInterfaceName"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="caseBoxButton">
          <el-button
            type="primary"
            size="small"
            @click="statusIng.caseAddInterfaceBoxStatus=false"
          >取消</el-button>
          <el-button type="primary" size="small" @click="caseAddInterfaceSubmit()">确认</el-button>
        </div>
      </div>
    </caseAddFiles-box>
    <!-- <caseAddFiles-box
      v-slot:caseAddInterface
      :styleCode="caseAddFilesBoxStyle"
      v-if="statusIng.caseAddInterfaceBoxStatus"
    >
      <div class="caseBox">
        <h3>{{caseBoxTtile}}</h3>

        <div class="caseBoxInput">
          <el-form :model="caseGroupDatats" :rules="rules" ref="refFrom" label-width="80px">
            <el-form-item :label="caseBoxLable" prop="addInterfaceName">
              <el-input v-model="caseGroupDatats.addInterfaceName"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="caseBoxButton">
          <el-button
            type="primary"
            size="small"
            @click="statusIng.caseAddInterfaceBoxStatus=false"
          >取消</el-button>
          <el-button type="primary" size="small" @click="caseAddInterfaceSubmit()">确认</el-button>
        </div>
      </div>
    </caseAddFiles-box>-->
  </div>
</template>

<script>
import globarlRe from "../../libs/reGlobarl";
import { Message } from "element-ui";

import { SelectFile } from "../../axios/api.js";
import storage from "../../libs/storage";

export default {
  components: {
    "caseAddFiles-box": () => import("../public/MessageBox.vue")
  },
  data() {
    return {
      caseBoxLable: "", //点击添加 重命名 的lable
      caseBoxTtile: "", //点击添加 重命名 的title
      commandCode: "", //存储临时变量--command
      caseAddFilesBoxStyle: "height:250px;width:400px", //新建分组长宽
      statusIng: {
        requestsStatus: [true, false, false, false],
        searchStatus: false,
        caseAddFilesBoxStatus: false,
        caseAddInterfaceBoxStatus: false
      },
      inputStatus: 1, //input输入替换成div输入-显示引用的环境变量的颜色
      searchName: "", //接口搜索名称
      searchList: [], //搜索出来的列表
      manageCaseLefStatus: true, //左侧是否展示
      //分组列表,其包含子级用例,当该项目用例分组为空时，则默认展示所有接口分组name
      caseGroupList: [],
      //文件名称箭头方向 el-icon-caret-bottom向下，默认向右
      fileNameIcon: [],
      fileNameChildStatus: [], //添加false数量默认为文件夹个数
      filesName: [
        //后台返回的接口内容,选择之后会自动填充部分数据
        { id: 1, name: "测试文档1" },
        { id: 2, name: "测试文档2" }
      ],
      urlHttp: [
        { id: 1, name: "HTTP" },
        { id: 2, name: "HTTPS" }
      ],

      //用例状态是否编写完成,已完成后台则会执行这个用例，未完成则不会执行
      interfaceIsOkList: [
        { id: 0, name: "未完成" },
        { id: 1, name: "已完成" }
      ],
      //请求类型,后台返回数据
      urlPostType: [
        { id: 1, name: "GET" },
        { id: 2, name: "POST" }
      ],
      //新建分组时的数据
      caseGroupDatats: {
        addGroupName: "", //新建分组的名称
        addInterfaceName: ""
      },
      //提交数据
      datas: {
        isInterfaceId: "", //关联的接口id
        interfaceName: "冯凡", //用例名称
        interfaceIsOk: 0, //当前用例状态
        caseGroupId: "", //用例分组id
        urlHttp: 1, //请求协议
        urlAttr: "", //请求主机地址
        urlPort: "", //端口
        urlPostType: 1, //请求类型
        caseDetail: "" //用例描述
      },
      //前置处理器
      beforeAction: {
        keys: [
          {
            beforeIndex: "", //前置条件中执行顺序
            beforeName: "", //前置条件名称
            beforeType: "", //前置条件类型---如文件操作、数据库操作等
            beforePlan: "", //前置处理--选择文件操作中的具体事务，或者数据库中的具体事务
            beforeDetail: "" //简要描述
          }
        ]
      },
      requestsHeader: {
        keys: [
          {
            headerKey: "", //请求头key
            headerValue: "", //请求头value
            headerDetail: "" //简要描述
          }
        ]
      },
      requestsData: {
        keys: [
          {
            isRequestsData: true, //前置条件中执行顺序
            dataKey: "", //前置条件名称
            dataValue: "", //前置条件类型---如文件操作、数据库操作等
            dataDetail: ""
          }
        ]
      },
      afterAction: {
        keys: [
          {
            beforeIndex: "", //前置条件中执行顺序
            beforeName: "", //前置条件名称
            beforeType: "", //前置条件类型---如文件操作、数据库操作等
            beforePlan: "", //前置处理--选择文件操作中的具体事务，或者数据库中的具体事务
            beforeDetail: "" //简要描述
          }
        ]
      },
      beforeTypeList: [
        {
          id: 1,
          name: "文件处理",
          children: [
            { id: 1, name: "上传文件" },
            { id: 2, name: "文件遍历" }
          ]
        },
        {
          id: 2,
          name: "数据库操作",
          children: [
            { id: 1, name: "修改商品价格" },
            { id: 2, name: "新增待付款订单" },
            { id: 3, name: "订单表同步" },
            { id: 4, name: "添加收货地址" },
            { id: 5, name: "使用优惠券" }
          ]
        },
        {
          id: 3,
          name: "执行py脚本",
          children: []
        },
        {
          id: 4,
          name: "请求接口",
          children: [
            { id: 1, name: "获取token" },
            { id: 2, name: "请求上一个接口" }
          ]
        }
      ],
      beforePlanList: [
        { Pid: 1, id: 1, name: "上传文件" },
        { Pid: 1, id: 2, name: "新增数据" }
      ],
      beforePlanListCode: [],
      rules: {
        interfaceName: [
          { required: true, message: "请选择分组", trigger: "blur" }
        ],
        caseGroupId: [{ required: true, message: "请输入接口名称" }],
        urlHttp: [{ required: true, message: "请选择协议" }],
        urlAttr: [{ required: true, message: "请填写主机地址" }],
        urlPostType: [{ required: true, message: "必填" }],
        beforeIndex: [{ required: true, message: "必填" }],
        beforeName: [{ required: true, message: "必填" }],
        beforeType: [{ required: true, message: "必填" }],
        beforePlan: [{ required: true, message: "必填" }],
        addGroupName: [{ required: true, message: "必填" }],
        addInterfaceName: [{ required: true, message: "必填" }]
        // beforeName: [{ required: true, message: "请输入名称" }]
      }
    };
  },
  methods: {
    //点击用例--修改接口文件的背景颜色
    changeColor(self) {
      var ele = self.currentTarget;
      console.log(ele.classList);
      var eles = document.querySelectorAll(".fileName .activeColor");
      ele.classList.length == 1
        ? (ele.classList.add("activeColor"),
          eles.forEach((item, index) => {
            item.classList.remove("activeColor");
          }))
        : ele.classList.remove("activeColor");
    },
    //点击分组文件-判断接口文件箭头方向
    isOpen(self, index) {
      this.fileNameIcon[index] == "el-icon-caret-right"
        ? (this.fileNameIcon.splice(index, 1, "el-icon-caret-bottom"),
          this.fileNameChildStatus.splice(index, 1, true))
        : (this.fileNameIcon.splice(index, 1, "el-icon-caret-right"),
          this.fileNameChildStatus.splice(index, 1, false));
    },
    //判断文件个数,并根据个数导入fileNameChildStatus-从而控制每个文件下的文档展示或者显示
    filesLen() {
      this.caseGroupList.map(row => this.fileNameChildStatus.push(false)); //默认不展示
      this.caseGroupList.map(
        row => this.fileNameIcon.push("el-icon-caret-right") //箭头方向向右
      );
    },
    //判断当前数据请求的是前置操作-请求头-请求参数-后置操作中的哪一个
    isBeforeEle(a) {
      var ele = null;
      a === 0
        ? (ele = this.beforeAction)
        : a === 1
        ? (ele = this.requestsHeader)
        : a === 2
        ? (ele = this.requestsData)
        : a === 3
        ? (ele = this.afterAction)
        : null;
      return ele;
    },
    //新增前置处理项
    addDictToList(index, a) {
      console.log(a);
      var ele = this.isBeforeEle(a);
      a === 0
        ? ele.keys.splice(index + 1, 0, {
            beforeIndex: "",
            beforeName: "",
            beforeType: "",
            beforePlan: "",
            beforeDetail: "",
            key: Date.now()
          })
        : a === 1
        ? ele.keys.splice(index + 1, 0, {
            headerKey: "",
            headerValue: "",
            headerDetail: "",
            key: Date.now()
          })
        : a === 3
        ? ele.keys.splice(index + 1, 0, {
            beforeIndex: "",
            beforeName: "",
            beforeType: "",
            beforePlan: "",
            beforeDetail: "",
            key: Date.now()
          })
        : a === 2
        ? ele.keys.splice(index + 1, 0, {
            isRequestsData: true,
            dataKey: "",
            dataValue: "",
            detaDetail: "",
            key: Date.now()
          })
        : null;
    },

    //删除前置处理项
    removeListToDict(item, a) {
      var ele = this.isBeforeEle(a);
      console.log(ele);
      var index = ele.keys.indexOf(item);
      if (index !== 0) {
        ele.keys.splice(index, 1);
      }
    },
    //编辑顺序时判断是否重复
    changeIndex(index, a) {
      var ele = this.isBeforeEle(a);
      var list = ele.keys;
      if (parseInt(list[index].beforeIndex) > parseInt(99)) {
        Message.error("最大值不能超过99");
      } else {
        var isHave = list.map(row => row.beforeIndex);
        console.log("输入的", typeof list[index].beforeIndex);
        isHave.splice(index, 1); //删掉当前输入的,isHave就只剩当前以外的，然后判断当前输入的在不在之前的列表即可判断是否重复
        console.log(isHave);
        isHave.indexOf(list[index].beforeIndex) >= 0
          ? Message.error("执行顺序不能重复")
          : null;
      }
    },
    //点击前置处理-请求头-请求参数-后置条件修改样式以及v-show
    clickReqTitle(self, index) {
      var ele = self.currentTarget;
      var childEle = ele.parentElement.children;
      for (var n = 0; n < childEle.length; n++) {
        childEle[n].style.cssText = "background-color:;color:;";
      }
      ele.style.cssText =
        "background-color:rgb(98, 161, 239);color:rgb(248, 248, 251);border-radius: 5px";

      this.statusIng.requestsStatus.forEach((item, index1) => {
        index === index1
          ? this.statusIng.requestsStatus.splice(index1, 1, true)
          : this.statusIng.requestsStatus.splice(index1, 1, false);
      });
    },
    //这个是为了操作 点击操作操作选项之后--把前置操作的值给去掉
    clearBeforePlan(index) {
      this.beforeAction.keys[index].beforePlan = "";
    },
    //根据前置类型同步对应的前置操作
    selection(index) {
      var index1 = this.beforeAction.keys[index].beforeType;
      if (!index1) {
        return [];
      } else {
        return this.beforeTypeList[index1 - 1].children;
      }
    },
    //左侧用例组搜索--
    searchNameMethod() {
      console.log("揍你", this.searchName, typeof this.searchName);
      var searList = this.caseGroupList.map(row =>
        row.Clist.filter(rows => rows.name.includes(this.searchName))
      );
      console.log("searList", searList);
      var endSearList = searList.filter(
        row => row.length > 0 && Array.isArray(row)
      );
      this.searchList.splice(0, this.searchList.length);
      console.log(endSearList);
      if (endSearList.length > 0) {
        endSearList.forEach((item, index) => {
          this.searchList = this.searchList.concat(item);
        });
      }
      this.searchList.length > 0 && this.searchName != ""
        ? (this.statusIng.searchStatus = true)
        : (this.statusIng.searchStatus = false);
    },
    //点击搜索出来的用例--跳转到对应的组-并打开对应的组-以及当前的背景颜色
    searchResult(fid, cid) {
      console.log(fid, cid);
      this.statusIng.searchStatus = !this.statusIng.searchStatus;
      this.caseGroupList.forEach((item, index) => {
        if (item.id === fid) {
          this.fileNameIcon.splice(index, 1, "el-icon-caret-bottom");
          this.fileNameChildStatus.splice(index, 1, true);
          item.Clist.forEach((item1, index1) => {
            console.log(item1.id, cid);
            if (item1.id === cid) {
              var eles = document.querySelectorAll(".fileName .activeColor");
              eles.forEach((item, index) => {
                item.classList.remove("activeColor");
              });
              document
                .getElementsByName(String(cid))[0]
                .classList.add("activeColor");
            }
          });
        }
      });
    },
    addFiles() {
      this.statusIng.caseAddFilesBoxStatus = true;
    },
    //新建文件确认提交
    caseAddGroupSubmit() {
      //先请求添加分组接口--成功之后
      this.caseGroupList.push({
        id: "",
        name: this.caseGroupDatats.addGroupName,
        projectId_id: "",
        Clist: []
      });
      //默认添加的该文件不展开
      this.fileNameChildStatus.push(false);
      //默认新增分组箭头向右
      this.fileNameIcon.push("el-icon-caret-right");
      this.statusIng.caseAddFilesBoxStatus = false;
    },
    //新建用例接口,操作按钮
    caseAddInterfaceSubmit() {
      var type = this.commandCode.splice(-1)[0];
      if (type === "father") {
        console.log(this.commandCode[0]);
        var status = this.commandCode[0];
        var fid = this.commandCode[1];
        var findex = this.commandCode[2];
        if (status === "a") {
          //如果等于a则是用例分组新增
          //请求新增接口成功之后再push到对应的列表
          this.caseGroupList[findex].Clist.push({
            fid: fid,
            id: 1,
            name: this.caseGroupDatats.addInterfaceName,
            createUserName: "test"
          });
           //关闭后请求
          this.statusIng.caseAddInterfaceBoxStatus = false;
          this.commandCode = null;
          this.caseGroupDatats.addInterfaceName = null;
        }
        if (status === "b") {
          //如果等于a则是用例分组新增
          //请求新增接口成功之后再push到对应的列表
          this.caseGroupList[
            findex
          ].name = this.caseGroupDatats.addInterfaceName;
          //关闭后请求
          this.statusIng.caseAddInterfaceBoxStatus = false;
          this.commandCode = null;
          this.caseGroupDatats.addInterfaceName = null;
        }
      }
      if (type === "child") {
        console.log();
        var status = this.commandCode[0];
        var findex = this.commandCode[2];
        var cindex = this.commandCode[4];
        if (status === "b") {
          this.caseGroupList[findex].Clist[cindex].name = this.caseGroupDatats.addInterfaceName;
        }
        //关闭后请求
          this.statusIng.caseAddInterfaceBoxStatus = false;
          this.commandCode = null;
          this.caseGroupDatats.addInterfaceName = null;
          Message.success("接口文档名称修改成功")
      }
    },
    //操作接口文件
    GroupChildAction(command) {
      console.log(command);
      command[0] === "b"
        ? ((this.statusIng.caseAddInterfaceBoxStatus = true),
          (this.caseBoxTtile = "用例接口重命名"),
          (this.caseBoxLable = "接口名称"),
          (this.commandCode = command))
        : command[0]==="c"
          ?     (this.caseGroupList[command[2]].Clist.splice(command[4],1),
                Message.success("删除成")   )
          : null
        
        ;
    },
    //操作分组文件
    GroupFatherAction(command) {
      console.log(command);
      command[0] === "a"
        ? (((this.statusIng.caseAddInterfaceBoxStatus = true),
          (this.caseBoxTtile = "新建用例接口"),
          (this.caseBoxLable = "接口名称")),
          (this.commandCode = command))
        : command[0] === "b"
        ? ((this.statusIng.caseAddInterfaceBoxStatus = true),
          (this.caseBoxTtile = "用例分组重命名"),
          (this.caseBoxLable = "分组名称"),
          (this.commandCode = command))
        : command[0] === "c"
        ? (this.caseGroupList.splice(command[2], 1),
          Message.success("删除成功"))
        : null;
    },
    requestsTitile1() {},
    requestsTitile2() {},
    requestsTitile3() {},
    requestsTitile4() {},

    //检测前置处理---参数列表最后一个如果有不为空的则新增一个

    //默认选中前置处理-且改变现实类别

    changeRequstsBeforeOneColor() {
      // requestsBefore: true,
      //   requestsHeader: false,
      //   requestsData: false,
      //   requestsAfter: false

      var Ele = document.getElementsByClassName("requests-title")[0]
        .children[0];
      Ele.style.cssText =
        "background-color:rgb(98, 161, 239);color:rgb(248, 248, 251);border-radius: 5px";
    },
    //遍历左侧接口文件下的 接口文档并选择
    filesNames() {
      console.log("111", this.caseGroupList);
      this.caseGroupList.forEach((item, index) => {
        this.filesName = this.filesName.concat(item.Clist);
      });
    },

    //选择文档之后同步相应数据

    //以下方法为接口请求

    //查询该项目下的接口文件以及对象的接口文档
    SelectFile() {
      //如果用例分组返回为空则默认请求当前接口文档分组
      SelectFile({
        projectId: storage.get("projectId")
      }).then(res => {
        res.status === 200
          ? ((this.caseGroupList = res.results),
            this.filesLen(),
            this.filesNames())
          : null;
      });
    }
  },
  Update() {},
  mounted() {
    this.filesLen();
    this.changeRequstsBeforeOneColor();
    this.SelectFile();
  },
  computed() {
    // this.filesNames();
    // console.log(JSON.stringify(this.caseGroupList));
  }
};
</script>

<style lang="scss" scoped>
.manageCase {
  // overflow: hidden;
  height: 100%;
  background-color: white;
  min-width: 1000px;
}
.manageCase-left {
  height: 100%;
  background-color: #fff;
  position: relative;
  float: left;
  // overflow-y: scroll;
}
.manageCase-right {
  // height: 100%;
  // // width: 100%;
  // // padding: 16px;
  // background-color: #eee;
  // box-sizing: border-box;
  // overflow-y: scroll;
  // margin: 0 16px 0 0;
  height: 100%;
  padding: 5px;
  background-color: #eee;
  box-sizing: border-box;
  overflow-x: hidden;
}
.manageCase-left-context {
  // position: absolute;
  // top: 0;
  // right: 3px;
  // bottom: 0;
  // left: 0;
  // /* padding: 16px; */
  // overflow-x: hidden;
  position: absolute;
  top: 0;
  right: 1px;
  bottom: 0;
  left: 0;
  margin: 0 16px 0 0;
  overflow-x: hidden;
  background: #eee;
}
.resize-bar {
  width: 225px;
  height: inherit;
  resize: horizontal;
  cursor: ew-resize;
  opacity: 0;
  overflow: scroll;
  margin-left: 0px;
  max-width: 500px;
  min-width: 200px;
}
/* 拖拽线 */
.resize-line {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  border-right: 2px solid #eee;
  border-left: 1px solid #bbb;
  pointer-events: none;
}
.resize-bar:hover ~ .resize-line,
.resize-bar:active ~ .resize-line {
  border-left: 1px dashed skyblue;
}

.resize-bar::-webkit-scrollbar {
  width: 200px;
  height: inherit;
}

/* Firefox只有下面一小块区域可以拉伸 */
/* @supports (-moz-user-select: none) {
    .resize-bar:hover ~ .resize-line,
    .resize-bar:active ~ .resize-line {
        border-left: 1px solid #bbb;
    }
    .resize-bar:hover ~ .resize-line::after,
    .resize-bar:active ~ .resize-line::after {
        content: '';
        position: absolute;
        width: 16px; height: 16px;
        bottom: 0; right: -8px;
        background: url(./resize.svg);
        background-size: 100% 100%;
    }
} */
// .leftTitle{
//     /* position: fixed; */
//     width: 100%;
//     // background-color: red;
//     display: flex;
//     justify-content: space-around;
//     span{
//         padding: 15px 16px;
//         cursor: pointer;
//     }
//     span:hover{
//         background-color: #bbb;;
//     }
// }

.search-context {
  text-align: left;
  // font-size:13px ;
  // margin-left: 10px;
  p {
    padding: 5px 10px;
    margin: -3px 0px;
    cursor: pointer;
  }
  p:hover {
    background-color: #bbb;
  }
}
.manageCase-left-context {
  // overflow-y: hidden;
  .it-search {
    margin: 8px 8px 0 8px;
  }
  .addFiles {
    position: absolute;
    right: 10px;
    color: #1e87f0;
    margin-top: -10px;
    cursor: pointer;
  }
  .FilesContext {
    font-size: 13px;
    margin: 0 8px;
    margin-top: 40px;
    // height: 3000px;
    //   background-color: red;
    .fileName {
      text-align: left;

      .fileName-father {
        padding: 7px 0 7px 0;
        cursor: pointer;
        .addTextFather {
          display: inline-block;
          float: right;
        }
      }
      .fileNameChild {
        padding: 7px 0 7px 0;
        cursor: pointer;
        .file {
          margin-left: 30px;
        }
        .addTextChild {
          display: inline-block;
          float: right;
        }
      }
    }
  }
  //   #2c3e50
  .fileName-father:hover {
    background-color: #bbb;
  }

  .fileNameChild:hover {
    background-color: #bbb;
  }
  .activeColor {
    background-color: grey;
  }
}
.manageCase-right {
  padding-left: 10px;
  .right-title {
    height: 100%;

    .title-detail {
      padding-bottom: 15px;
      border-bottom: 1px solid #c9b2b2;
      text-align: left;
      .tt {
        padding: 0 10px;
        padding-bottom: 16px;
        border-bottom: 1px solid #1e87f0;
      }
    }
    .title-detail-context {
      width: 100%;
      margin: 10px 0;
      text-align: left;
      height: 280px;
      background-color: whitesmoke;
      // background-color: silver;
      // display: flex;

      .interfaName,
      .interfaName-1 {
        display: inline-block;
        width: 300px;
        height: 40px;
        margin-top: 10px;
      }
      // .title-detail-class {
      //   display: inline-block;
      //   background-color: royalblue;
      //   width: 300px;
      //   height: 40px;
      // }
      .interfaName-2 {
        margin-top: 10px;
      }
      .interfaName-3 {
        width: 600px;
        height: 40px;
      }
    }
  }

  .interfaName-2 {
    width: 1000px;
    display: flex;
    .postAttr-1,
    .postAttr-2,
    .postAttr-3,
    .postAttr-4 {
      display: inline-block;
    }
    .postAttr-1,
    .postAttr-4 {
      width: 12%;
    }
    .postAttr-2 {
      width: 30%;
    }
    .postAttr-3 {
      width: 15%;
    }
  }
  .title-detail-class {
    margin-top: 20px;

    .requests-detail {
      width: 100%;
      //   height: 500px;
      // background-color: silver;
      margin: 25px 0;
      .requests-title {
        text-align: left;
        span {
          padding: 10px 10px;
          font-size: 15px;
        }
      }
      .t1 {
        margin-top: 20px;
        // position: relative;
        width: 100%;
        position: relative;
        text-align: left;
        margin-left: 10px;
        margin-bottom: 10px;
      }
      .requestsTitile {
        // margin-top: 10px;
        // position: absolute;
        overflow-x: hidden;
        width: 100%;
        height: 300px;
        text-align: left;
        background-color: whitesmoke;
        // margin-left: 10px;
        // position: relative;
        .beforeFrom {
          margin-left: 10px;
        }
      }
      .requestsTitile1 {
        width: 5%;
        min-width: 60px;
        display: inline-block;
      }
      .requestsTitile2 {
        min-width: 90px;
        width: 10%;
        display: inline-block;
        margin-left: 10px;
      }
      .requestsTitile3 {
        min-width: 120px;
        width: 10%;
        display: inline-block;
        margin-left: 10px;
      }
      .requestsTitile4 {
        min-width: 110px;
        width: 10%;
        display: inline-block;
        margin-left: 10px;
      }
      .requestsTitile5 {
        width: 20%;
        display: inline-block;
        margin-left: 10px;
        // left: 460px;
      }
      .t2:hover {
        cursor: pointer;
        background-color: #ecf5ff;
        color: #409eff;
        border: 1px solid rgb(98, 161, 239);
        border-radius: 5px;
      }
      .delete {
        display: inline-block;
        margin-left: 10px;
        cursor: pointer;
        span:nth-child(1) {
          margin-left: 1px;
          color: #1e87f0;
          cursor: pointer;
        }
        span:nth-child(1):hover {
          color: rgb(128, 186, 252);
        }

        span:nth-child(2) {
          margin-left: 1px;
          color: red;
          cursor: pointer;
        }
        span:nth-child(2):hover {
          color: rgb(248, 125, 125);
        }
      }
    }
    .requestsHeaderTitle {
      width: 25%;
      display: inline-block;
    }
    .headerInput {
      display: inline-block;
      width: 25%;
    }
    .dataTitle1 {
      display: inline-block;
      width: 60px;
    }
    .dataTitle {
      display: inline-block;
      width: 20%;
    }
  }
}
.caseBox {
  .caseBoxInput {
    margin: 50px 20px;
  }
}
</style>

<style>
.right-title .el-input__inner,
.right-title-1 .el-input__inner,
.right-title-2 .el-input__inner {
  height: 30px !important;
}
/* .right-title-detail .el-form-item__content {
  line-height: 30px;
} */
.right-title-detail .el-form-item__label {
  color: black;
}
.right-title-detail .el-form-item__error {
  padding-top: 0px !important;
}

.requestsTitile .el-form-item {
  margin-bottom: 5px;
}
.requestsTitile .el-form-item__error {
  margin-top: -2px;
}
.manageCase-right .el-button {
  padding: 8px 10px;
}
</style>