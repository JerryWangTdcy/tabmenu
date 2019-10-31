import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  token: 'abc123',
  activeTabName: 'home',
  tabList: [
    {
      label: ''
    }
  ]
}

const store = new Vuex.Store({
  state
})

export default store
// export default new Vuex.Store({
//   state: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//   }
// })
