import * as types from './mutation-types'

const mutations = {
  [types.SET_TOKEN](state, token){
    state.token = token
  },
  [types.SET_USERNAME](state, userName){
    state.userName = userName
  }
}

export default mutations;