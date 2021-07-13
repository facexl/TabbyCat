interface UserState{
    userInfo:{
        id:number
    }
}
export default {
  namespaced: true,
  state: {
    userInfo: {
      id: 1134
    }
  },
  getters: {
    userInfo (state:UserState) {
      console.log('trigger')
      return state.userInfo
    }
  },
  actions: {
    getUserInfo ({ state, commit }, product) {
      debugger
    }
  },
  mutations: {
    setUserInfo (state:UserState) {
      debugger
    }
  }
}
