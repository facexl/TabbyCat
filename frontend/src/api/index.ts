import $axios, { AxiosConfig } from './axiosSet'

// console.time()

const originModule = require.context('./modules', true, /\.ts/)

interface apiFn{
    [key:string]:()=>Promise<unknown>
}
interface apiObj{
    [key:string]:{
        [key:string]:apiFn
    }
}

const $api:apiObj = {}

originModule.keys().forEach((it:string) => {
  const o = originModule(it).default
  Object.keys(o).forEach(key => {
    o[`_${key}`] = o[key]
    o[key] = function (params:unknown = {}, config:AxiosConfig = {}, otherConfig:unknown = {}) {
      return $axios(o[`_${key}`], params, config, otherConfig)
    }
  })
  $api[it.replace(/\.\/(.+)\.ts$/, '$1')] = originModule(it).default
})

// console.timeEnd()

export default Object.freeze($api)
