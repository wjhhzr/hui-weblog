import load from "./load"
import click from "./click"
import error from "./error"
import exit from "./exit"
import Collector from './collector'
import fetchListener from "./fetch"
import event from "src/event/event"
import { SENDER_TYPE, LOG_TYPE } from "src/typing"

export default [
    new Collector({
        type: LOG_TYPE.ENTRY,
        listener: load,
        sender: SENDER_TYPE.IMG
    }),
    new Collector({
        type: LOG_TYPE.BEHAVIOR,
        listener: click,
        sender: SENDER_TYPE.IMG
    }),
    new Collector({
        type: LOG_TYPE.ERROR,
        listener: error,
        sender: SENDER_TYPE.IMG
    }),
    new Collector({
        type: LOG_TYPE.ERROR,
        listener: error,
        sender: SENDER_TYPE.IMG
    }),
    new Collector({
        type: LOG_TYPE.EXIT,
        listener: exit,
        sender: SENDER_TYPE.BECAON
    }),
    new Collector({
        type: LOG_TYPE.FETCHSUCCESS,
        ListenerTarget: event.on.bind(event),
        listener: fetchListener.success
    }),
    new Collector({
        type: LOG_TYPE.FETCHERROR,
        ListenerTarget: event.on.bind(event),
        listener: fetchListener.error
    })
]



