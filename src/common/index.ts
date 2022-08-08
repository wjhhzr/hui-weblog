import User from 'src/user';
import UAParser from 'ua-parser-js'
import { v4 as uuidv4 } from 'uuid'; 
import dayjs from 'dayjs'
class Common {
    public static _instance: Common;
    private user: User;
    private ua: UAParser.IResult
    constructor(){
        this.ua = new UAParser().getResult();
        this.user = new User();
    }


    public static getInstance(){
        if (!this._instance) {
            this._instance = new Common();
        }
        return this._instance
    }

    /**
     * 获取公共字段
     */
    getCommons(){
        const {browser ,cpu, device, engine, os, ua} = this.ua;
        return {
            userId: this.user.userId,  // 用户id
            traceId: this.user.traceId, // 链路id
            osName: os.name,       // 系统名
            osVer: os.version,     // 系统版本
            browserName: browser.name,  // 浏览器名
            browserVer: browser.version, // 浏览器版本
            cpu: cpu.architecture || "unknown",       // cpu结构
            deviceVendor: device.vendor,       // 设备品牌
            deviceModel: device.model,       // 设备名称
            deviceType: device.type,       // 设备平台
            engine: engine.name,           // 浏览器引擎
            engineVer: engine.version,     // 浏览器引擎版本
            ua: ua,                    // 原始ua
            pathname: window.location.pathname, // 当前路径
            origin: window.location.origin,  // URL's origin
            date: dayjs().format("YYYY-MM-DD HH:mm:ss"), // 日志时间
        }    
    }
}

export default Common;