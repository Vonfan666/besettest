var storage={
    set(key,value){
        localStorage.setItem(key,JSON.stringify(value));
    },
    get(key){
        if (!key) return
        let v =JSON.parse(localStorage.getItem(key))
        console.log("storage",v)
        if (v==null){
            return ""
        }
        return v
    },
    remove(key){
        localStorage.removeItem(key)
    },
    
}

export default storage