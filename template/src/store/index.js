import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    openId: "",
    isFirstOpen: true,
    isLogin: false,
    userPhone: "",
    checkSuccess: false,
    urlSource: "SZHikvision",
    wxCode: "",
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
