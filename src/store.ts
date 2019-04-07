import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    user: null,
    posts: null,
    apis: {
      authentication: {
        base: 'https://crm.redcapital.pe/api',
      },
      posts: {
        base: 'https://jsonplaceholder.typicode.com',
      }
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token
    },
    removeToken(state) {
      state.token = null
    },
    removeUser(state) {
      state.user = null
    },
    setPosts(state, posts) {
      state.posts = posts;
    },
  },
  actions: { }
})
