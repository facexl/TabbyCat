import axios from 'axios'

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
    /** * 关闭 toast 的 function 无需设置 */
    toast?:any,
    /** * 是否需要参数扩展 默认 true */
    extendParams?:boolean,
    /** * 是否需要缓存 默认 false */
    cache?:boolean,
    /** * 是否刷新缓存 默认 false */
    fresh?:boolean
}

export default function (apiKey: string, params = {}, config: AxiosConfig = {}, otherConfig:any = {}) {

}
