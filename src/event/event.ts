class event {
    private listners: {[key:string]: any[]};
    constructor(){
        this.listners = {};
    }

    // 订阅
    on(eventType:string, listner:Function){
        if (!this.listners[eventType]) {
            this.listners[eventType] = []
        }
        this.listners[eventType].push(listner)
    }

    // 发布
    emit(eventType:string,...args:any){
        if (this.listners[eventType]) {
            this.listners[eventType]?.forEach((listener)=>{
                listener(...args);
            })
        }
    }
}

export default new event();