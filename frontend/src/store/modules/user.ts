import $api from '@/api'

interface UserInfo{
    id:number
}
interface UserState{
    userInfo:UserInfo
}
export default {
  namespaced: true,
  state: {
    userInfo: {}
  },
  getters: {
    userInfo (state:UserState) {
      return state.userInfo
    }
  },
  actions: {
    async getUserInfo ({ commit, state }:unknown) {
      const { data } = await $api.user.info()
      commit('setUserInfo', data)
      return data
    }
  },
  mutations: {
    setUserInfo (state:UserState, data:UserInfo) {
      state.userInfo = data
    }
  }
} as any
