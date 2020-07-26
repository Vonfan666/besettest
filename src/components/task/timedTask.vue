<template>
  <div class="timedTask">
    <div class="cron">
      <el-popover v-model="cronPopover">
        <el-input
          slot="reference"
          @click="cronPopover=true"
          v-model="cron"
          placeholder="请输入定时策略"
          style="width: 40% ;margin-left: -50%"
        ></el-input>
        <cron @change="changeCron" @close="cronPopover=false" i18n="cn"></cron>
      </el-popover>
    </div>
  </div>
</template>

<script>
import { cron } from "vue-cron";
export default {
  components: {
      cron,
  },
  data() {
    return {
      cronPopover: false,
      cron: "",
    };
  },
  methods: {
    changeCron(val) {
      this.cron = val;
    },
  },
};
</script>

<style>
</style>