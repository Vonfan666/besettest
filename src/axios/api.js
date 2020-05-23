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

//存储用户最新访问的项目
export const lastUseProject=(params)=>{
    return postRequest("/users/last_use_project/",params)
}


//获取请求方法 请求类型 响应类型列表数据
export const postMethods=(params)=>{
    return getRequest("/users/post_methods/",params)
}

//添加文件夹
export const addFile=(params)=>{
    return postRequest("/users/add_file/",params)
}

//删除文件夹
export const RemoveFile=(params)=>{
    return postRequest("/users/remove_file/",params)
}

//编辑接口文件夹
export const EditFilesName=(params)=>{
    return postRequest("/users/edit_file/",params)
}


//查询文件夹以及文件夹下所有内容
export const SelectFile=(params)=>{
    return getRequest("/users/select_file/mock/",params)
}


//新增接口文件
export const addFiles=(params)=>{
    return postRequest("/users/add_files/",params)
}

//编辑接口文件
export const EditFiles=(params)=>{
    return postRequest("/users/edit_files/",params)
}

//删除接口文件
export const RmoveFiles=(params)=>{
    return postRequest("/users/remove_files/",params)
}

//复制接口文件
export const CopyFiles=(params)=>{
    return postRequest("/users/copy_files/",params)
}


//获取当前接口详情
export const InterfaceDetailGet=(params)=>{
    return getRequest("/users/interface_detail/",params)
}


//修改接口文档数据
export const EditInterfaceDetail=(params)=>{
    return postRequest("/users/edit_interface_detail/",params)
}

//模拟请求
export const MockPost=(params)=>{
    return postRequest("/users/mock_requests/",params)
}

// 修改mock返回类型以及对应的返回数据
export const MockResData=(params)=>{
    return postRequest("/users/mock_update_type/",params)
}
//新增环境变量
export const EnvironmentsAdd=(params)=>{
    return postRequest("/users/environment_add/",params)
}


//查询环境变量
export const EnvironmentsSelect=(params)=>{
    return getRequest("/users/environment_select/",params)
}

//删除环境变量
export const EnvironmentsDelete=(params)=>{
    return postRequest("/users/environment_delete/",params)
}

//修改用例管理文件同步状态
export const ProjectUnityStatus=(params)=>{
    return postRequest("/users/unity_project/",params)
}

//获取用例文件夹内容以及用例接口内容


export const CaseGroup=(params)=>{
    return getRequest("/users/select_caseGroup/",params)
}


//添加用例文件夹
export const AddGroup=(params)=>{
    return postRequest("/users/caseGroup_add/",params)
}

//修改用例文件夹名称
export const EditGroup=(params)=>{
    return postRequest("/users/caseGroup_edit/",params)
}


//删除用例文件夹
export const RemoveGroup=(params)=>{
    return postRequest("/users/caseGroup_remove/",params)
    
}

//新增用例接口文件
export const AddCase=(params)=>{
    return postRequest("/users/caseInterface_add/",params)
    
}

//编辑接口用例文件
export const EditCase=(params)=>{
    return postRequest("/users/caseInterface_edit/",params)   
}

//删除接口用例文件
export const RemoveCase=(params)=>{
    return postRequest("/users/caseInterface_remove/",params)   
}