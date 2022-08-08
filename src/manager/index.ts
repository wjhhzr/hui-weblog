import type Collector from 'src/collector/collector'
import Sender from 'src/sender'

type sender = Sender
class Manager {
    static instance: Manager;
    private loggers: Collector[];
    private sender: sender
    constructor(loggers: Collector[], sender: sender, writes: Function[]) {
        this.loggers = loggers;
        this.sender = sender;
        this.init(writes)
    }

    /**
     * 业务代码注册事件
     */
    add(logger: Collector) {
        this.loggers.push(logger);
        // 注册收集者
        this.registerLoggers()
    }

    /**
     * 初始化注册所有日志收集器
     */
    init(writes:Function[]) {
        writes.forEach(task=>task())
        this.registerLoggers();
    }

    /**
     * 注册事件
     */
    registerLoggers() {
        this.loggers.forEach((logger: Collector) => logger.listen(this.sender))
    }
}

export default Manager;