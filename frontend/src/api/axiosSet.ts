import axios from 'axios'
import { local } from '@/utils/index'
import { ElMessage } from 'element-plus'
import Router from '@/router/index'

const axiosInstance = axios.create({
  timeout: 55000
})

export interface AxiosConfig{
    /** * 全屏loading */
    loading?: boolean;
    /** * loading文案 默认加载中 */
    loadingDesc?: string;
    /** * 登录拦截 默认 true */
    auth?: boolean;
    /** * 错误提示 默认 true */
    errorKill?: boolean;
    success?:boolean;
    successText?:string;
    /** * 直接调用三方api 默认 false */
    thirdApi?:boolean;
    /** * 是否需要缓存 默认 false */
    cache?:boolean,
    /** * 是否刷新缓存 默认 false */
    fresh?:boolean
}

export default function (apiKey: string, params:any = {}, config: AxiosConfig = {}, otherConfig:any = {}) {
  const apiConfig = {
    loading: false,
    loadingDesc: '加载中...',
    auth: true,
    errorKill: true,
    success: false,
    successText: '操作成功',
    thirdApi: false,
    cache: false,
    fresh: false,
    ...config
  }
  if (otherConfig.headers) {
    otherConfig.headers.Authorization = local.get('_t')
  } else {
    otherConfig.headers = { Authorization: local.get('_t') }
  }
  const apiUrlArr = apiKey.split(' ')
  return axiosInstance({
    method: apiUrlArr[0],
    url: apiUrlArr[1],
    data: params,
    params: apiUrlArr[0].toLowerCase() === 'get' ? params : {},
    ...otherConfig
  }).then(res => {
    if (apiConfig.thirdApi) {
      return res.data
    }
    if (res.data.code === 10010) {
      apiConfig.auth && Router.replace({
        name: 'login',
        query: {
          redirect: location.pathname
        }
      })
    }
    if (res.data.code === 999) {
      apiConfig.errorKill && ElMessage.error(res.data.message)
    }
    if (res.data.code === 0) {
      return res.data
    }
    throw res.data
  }).catch(err => {
    if (err.code) {
      switch (err.code) {
        case 9999:
          ElMessage.error('系统异常')
          break
      }
    }
    throw err
  })
}
