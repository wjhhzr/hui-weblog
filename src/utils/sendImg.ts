const sendImage = (url:string, data:any)=>{
    let image = new Image();
    image.src = url + "/" + encodeURIComponent(JSON.stringify(data)); 
    image.onerror = ()=>{
        image = null;
    }
}

export default sendImage;