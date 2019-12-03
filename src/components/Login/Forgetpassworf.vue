<template>
  <div class="forgetPw">
    <div class="forgetPw-active"></div>

    <div class="forgetPw-form-one">
      <div>
        <h2>
          <span>找回密码</span>
          <i class="el-icon-circle-close close" @click="closePassword()"></i>
        </h2>
      </div>
      <div class="forgetPw-form-tow">
        <el-form :model="postData" :rules="rules" ref="forgetPw">
          <el-form-item prop="phone" label="账号" label-width="50px">
            <el-input v-model="postData.phone" clearable placeholder="请输入您的账号"></el-input>
          </el-form-item>
          <el-form-item prop="readlyName" label="姓名" label-width="50px">
            <el-input v-model="postData.readlyName " clearable placeholder="请输入您的姓名"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForgetPw()">提交</el-button>
          </el-form-item>

          <!-- <el-input v-model="data" :disabled="true"></el-input> -->
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import valid from "@/libs/validate.js";
export default {
  data() {
    return {
      postData: {
        phone: "",
        readlyName: ""
      },
      rules: {
        phone: [
          { required: true, message: "请输入账号" },
          { validator: valid.phoneValidate }
        ],
        readlyName: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      },
      dialogVisible: false,
      password: ""
    };
  },
  methods: {
    closePassword() {
      document.querySelector(".forgetPw-child").classList.add("active");
      this.$refs.forgetPw.resetFields();
    },
    open() {
      this.$alert(this.password, "请记住您的密码：", {
        confirmButtonText: "确定",
        callback: action => {}
      });
    },
    submitForgetPw() {
      this.$refs.forgetPw.validate(valid => {
        if (valid) {
          this.password = "test123456";
          this.open();
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.forgetPw-form-one {
  width: 400px;
  height: 280px;
  background: white;
  margin: auto;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  position: fixed;
}

.forgetPw-active {
  position: fixed;
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0.5;
}
.forgetPw-form-tow {
  margin: 40px;
}

.close {
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
}
</style>