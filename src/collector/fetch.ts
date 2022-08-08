import event from 'src/event/event'
import {LOG_TYPE} from '../typing'
let hasWrite = false
function rewriteFetch() {
    ((window) => {
        if (hasWrite) {
            return;
        }
        const oldFetch = window.fetch;
        window.fetch = function (input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
            const startTime = Date.now()
            const reportData = {
                startTime,
                url: input,
                method: (init?.method || 'GET').toUpperCase(),
                endTime: Date.now(),
                duration: 0,
                status: 0,
                success: false
            }
            event.emit.call(event, LOG_TYPE.FETCHSTART, reportData)
            return oldFetch(input, init).then((res) => {
                reportData.endTime = Date.now()
                reportData.duration = reportData.endTime - reportData.startTime
    
                const data = res.clone()
                reportData.status = data.status
                reportData.success = data.ok
                event.emit.call(event, LOG_TYPE.FETCHSUCCESS, reportData)
                return res;
            }).catch(err => {
                reportData.endTime = Date.now()
                reportData.duration = reportData.endTime - reportData.startTime
                reportData.status = 0
                reportData.success = false
                event.emit.call(event, LOG_TYPE.FETCHERROR, reportData)
                throw err;
            })
        }
        hasWrite = true;
    })(window)
}

const fetchListener = {
    success: (data:any)=>{
        console.log("请求成功啦", data);
        return data;
    },
    error:(data:any)=>{
        console.log("请求失败啦", data);
        return data;
    }
}

export default fetchListener;

export {
    rewriteFetch
}