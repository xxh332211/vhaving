/* eslint-disable */
import api from '../api/api.js'
const mock = ['stock', 'category']
export const increment = ({commit}) => commit('increment')
export const decrement = ({commit}) => commit('decrement')
export const setfliter = ({commit}, param) => {
  commit('setfliter', param)
}
//设置下拉显示
export const setslide = ({commit, state}, param) => {
  commit('setslide', param)
}
export const resetfilter = ({commit}, param) => commit('resetfilter', param)
export const getdata = ({commit, state}) => {
  let method = state.current + '_list'
  if (mock.indexOf(state.current) === -1){
    api.list(state.filters[state.current], method).then(item => {
      commit('getdata', item.results || [])
      commit('getpage', item || {})
    })
  } else {
    api.mockGet(state.filters[state.current], state.current).then(item => {
      commit('getdata', item.results || [])
      commit('getpage', item || {})
    })
  }
}
export const getsingle = ({commit}, index) => {
  commit('getsingle', index)
}
export const resetsingle = ({commit}) => commit('resetsingle')
export const setcurrent = ({commit}, param) => {
  commit('setcurrent', param)
}
export const togglemodal = ({commit}) => commit('togglemodal')
export const confirmyes = ({commit}) => commit('confirmyes')
export const confirmno = ({commit}) => commit('confirmno')
export const alerts = ({commit}, modal) => {
  commit('setmodal', modal)
  commit('togglemodal')
  console.log('asasasasasasas')
}
export const togglenotice = ({commit}) => commit('togglenotice')
export const notice = ({commit}, notice) => {
  commit('setnotice', notice)
  commit('togglenotice')
  setTimeout(function() {
    commit('togglenotice')
  }, notice.time || 3000);
}
