import { $axios, AxiosConfig } from './axiosSet'
// import { Api } from '@/Global/api/@types/api'

// console.time()

const originModule = require.context('./modules', true, /\.ts/)

const $api:{} = {}

originModule.keys().forEach((it) => {
  const o = originModule(it).default
  Object.keys(o).forEach(key => {
    o[`_${key}`] = o[key]
    o[key] = function (params:{} = {}, config:AxiosConfig = {}, otherConfig:{} = {}) {
      return $axios(o[`_${key}`], params, config, otherConfig)
    }
  })
  $api[it.replace(/\.\/(.+)\.ts$/, '$1')] = originModule(it).default
})

// console.timeEnd()

export default Object.freeze($api)
