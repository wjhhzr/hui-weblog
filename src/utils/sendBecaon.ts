const beacon = (url:string,data: any)=>{
    if (!navigator?.sendBeacon) {
        throw "current env not support sendBeacon!"
    }
    
    navigator.sendBeacon(url, encodeURIComponent(JSON.stringify(data)))
}

export default beacon;