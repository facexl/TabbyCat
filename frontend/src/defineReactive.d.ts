declare global {
    const defineReactive:(obj:{
        [key:string]:any
    })=>typeof import('vue')['reactive']
}
export {}