import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    offices: [],
    officials: []
  },
  mutations: {
    setOffices(state, offices) {
      state.offices = offices
    },
    setOfficials(state, officials) {
      state.officials = officials
    }
  },
  actions: {
  },
  modules: {
  }
})
