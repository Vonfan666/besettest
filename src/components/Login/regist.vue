<template>
  <div class="registbody">
    <div class="registcontext">
      <div >
        <h2>
          <span>注册</span>
          <i class="el-icon-circle-close registtitle"  @click="bb()"></i>
          </h2>
        
      </div>
      <el-form :model="regist" :rules="rules" class="regist-form" ref="elForm">
        <el-form-item label="所属部门" prop="department" label-width="100px">
          <el-select v-model="regist.department" placeholder="请选择所属部门">
            <el-option
              v-for="(item,index) in data.list"
              :key="index"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="readlyName" label="姓名" label-width="100px" >
          <el-input v-model="regist.readlyName" clearable placeholder="请输入姓名以便找回密码"></el-input>
        </el-form-item>

        <el-form-item prop="phone" label="账号" label-width="100px">
          <el-input v-model="regist.phone" clearable placeholder="请输入6-18位账号"></el-input>
        </el-form-item>

        <el-form-item prop="password" label="密码" label-width="100px">
          <el-input v-model="regist.password" clearable show-password placeholder="请输入6-18位密码"></el-input>
        </el-form-item>

        <el-form-item prop="forgetPassword" label="确认密码" label-width="100px">
          <el-input v-model="regist.forgetPassword" clearable show-password placeholder="请再次输入确认密码"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="registButton" @click="submitRegist()">提交注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="registtitlefoot"></div>
    <div class="registCode"></div>
    <!-- <el-button :plain="true" @click="open">{{message}}</el-button> -->
  </div>
</template>

<script>
import validator from "@/libs/validate.js";
import {
  login,
} from "@/axios/api"
export default {
  // props: ["style"],  
  data() {
     var validatePass = (rule, value, callback) => {
       console.log(this.regist.password)
          console.log(this.regist.forgetPassword)
          console.log(value)
        if  (value !== this.regist.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }};
    return {
      
      message: "",
      regist: {
        department: "",
        readlyName:"",
        phone: "",
        password: "",
        forgetPassword: "",
        
        
      },
      rules: {
        readlyName:[
          {required:true,message:"请输入真实姓名",trigger: "blur"}
        ],
        department: [
          { required: true, message: "必须选择所属部门", trigger: "change" }
        ],
        phone: [
          { required: true, message: "账号不能为空",trigger:"blur" },
          { validator: validator.phoneValidate,trigger:"blur" }
        ],
        password: [
          { required: true, message: "密码不能为空",trigger:"blur" },
          { validator: validator.passwordValidate ,trigger:"blur"}
        ],
        forgetPassword: [
          { required: true, message: "请二次确认您的密码",trigger:"blur" },
          { validator: validator.passwordValidate ,trigger:"blur"},
          { validator: validatePass , trigger:"blur"}
        ],
        
        
      },
      data: {
        list: []
      },
      postData: {
        //接口传的参数
      }
    };
  },
  methods: {
    open(message) {
      this.$message({
        message: message,
        type: "success"
      });
    },
    bb() {
      document.querySelector(".regist-child").classList.add("active");

      this.$refs.elForm.clearValidate(); //移除表单校验
    },
    submitRegist() {
      this.$refs.elForm.validate(valid => {
        if (valid) {
          
            login({
                name:this.regist.readlyName,
                department:this.regist.department,
                mobil:this.regist.phone,
                password:this.regist.password
              }).then(res=>{
                console.log(res,"这是奇偶我怕多吗")
                this.open("注册成功");
              }).catch(res=>{
                console.log(res)
              })
            
            document.querySelector(".regist-child").classList.add("active");
          
          
        } else {
          return false;
        }
      });
    }
  },
  mounted() {
    this.data.list = [
      { name: "研发部" },
      { name: "测试部" },
      { name: "设计部" },
      { name: "产品部" }
    ];
    console.log(this.data.list);
  }
};
</script>

<style lang="scss">
.registbody {
  position: relative;
  width: 100%;
  height: 100%;
}
// .registtitle {
//   width: 100%;
//   margin: 10px 0;
// }
.regist-form {
  margin-top: 20px;
  width: 350px;
}
.registCode {
  // float: left;
  position: fixed;
  z-index: 2;
  width: 100%;
  height: 100%;
  // margin: -8px;
  background: black;
  opacity: 0.5;
}
.registcontext {
  color: black;
  position: absolute;
  z-index: 3;
  background: white;
  width: 400px;
  height: 450px;
  // background: whitesmoke;
  // left: 50%;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.registButton {
  margin: 10px 0 0 60px;
}
.regist-form .el-input__inner {
  padding-right: 60px;
}
.registtitle{
    position: absolute;
    right: 0;
    top: 0;
    cursor:pointer
}
</style>