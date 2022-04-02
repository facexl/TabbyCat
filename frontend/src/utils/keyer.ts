const keyer = {
    current:0,
    prefix:String(Math.random()).substring(1,6)
}
Object.defineProperty(keyer,'key',{
    get(){
        this.current++;
        return `${this.prefix}k${this.current}`
    }
})

export default keyer