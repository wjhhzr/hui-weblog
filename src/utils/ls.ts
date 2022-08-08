const getLs = (key: string)=>{
    if (!window) {
        throw "current env is not in browser！"
    }
    return window.localStorage.getItem(key)
}

const setLs = (key:string, value: any)=>{
    if (!window) {
        throw "current env is not in browser！"
    }
    window.localStorage.setItem(key, value)
}

const getSs = (key: string)=>{
    if (!window) {
        throw "current env is not in browser！"
    }
    return window.sessionStorage.getItem(key)
}

const setSs = (key:string, value: any)=>{
    if (!window) {
        throw "current env is not in browser！"
    }
    window.sessionStorage.setItem(key, value)
}

export {
    getLs,// 读取本地缓存
    setLs,// 设置本地缓存
    getSs,
    setSs
}