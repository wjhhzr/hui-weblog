/**
 * 页面加载事件函数
 */
const load = ()=>{
    return {
        performance: JSON.stringify(window.performance.timing)
    }
}

export default load;