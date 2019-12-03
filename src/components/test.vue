<template>
  <div class="template">
    <div class="context">
      <el-form :model="model" :rules="rules" ref="login">  <!--通过css设置它的宽度是包括lable文字的宽度的-如果他设置两百
                                                            ,实际上输入框的宽度是等于它的宽度减去 下面lable-width的宽度-->
        <el-form-item  prop="phone" label="账号" label-width="100px"> <!--设置它的宽度是指输入框前面文字的长度。以及左边距的长度-->
          <el-input v-model="model.phone" clearable input-width="20px" autocomplete="off" class="phoneInput"></el-input>
          <!--.phoneInput input{
        padding-right: 50px   设置之后-可以控制文字在输入框中输入的长度
    }-->
        </el-form-item>

        <el-form-item label-width="100px" prop="password" label="密码">
          <el-input v-model="model.password" clearable></el-input>
        </el-form-item>
        <el-form-item label-width="100px" prop="a" label="a">
          <el-input v-model="model.a" clearable></el-input>
        </el-form-item>
        <el-form-item label-width="100px" prop="b" label="字数比较多">
          <el-input v-model="model.b" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">提交</el-button>
        </el-form-item>
      </el-form>
   
    </div>
  </div>
</template>

<script>
import   phoneValidate from "@/libs/validate.js"
export default {

  data() {
    return {
      model: {
        phone: null,
        password: null,
        a: null,
        b: null
      },
      rules: {
        phone: [{ required: true, message: "账号不能为空" },
                { validator:phoneValidate,trigger: 'blur'  },
        ],
        password: [{ required: true, message: "密码不能为空" }],
        a: [{ required: true, message: "a不能为空" }],
        b: [{ required: true, message: "b不能为空" }]
      }
    };
  },
  methods: {
    submitForm() {
        this.$refs.login.validate((valid) => {
          if (valid) {
            console.log(this.model)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
  }
};
</script>

<style lang="scss">
.template {
  position: fixed;
  margin: -8px;
  width: 100%;
  height: 100%;
  background-image: url("/static/pubImg/background.jpg");
}

.context {
  position: absolute;
  background: black;
  width: 500px;
  height: 300px;
  float: right;
  top: 30%;
  display: flex;
  justify-content: center;
  .el-form {
    border: 2px solid white;
    position: absolute;
    left: 0;
    width: 300px;

    //       .el-form-item{
    //           width:-100px
    //       }、
    .phoneInput input{
        padding-right: 50px
    }
  }
}
</style>