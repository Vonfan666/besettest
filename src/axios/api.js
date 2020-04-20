import { postRequest,getRequest } from './requests';


// 获取部门列表
export  const department = (params) => {
    return getRequest('/users/department/', params)
}

//提交注册
export  const regist = (params) => {
    return postRequest('/users/registers/', params)
}

//登录
export  const login = (params) => {
    return postRequest('/users/login/', params)
}

//新增项目
export  const addproject = (params) => {
    return postRequest('/users/addproject/', params)
}






