<template>
    <div>
        <button @click="send">发消息</button>
        <ul>
            <li v-for="(item,index) in list" :key="index">
                {{item}}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data () {
        return {
            path:"ws://192.168.0.66:8081/a/b/",
            socket:"",
            list:[]
        }
    },
    mounted () {
        // 初始化
        this.init()
    },
    methods: {
        init: function () {
            if(typeof(WebSocket) === "undefined"){
                alert("您的浏览器不支持socket")
            }else{
                // 实例化socket
                this.socket = new WebSocket(this.path)
                // 监听socket连接
                this.socket.onopen = this.open
                // 监听socket错误信息
                this.socket.onerror = this.error
                // 监听socket消息
                this.socket.onmessage = this.getMessage
            }
        },
        open: function () {
            
            console.log("socket连接成功")
        },
        error: function () {
            this.init()
            console.log("连接错误")
        },
        getMessage: function (msg) {
            var cc=JSON.parse(msg.data)
            this.list.push(cc)
            console.log(cc["cap"])
            if(cc["cap"]===9){
                console.log("断开")
                this.socket.close()
                
            }
           
        },
        send: function () {
            this.socket.send("params")
        },
        close: function () {
            console.log("socket已经关闭")
        }
    },
    destroyed () {
        // 销毁监听
        this.socket.onclose = this.close
    }
}
</script>

<style>

</style>