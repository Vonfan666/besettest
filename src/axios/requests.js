import axios from "axios";
import Qs from "qs";
import { Message } from "element-ui";
import storage from "@/libs/storage"

// axios.defaults.timeout = 15000;



//请求拦截器
axios.interceptors.request.use(config => {
    console.log(config,"请求拦截器")
    
    return config
}, err => {
    Message.error('请求超时');
    return Promise.resolve(err);
});

//后端返回数据拦截
axios.interceptors.response.use(response=>{
    const data=response.data
    console.log(response,"返回拦截器")
    console.log(response.data)
    switch(data.status){
        
        case 200:
            if (data.message){
                Message.success(data.message)
            }
               
            break;
        
        case 401:
            console.log("返回状态码是401");
            if (data.message !== null) {
                Message.error(data.message);
            } else {
                Message.error("未知错误");
            }
            break;
        case 403:
            console.log("返回状态码是403");
            if (data.message !== null) {
                Message.error(data.message);
            } else {
                Message.error("未知错误");
            }
            break;
        case 500:
            console.log("返回状态码500")
            if (data.message !== null) {
                console.log("这个执行了吗啊")
                Message.error(data.message);
            } else {
                Message.error("未知错误");
            }
        default: return data
    }
    console.log(data,"zuih")
    return data
},(err) => {
    // 返回状态码不为200时候的错误处理
    console.log(err,"这个执行啥")
    Message.error(err.toString());
    return Promise.resolve(err);
})




export const getRequest = (url, params) => {
    let accessToken = storage.get('accessToken');
    console.log("请求开始",params)
    return axios({
        method: 'get',
        url: `${url}`,
        params: params,
        headers: {
            'accessToken': accessToken
        }
    });
   
};


export const postRequest = (url, params) => {
    // console.log(qs.stringify(params),"aadsads")
    let accessToken = storage.get("accessToken");
    console.log("accessToken",accessToken)
    console.log(typeof params)
    // let accessToken = getStore("accessToken");

    return axios({
        method: 'post',
        url: `${url}`,
        data: Qs.stringify(params),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'accessToken': accessToken
        }
    });
};