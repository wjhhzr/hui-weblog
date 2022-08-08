import Sender from 'src/sender'
import { SENDER_TYPE, SENDER } from "src/typing";
import { throttle } from 'lodash'
import { THROTTLE_EVENT } from 'src/utils/constant';
class Collector {
    private ListenerTarget:Function; // 监听目标
    public type:string | Promise<any>;       // 监听类型
    public listener:Function;  // 采集者，负责收集用户事件信息
    public register:boolean;  // 采集者是否被注册了
    private sender:SENDER; // 采集者对应的发送方法类型
    constructor({ListenerTarget, type, listener, sender}:{
        ListenerTarget?:Function, type: string, listener: Function, sender?: SENDER
    }){
        this.ListenerTarget = ListenerTarget;
        this.type = type;
        this.listener = listener;
        this.register = false;
        this.sender = sender || SENDER_TYPE.IMG;
    }

    /**
     * 在监听目标上注册对应类型的监听器
     */
     listen(Sender: Sender){
        if (this.register) return;
        let target = this.ListenerTarget || window.addEventListener;
        let wait = 0;
        if (THROTTLE_EVENT.includes(this.type)) {
            wait = 1000;
        }
        // 代理
        const proxyListener = throttle((...args: any[]) => {
            // 获取日志处理函数返回的结果
            const result = this.listener.apply(this, args);
            // 如果返回false，则不发送日志
            if (!result) return;
            // 调用发送者方法上报日志
            Sender.add.call(Sender, this.sender, {...result, type: this.type});
        }, wait);
        // 注册监听事件
        target(this.type, proxyListener);
        this.register = true;
    }
}

export default Collector