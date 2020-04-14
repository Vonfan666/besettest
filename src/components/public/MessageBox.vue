<template>
  <div class="messageBox">
    <div class="ms-text"></div>

    <div class="mb-text"  :style="styleCode">
      <slot name="addFiels">
      </slot>
      <slot name="postJsonData">
      </slot>
      <slot name="environment">
        <!-- 变量 -->
      </slot>
      <slot name="project">
        
      </slot>

    </div>
  </div>
</template>

<script>
export default {
  props:["styleCode"],
  data() {
    return {
      test: "ceshi"
      
    };
  },
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