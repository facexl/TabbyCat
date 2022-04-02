

/**
 * 方便取消的 addEventListener
 * @param {*} type 
 * @param {*} fn 
 * @param {*} options 
 * @returns 
 */
 EventTarget.prototype.betterAddEventListener = function(type,fn,options){
    this.addEventListener(type,fn,options);
    return ()=>{
        this.removeEventListener(type,fn,options)
    }
}