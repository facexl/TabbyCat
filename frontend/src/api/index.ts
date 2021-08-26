import $axios, { AxiosConfig } from './axiosSet'

// console.time()

// const originModule = require.context('./modules', true, /\.ts/) // webpack

const originModule = import.meta.globEager('./modules/*.ts')

interface response{
    code:number,
    data:any
}

interface apiFn{
    [key:string]:()=>Promise<response>
}
interface apiObj{
    [key:string]:apiFn
}

const $api:apiObj = {}

Object.keys(originModule).forEach((it:string) => {
  const o = originModule[it].default
  Object.keys(o).forEach(key => {
    o[`_${key}`] = o[key]
    o[key] = function (params:unknown = {}, config:AxiosConfig = {}, otherConfig:unknown = {}) {
      return $axios(o[`_${key}`], params, config, otherConfig)
    }
  })
  $api[it.replace(/\.\/modules\/(.+)\.ts$/, '$1')] = originModule[it].default
})

// console.timeEnd()

export default Object.freeze($api)
