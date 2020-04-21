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
export  const projectAdd = (params) => {
    return postRequest('/users/add_project/', params)
}

//项目列表
export const  projectList = (params) => {
    return getRequest('/users/project_list/',params)
}


//删除项目

export const projectRemove = (params)=> {
    return postRequest("/users/remove_project/",params)
}
//编辑项目
export const projectEdit = (params)=> {
    return postRequest("/users/edit_project/",params)
}


//获取用户最后访问项目
export const projectLast = (params)=> {
    return getRequest("/users/last_use_project/",params)
}


