<template>
  <div class="messageBox" @click="clickAll($event)">
    <div class="ms-text"></div>

    <div class="mb-text" :style="styleCode">
      <slot name="addFiels"></slot>
      <slot name="postJsonData"></slot>
      <slot name="environment">
        <!-- 变量 -->
      </slot>

      <slot name="project"></slot>
      <slot name="mockData">
        <!-- mock数据页面 -->
      </slot>
      <slot name="caseAddFiles"></slot>
      <slot name="caseAddInterface"></slot>
      <slot name="Cenvironment">
        <!-- 变量 -->
      </slot>
      <slot name="pushHeader"></slot>
      <slot name="isUnityBox">
        <!-- 同步数据弹窗 -->
      </slot>
      <slot name="ischildId">
        <!-- 同步数据弹窗 -->
      </slot>
      <slot name="createCasePlan">
        <!-- 创建执行计划 -->
      </slot>
       <slot name="caseEdit">
        <!-- 创建执行计划 -->
      </slot>
      <slot name="debugLogResults">
        <!-- 创建执行计划 -->
      </slot>
      <slot name="RunCaseBox">
        <!-- 执行过程-->
      </slot>
       <slot name="caseRunResults">
        <!-- 执行测试计划结果-->
      </slot>
      <slot name="addTask">
        <!-- 添加定时任务-->
      </slot>
      <slot name="addSql">
        <!-- 添加数据库-->
      </slot>
      <slot name="writeSql">
        <!-- 添加sql-->
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ["styleCode", "statusCode"],
  data() {
    return {
      test: "ceshi"
    };
  },
  methods: {
    clickAll(a) {
      var ele = document.querySelector(".mb-text");
      if (ele) {
        if (!ele.contains(a.target)) {
          // this.statusCode=!this.statusCode
          this.$emit("update:statusCode", !this.statusCode);
        }
      }
    }
  }
  // created(){
  //   console.log(this.styleCode,"11111")
  // }
};
</script>

<style lang="scss" scoped>
.ms-text {
  position: fixed;
  left: 0px;
  right: 0px;
  bottom: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0.4;
  z-index: 100;
}
.mb-text {
  position: fixed;
  // width: 500px;
  // height: 300px;
  background: white;
  z-index: 101;
  left: 0px;
  right: 0px;
  bottom: 0px;
  top: 0px;
  margin: auto;
}
</style>
<style>
.messageBox .el-form-item__label {
  color: black;
}
</style>