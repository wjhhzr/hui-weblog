import type { ClickProps } from "src/typing";

const click = (e: Event)=>{
    const { 
        target,
        type,
    } = e;

    const { tagName, innerHTML, innerText } = target as HTMLElement;
    const info: ClickProps = {
        tagName,
        inner : innerHTML ||  innerText,
    }

    // 处理图片
    if ( tagName === "IMG" ) {
        info.src = (target as HTMLImageElement).src;
    }
    
    return {
        type,   // 事件类型
        target: info
    }
}

export default click;