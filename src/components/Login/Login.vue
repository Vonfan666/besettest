<template>
  <div class="template">
    <div class="title">
      <h1>BesetTest接口自动化测试平台</h1>
    </div>
    <div class="context">
      <div class="context-form">
        <el-form :model="loginForm" :rules="rules" style="width:300px" ref="login">
          <el-form-item label="账号" prop="mobil" label-width="50px">
            <el-input v-model="loginForm.mobil" clearable placeholder="请输入您的账号"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" label-width="50px">
            <el-input
              v-model="loginForm.password"
              clearable
              show-password
              class="passwordInput"
              placeholder="请输入您的密码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :disabled="disabled" @click="submit()" class="button">登录</el-button>
          </el-form-item>
        </el-form>
        <div class="foot">
          <!-- <span class="regist" @click="regist()">注册</span> -->
          <span type="text" class="regist" @click="removeClass()">注册</span>
          <span class="forgetpassword" @click="forgetpassword()">忘记密码</span>
        </div>
      </div>
    </div>
    <div class="regist-child active">
      <!--通过active决定子组件是否展示-->
      <Regist :departmentlist="departmentList" ref="regists"></Regist>
    </div>
    <div class="forgetPw-child active">
      <forget-pw></forget-pw>
    </div>
  </div>
</template>

<script>
import valids from "@/libs/validate.js";
// import Regist from "./regist";
import forgetpassword from "./Forgetpassworf";
import { department, login } from "@/axios/api.js";
import { Message } from "element-ui";
import storage from "@/libs/storage.js";
export default {
  data() {
    return {
      res: null,
      disabled: false,
      loginForm: {
        mobil: "",
        password: ""
      },
      rules: {
        mobil: [
          { required: true, message: "账号不能为空" },
          { validator: valids.phoneValidate, trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空" },
          { validator: valids.passwordValidate, trigger: "blur" }
        ]
      },
      departmentList: []
    };
  },
  methods: {
    submit() {
      this.$refs.login.validate(valid => {
        if (valid) {
          login(this.loginForm)
            .then(res => {
              console.log(res);
              if (res.status == 200) {
                this.$router.push({ path: "/BesetTest/home" });
              } else {
                Message.error(res.message);
              }
            })
            .catch(error => {
              Message.error("服务器错误");
            });
        } else {
        }
      });
    },
    removeClass() {
      document.querySelector(".regist-child").classList.remove("active");
      department().then(res => {
        this.departmentList = res;
        console.log(this.departmentList, "修改过后departmentList的值");
        this.$refs.regists.data.list = res.results;
      });
    },
    forgetpassword() {
      document.querySelector(".forgetPw-child").classList.remove("active");
    }
  },
  components: {
    Regist: () => import("./regist"),
    "forget-pw": forgetpassword
  },
  mounted() {
    (this.loginForm.mobil = ""), (this.loginForm.password = "");
  }
};
</script>

<style lang="scss">
.template {
  position: absolute;
  width: 100%;
  height: 100%;
  margin: -8px;
  min-width: 520px;
  background-image: url("/static/pubImg/background.jpg");
  color: #000;
  .title {
    position: absolute;
    right: 10%;
    top: 20%;
  }
}

.context {
  position: absolute;
  width: 400px;
  height: 300px;
  // background: red;
  top: 40%;
  right: 10%;
}
.context-form {
  margin: 30px;
  // background: gold;
  .passwordInput input {
    padding-right: 55px;
  }
  .el-form-item {
    margin-bottom: 30px;

    .el-form-item__error {
      font-size: 18px;
      color: red;
    }
    .el-form-item__label {
      color: #000;
    }
  }
  .button {
    margin-left: 28px;
  }
}
.foot {
  cursor: pointer;
  margin: -20px;
  .regist {
    float: left;
    margin-left: 40px;
  }
  .forgetpassword {
    float: right;
    margin-right: 50px;
  }
}
.regist-child {
  width: 100%;
  height: 100%;
}
.active {
  display: none;
}
</style>