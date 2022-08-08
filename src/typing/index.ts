export interface InitProps {
    url: string
}

export interface Loggers {
    register: (params: {
        target: any,
        type: string,
        listener: Function
        consumer?: SENDER
    }) => void;
    sendlog: (type: string, info: Object, senderType: SENDER) => void;
}

export enum SENDER_TYPE { IMG = "img", BECAON = "becaon" }

export type SENDER = SENDER_TYPE.BECAON | SENDER_TYPE.IMG

export interface ICollector {
    target: Function,
    type: string,
    listener: Function
    register: boolean
    sender: Function
}

export interface ClickProps {
    tagName: string
    inner: string
    [key: string]: any
}

export enum LOG_TYPE {
    ENTRY = "load",
    EXIT = "unload",
    ERROR = "error",
    BEHAVIOR = "click",
    CUSTOM = "CUSTOM",
    FETCHSTART = "fetchstart",
    FETCHSUCCESS = "fetchsuccess",
    FETCHERROR = "fetcherror",
}

