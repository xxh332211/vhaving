/* eslint-disable */
let configure = (total) => {
  let result = []
  while (total) {
    result.push(total)
    total--
  }
  result.reverse()
  return result
}
let show = (total, idx) => {
  let result = configure(total)
  if (idx <= 1) {
    result = result
  } else if (total - idx <= 1) {
    result = result.slice(total - 3 >= 0 ? total - 3 : 0, total)
  } else {
    result = result.slice(idx - 2, idx + 1)
  }
  return result
}
export const increment = state => {
  state.count++
}
export const decrement = state => {
  state.count--
}
export const setfliter = (state, param) => {
  // console.log('222', param)
  state.filters[state.current] = state.filters[state.current] || {}
  state.filters[state.current][param.name] = param.id
  console.log(11111, state.filters)
}
export const resetfilter = (state, param) => {
  state.filters[param] = {
    PageNo: 1
  }
}
export const getdata = (state, data) => {
  state.data = data
}
export const getpage = (state, data) => {
  state.pages.total = Math.ceil(data.count / 10)
  state.pages.num = data.pageno
  state.pages.list = show(state.pages.total, state.pages.num)
  console.log('就看到就卡萨萨克', state.pages)
}
export const getsingle = (state, index) => {
  state.single = JSON.parse(JSON.stringify(state.data[index])) || []
  console.log('iiiiiqqq', state.single)
}
export const resetsingle = (state, index) => {
  state.single = []
  console.log('iiiii', state.single)
}
export const setcurrent = (state, param) => {
  state.current = param
}
export const togglemodal = state => {
  state.modal.show = !(state.modal.show)
}
export const confirmyes = state => {
  state.modal.show = !(state.modal.show)
  state.modal.confirm = true
}
export const confirmno = state => {
  state.modal.show = !(state.modal.show)
  state.modal.confirm = false
}
export const setmodal = (state, modal) => {
  state.modal.title = modal.title || "注意"
  state.modal.msg = modal.msg || '参数格式{show: boolean,title:titletext,msg:msg }'
  state.modal.type = modal.type || "alert"
}
export const togglenotice = state => {
  state.notice.show = !state.notice.show
}
export const setnotice = (state, notice) => {
  state.notice.msg = notice.msg || '参数格式{msg: string,}'
  state.notice.type = notice.type || 'success'
}
export const setslide = (state, param) => {
  state.slide[param.name] = param.value
  for (let i in state.slide) {
    if (i !== param.name) {
      state.slide[i] = false
    }
  }
}
