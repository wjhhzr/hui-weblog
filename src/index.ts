import Manager from "src/manager";
import {InitProps, Loggers, SENDER} from './typing'
import Common from "src/common";
import collectors from "./collector";
import Sender from "./sender";
import Collector from "./collector/collector";
import {rewriteFetch} from "./collector/fetch";

/**
 * 初始化需要完成的工作
 * 1. 初始化整个链路需要的公共字段(不变的部分)
 *  a. 本次访问id, 用户虚拟id
 *  b. 设备信息字段
 * 2. 注册各类事件，用于采集日志信息
 * 3. 创建一个任务池，用于上报日志
 */
const init = ({
    url
}:InitProps):Loggers=>{
    const common = Common.getInstance()
    // 格式化默认的收集者
    const sender = new Sender(url, common);
    const WRITERS = [rewriteFetch]
    const manager = new Manager(collectors, sender, WRITERS);

    const register = ({
        target, 
        type,
        listener,
        consumer
    }:{
        target: any, 
        type: string,
        listener: Function
        consumer?: SENDER
    }):void=>{
        const collector =  new Collector({
            ListenerTarget: target,
            type,
            listener,
            sender: consumer
        })

        // 添加一个采集者
        manager.add(collector);
    }

    return {
        register,     // 注册收集器
        sendlog: sender.custom.bind(sender)  // 自定义发送日志
    }
}

export default {
    init
}