import axios from "axios"
import qs from "qs"
import app from "../main.js"


axios.defaults.timeout = 15000;



//请求拦截器
axios.interceptors.request.use(config => {
    console.log(config,"请求拦截器")
    
    return config;
}, err => {
    Message.error('请求超时');
    return Promise.resolve(err);
});

//后端返回数据拦截
axios.interceptors.response.use(response=>{
    console.log(response,"返回拦截器")
    console.log(response.data.status)
    switch(response.data.status){
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
            if (response.data.message !== null) {
                Message.error(response.data.message);
            } else {
                Message.error("未知错误");
            }
        default: return response.data
    }
    return response
},(err) => {
    // 返回状态码不为200时候的错误处理
    console.log(err,"这个执行啥")
    Message.error(err.toString());
    return Promise.resolve(err);
})





export const postRequest = (url, params) => {
    // let accessToken = getStore("accessToken");
    return axios({
        method: 'post',
        url: `${url}`,
        data: params,
        // transformRequest: [function (data) {
        //     let ret = '';
        //     for (let it in data) {
        //         ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
        //     }
        //     ret = ret.substring(0, ret.length - 1);
        //     return ret;
        // }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            // 'accessToken': accessToken
        }
    });
};