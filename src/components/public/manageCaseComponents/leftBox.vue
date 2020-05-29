<template>
  <!-- <div class="left-box" style="margin:10px">
    <div class="title" style="text-align:left">
      <h3>调试结果</h3>
    </div>
    <div class="header" style="text-align:left">
      <span>Headers</span>
      <span>Preview</span>
      <span>Response</span>
      <span>Assert</span>
    </div>
  </div>-->
  <div class="left-box" style="margin:10px">
    <div class="title" style="text-align:left">
      <h3>调试结果</h3>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="Headers" name="first">
        <div class="Headers">
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="请求地址" name="4">
              <div class="attr" style="text-align:left">
                <li>
                  <span>
                    <b>Request URL：</b>
                  </span>
                  <span>{{list.postUrl}}</span>
                </li>
                <li>
                  <span>
                    <b>Request Method：</b>
                  </span>
                  <span>{{list.postMethods}}</span>
                </li>
                <li>
                  <span>
                    <b>Status Code：</b>
                  </span>
                  <span>{{list.resStatus}}</span>
                </li>
              </div>
            </el-collapse-item>
            <el-collapse-item title="请求头" name="1">
              <div class="hds" style="text-align:left">
                <li v-for="(item,index) in Object.keys(list.postHeader) " :key="index">
                  <span>
                    <b>{{item}}：</b>
                  </span>
                  <span>{{list.postHeader[item]}}</span>
                </li>
              </div>
            </el-collapse-item>
            <el-collapse-item title="返回头" name="2" style="text-align:left">
              <li v-for="(item,index) in Object.keys(list.resHeaders) " :key="index">
                <span>
                  <b>{{item}}：</b>
                </span>
                <span>{{list.resHeaders[item]}}</span>
              </li>
            </el-collapse-item>
            <el-collapse-item title="请求数据" name="3" style="text-align:left">
              <li v-for="(item,index) in Object.keys(list.postData) " :key="index">
                <span>
                  <b>{{item}}：</b>
                </span>
                <span>{{list.postData[item]}}</span>
              </li>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Preview" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="Response" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="Assert" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  props: ["list"],
  data() {
    return {
      activeName: "second",
      res: {
        postHeader: null,
        postMethods: null,
        resStatus: null
      },
      activeNames: ["1"]
    };
  },
  methods: {
    //tab组件切换方法
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleChange(val) {
      console.log(val);
    },
    changeColor() {}
  }
  // mounted(){
  //   this.res.postHeader=Object.keys(this.list.postHeader)
  // }
};
</script>

<style lang="scss" scoped>
.left-box {
  li {
    list-style-type: none;
    margin-left: 10px;
  }
}
.left-box .el-collapse {
  border-top: none !important;
}
</style>>

