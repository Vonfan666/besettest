// var str="123{{xxxx}}456[我的]789123[你的]456(1389090)789";

const globarlRe=(msg)=>{
    // var msg = /\{\{(.+?)\}\}/g; 
    msg.match(/\{\{[^.+?\}\}]/g);
    if(msg){
        return str.match(msg)
    }else{
        return false
    }
}


export default{
    globarlRe
}