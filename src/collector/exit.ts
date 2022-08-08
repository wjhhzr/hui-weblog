const exit = (e: ErrorEvent)=>{
    if (document.visibilityState === 'hidden') {
        return {
            
        }
    }
    return false;
}

export default exit;