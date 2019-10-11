export const state = {
  linkList: []
}

export const getters = {
  linkList(state) {
    return state.linkList
  }
}

export const mutations = {
  SET_LINK_LIST(state, list) {
    state.linkList = list
  }
}

export const actions = {
  setLinkList({commit}, list) {
    commit('SET_LINK_LIST', list)
  }
}
