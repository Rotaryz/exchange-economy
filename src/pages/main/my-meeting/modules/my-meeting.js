export const state = {
  codeList: [123]
}

export const getters = {
  codeList: (state) => state.codeList
}

export const mutations = {
  SET_CODE(state, list) {
    state.codeList = list
  }
}

export const actions = {
  setCode({commit}, list) {
    commit('SET_CODE', list)
  }
}
