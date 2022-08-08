import Common from "src/common";
import sendImage from "src/utils/sendImg";
import { SENDER_TYPE, SENDER } from "src/typing";
import beacon from "src/utils/sendBecaon";

class Eventor {
    private user: { [KEY: string]: any[] };
    private pool: { [key in SENDER_TYPE]?: any[] };
    private common: Common;
    private url: string;

    constructor(url:string, common: Common) {
        this.url = url;
        this.common = common;
        this.pool = {};
        this.user = {};
        this.init()
    }

    /**
     * 初始化订阅日志发送器
     */
    init(){
        this.listen(SENDER_TYPE.IMG, sendImage)
        this.listen(SENDER_TYPE.BECAON, beacon)
    }

    /**
     * 添加消息
     * @param data 日志内容
     */
    add(type: SENDER, data: any) {
        if (!this.pool[type]) {
            this.pool[type] = [];
        }
        this.pool[type].push(data)
        this.tigger(type);
    }

    /**
     * 订阅消息
     * @param type 订阅类型
     * @param fn 消费的函数
     */
    listen(type: SENDER, fn: Function) {
        if (!this.pool[type]) {
            this.user[type] = [];
        }
        this.user[type].push(fn);
    }

    /**
     * 手动上报日志，默认类型为custom
     */
    custom(type: string = "custom", info: Object, senderType: SENDER = SENDER_TYPE.IMG){
        const data = {
            ...info,
            ...this.common.getCommons(),
            type,
        }
        this.add(senderType, data);
    }

    /**
     * 消费日志
     */
    private tigger(type:SENDER_TYPE) {
        let key = Array.prototype.shift.call(arguments),
            userFns = this.user[key];
        if (!userFns || userFns.length === 0) {
            return false;
        }
        // 取出要消费的日志
        const logInfo = this.pool[type].shift();
        // 公共字段
        const com = this.common.getCommons();
        
        // 组装消息
        const result = {
            ...logInfo,
            ...com
        }
  
        for (var i = 0, fn; fn = userFns[i++];) {
            // 消费消息
            fn( this.url, result);
        }
    }
}

export default Eventor;