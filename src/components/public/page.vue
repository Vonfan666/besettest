<template>
  <div class="page" style="text-align:center;margin:20px 0">
    <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            currentPage:1,  //默认当前第一页
            total:10,  //总数
            pageSize:10, //默认每页多少个
            allPage:1 //总页数
        }
    },
    //父组件定义ref
    // 父组件传一个一个page方法 需要传page(page = 1, pageSize = 10)
    // 移除方法 以及新增方法    直接用子组件的 page当前页 和 pageSize
    methods:{
        handleSizeChange(val) {  //修改每页展示数量-如果并展示当前页--如果总页数小于当前页--则展示最大页码
        console.log(`每页 ${val} 条`);
        this.pageSize=val
        this.currentPage=1
        this.$parent.$parent.pageMethods(this.currentPage,val)

      },
      handleCurrentChange(val) {   //请求当前页的数据
      //请求爸爸的方法---返回一个list-然后渲染
        console.log(`当前页: ${val}`);
        
        this.currentPage=val
        this.$parent.$parent.pageMethods(val,this.pageSize)
        
        
      }
    }
}
</script>

<style>

</style>



// data{
//   pageMethods:this.page,
// }

//  <el-button
//               type="primary"
//               size="small"
//               @click="page();pageMethods=page"
//             >查看结果</el-button>
//           </div>

    // page(page = 1, pageSize = 10,type=1) {
    //   var rec=null
      
      
    //   if (this.currentCaseId === null) {
    //     Message.error("请选择用例或分类");
    //   } else {
    //     this.statusIng.resultStatus=true;  //打开
    //     CaseResults({
    //       type: type,
    //       c_id: this.currentCaseId,
    //       page: page,
    //       pageSize: pageSize
    //     }).then(res => {
    //       if (res.status === 200) {
    //         this.loading.loading_results=false
    //         console.log(res.results)
    //         this.resultsLog = res.results    #执行完成之后把结果传给这个组件---以及
    //         this.$refs.DebugResultPage.total=res.total
    //         this.$refs.DebugResultPage.allPage=res.allPage
    //       }
    //     });
    
        
    //   }
    //   return rec
    // },
