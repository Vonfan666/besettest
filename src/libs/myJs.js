var jsMethods ={
    deleteTwo() {
        
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        })
            .then(() => {
                console.log(arguments)
                // console.log(func)
                arguments[0](arguments[1])
                // this.$message({
                //   type: "success",
                //   message: "删除成功!"
                // });
            })
            .catch(() => {
                this.$message({
                    type: "info",
                    message: "已取消删除"
                });
            });
    },
}

export default jsMethods