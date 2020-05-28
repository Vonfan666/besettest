<template>
  <div>
    <!-- <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">点我打开</el-button> -->

    <el-drawer title="我是标题" :visible.sync="drawer" destroy-on-close :with-header="false">
      <span>我来啦!</span>
    </el-drawer>
  </div>
</template>

<script>
export default {
  props:["drawer"],
  data() {
    return {
        drawer:false
    };
  },
  watch:{
      drawer(a,b){
          if(a!==b){
              this.$emit("update:drawer",this.drawer)
          }
      }
  }
};
</script>

<style>
</style>