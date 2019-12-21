//登录页面-手机号码校验
const phoneValidate =
    (rule, value, callback) => {
        var reg = /^[1][3,4,5,6,7,8][0-9]{9}$/;
        if (value.length < 6) {
            callback(new Error("输入账号必须大于6位"))
        } else if (value.length > 18) {
            callback(new Error("输入账号必须小于18位"))
        }
        // if (!reg.test(value)) {
        //   callback(new Error('手机号格式错误'));
        // }
        else {
            callback()
        }
    }

//密码校验
const passwordValidate =
    (rule, value, callback) => {
        var reg = /^[1][3,4,5,6,7,8][0-9]{9}$/;
        if (value.length < 6) {
            callback(new Error("输入密码必须大于6位"))
        } else if (value.length > 18) {
            callback(new Error("输入密码必须小于18位"))
        }
        // if (!reg.test(value)) {
        //   callback(new Error('手机号格式错误'));
        // }
        else {
            callback()
        }
    }
export default {
    phoneValidate,
    passwordValidate
}

