// var str="123{{xxxx}}456[我的]789123[你的]456(1389090)789";

var globarlRe = {
    Re(msg) {
        var str = /\{\{(.+?)\}\}/g; 
       
        if (str) {
            return msg.match(str)
        } else {
            return false
        }
    }
}

export default globarlRe
