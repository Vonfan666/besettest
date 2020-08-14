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
    return getRequest("/users/select_file/",params)
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

//添加用例
export const AddInterfaceCase=(params)=>{
    return postRequest("/users/case_add/",params)   
}

//删除用例
export const ClassRemove=(params)=>{
    return postRequest("/users/case_remove/",params)   
}

//获取当前用例接口的用例列表
export const CaseList=(params)=>{
    return getRequest("/users/case_list/",params)   
}

//获取当前单个用例数据
export const CaseEdit=(params)=>{
    return getRequest("/users/case_edit/",params)   
}


// export const Runcase=(params)=>{
//     return postRequest("/users/case_run/",params)   
// }

//用例单点执行
export const Runcase=(params)=>{
    return postRequest("/users/case_run/",params)   
}
//用用例调试
export const DebugCase=(params)=>{
    return postRequest("/users/case_debug/",params)   
}

//用例排序
export const CaseOrder=(params)=>{
    return postRequest("/users/case_order/",params)   
}
//查看用例排序
export const CaseOrderGet=(params)=>{
    return getRequest("/users/case_order/",params)   
}

//新增计划
export const AddCasePlan=(params)=>{
    return postRequest("/users/casePlan_add/",params)   
}

//查看计划列表
export const getCasePlan=(params)=>{
    return getRequest("/users/casePlan_get/",params)   
}


//编辑计划
export const UpdateCasePlan=(params)=>{
    return postRequest("/users/casePlan_edit/",params)   
}

//删除计划
export const DeleteCasePlan=(params)=>{
    return postRequest("/users/casePlan_delete/",params)   
}


//查看用例列表
export const GetCaseList=(params)=>{
    return getRequest("/users/caseList_get/",params)   
}

//编辑用例执行顺序
export const EditCaseOrder=(params)=>{
    return postRequest("/users/caseOrder_edit/",params)   
}


//执行测试计划
export const RunCaseAll=(params)=>{
    return postRequest("/users/case_run_all/",params)   
}


//查看debug测试结果
export const CaseResults=(params)=>{
    return getRequest("/users/case_results/",params)   
}

//删除debug测试结果
export const CaseResultsDel=(params)=>{
    return postRequest("/users/case_results_del/",params)   
}


//查看debug测试结果详情
export const CaseResultsDetail=(params)=>{
    return getRequest("/users/case_results_detail/",params)   
}
//新增自己的定时任务列表
export const addTimedTask=(params)=>{
    return postRequest("/users/add_timedTask/",params)   
}

//查看自己的定时任务列表
export const GetTimedTask=(params)=>{
    return getRequest("/users/get_timedTask/",params)   
}

//cron表达式校验
export const ValidCron=(params)=>{
    return postRequest("/users/valid_cron/",params)   
}


//删除自己的定时任务
export const RemoveTimedTask=(params)=>{
    return postRequest("/users/remove_timedTask/",params)   
}


//编辑自己的定时任务
export const UpdateTimedTask=(params)=>{
    return postRequest("/users/update_timedTask/",params)   
}

//新增数据库连接
export const addSqlBox=(params)=>{
    return postRequest("/users/add_sql_box/",params) 
}


//查看数据库连接列表
export const GetSqlBox=(params)=>{
    return getRequest("/users/get_sql_box/",params)   
}

//删除数据库连接
export const removeSqlBox=(params)=>{
    return postRequest("/users/remove_sql_box/",params)   
}

//更新数据库连接
export const updateSqlBox=(params)=>{
    return postRequest("/users/update_sql_box/",params)   
}

// sql  操作
//新增sql
export const addSqlStatement=(params)=>{
    return postRequest("/users/add_sql_statement/",params)   
}

//查询当前项目所有的数据库连接以及SQL类型
export const GetBoxOrSqlType=(params)=>{
    return getRequest("/users/get_boxList_or_SqlType/",params)   
}



//新增SQL语句
export const AddSql=(params)=>{
    return postRequest("/users/add_sql/",params)   
}
//查询sql语句
export const GetSql=(params)=>{
    return getRequest("/users/get_sql/",params)   
}

//修改sql语句
export const UpdateSql=(params)=>{
    return postRequest("/users/update_sql/",params)   
}
//移除sql语句
export const RemoveSql=(params)=>{
    return postRequest("/users/remove_sql/",params)   
}

//sql查询
export const ValidSql=(params)=>{
    return postRequest("/users/valid_sql/",params)   
}

// 点获取前置列表 数据库 以及对应的sql数据
export const GetBoxSqlList=(params)=>{
    return getRequest("/users/case_get_box_or_sql/",params)   
}
