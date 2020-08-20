import axios from "axios";
import Qs from "qs";
import { Message } from "element-ui";
import storage from "@/libs/storage"
import router from  "@/router"
// axios.defaults.timeout = 15000;



//请求拦截器
axios.interceptors.request.use(config => {
    // console.log(config,"请求拦截器")
    
    return config
}, err => {
    Message.error('请求超时');
    return Promise.resolve(err);
});

//后端返回数据拦截
axios.interceptors.response.use(response=>{
    const data=response.data
    // console.log("这是返回的值",response.data)
    switch(data.status){
        
        case 200:
            break;
        case 401: //一般这个是未登录或者登录失效
            router.replace({   //重定向到登录页面
                name:"Login",
            })
            break;
        case 403:
            Message.error(data.msg);
            break;
        case 500:
            Message.error(data.msg);
        default: 
        // Message.error(data.msg)
        return data
    }
    return data
},err => {  //异常处理
    
    console.log(err,"这个执行啥")
    // Message.error(err.toString());
    Message.error("服务器异常");
    return Promise.reject(err);
})




export const getRequest = (url, params) => {
    let accessToken = storage.get('token');
    // console.log("请求开始",params)
    return axios({
        method: 'get',
        url: `${url}`,
        params: params,
        headers: {
            'Authorization': "JWT ".concat(accessToken)
        }
    });
   
};


export const postRequest = (url, params) => {
    // console.log(qs.stringify(params),"aadsads")
    let accessToken = storage.get("token");
    // console.log("accessToken",accessToken)
    // console.log(typeof params)
    // let accessToken = getStore("accessToken");

    return axios({
        method: 'post',
        url: `${url}`,
        data: Qs.stringify(params),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': "JWT ".concat(accessToken)
        }
    });
};