/* eslint-disable */
import Vue from 'vue'
import { GetSignature } from '../lib/js/until.js'
const gettime = (time) => {
  let tzoffset = (new Date()).getTimezoneOffset() * 60000
  let localISOTime = (new Date(Date.now() - tzoffset)).toISOString()
  localISOTime = localISOTime.replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').replace(/(-)/g, '-')
  return localISOTime
}
const METHOD = {
  'role_list': 'vchange.role.list', //角色列表请求地址
  'role_insert': 'vchange.role.insert', //添加角色
  'role_update': 'vchange.role.update', //修改角色
  'role_delete': 'vchange.role.delete', //删除角色
  'menu_list': 'vchange.func.list', //菜单列表请求地址
  'menu_insert': 'vchange.func.insert', //增加菜单
  'menu_update': 'vchange.func.update', //修改菜单
  'menu_delete': 'vchange.func.delete', //删除菜单
  'user_list': 'vchange.admin.list', //用户列表请求地址
  'user_insert': 'vchange.admin.insert', //添加用户
  'user_update': 'vchange.admin.update', //修改用户
  'user_delete': 'vchange.admin.delete', //删除用户
  'user_freeze': 'vchange.admin.freeze', //冻结用户
  'power_info': 'vchange.power.info', //获取用户权限
  'power_update': 'vchange.power.update',//修改用户权限
  'user_repassword': 'vchange.admin.repassword', //重置密码
  'part_list': 'vchange.dept.list', //部门列表请求地址
  'part_insert': 'vchange.dept.insert',//新增部门
  'part_update': 'vchange.dept.update', //修改部门
  'part_delete': 'vchange.dept.delete', //部门删除
  'part_info': 'vchange.dept.info', //单个部门查询信息
  'member_list': 'vchange.user.list', //会员列表请求地址
  'member_insert': 'vchange.user.insert', //添加会员
  'member_update': 'vchange.user.update', //修改会员
  'member_delete': 'vchange.user.delete', //删除会员
  'tennet_list': 'vchange.tenant.list', //租户列表
  'tennet_update': 'vchange.tenant.update', //租户修改
  'tennet_insert': 'vchange.tenant.insert', //租户添加
  'tennet_delete': 'vchange.tenant.delete', //租户删除
  'login': 'vchange.admin.login' //登录
}
const PAGESIZE = 10
const SECRET = 'ED7B184CCAE248FF'
const PARAM = {
  method: '',
  ver: '1',
  timestamp: '',
  format: 'json',
  app_key: '1000',
  sign_method: 'md5',
  session: '1799163E221F4638A27D0CBC47830C07'
}

// const baseUrl = 'http://192.168.2.162/VChangeUserService/Router.aspx'

const baseUrl = 'http://192.168.2.110/Router.aspx'
// const baseUrl ='http://192.168.2.24:81'
const api = {}
let globalxhr = ''
api.list = (requestData, method) => {
  PARAM.timestamp = gettime()
  let redata = JSON.parse(JSON.stringify(requestData))
  let updata = JSON.parse(JSON.stringify(PARAM))
  updata.timestamp = gettime()
  updata.method = METHOD[method]
  updata.PageSize = PAGESIZE
  updata.PageNo = redata.PageNo
  delete redata.PageNo
  let lastdata = {JSON: JSON.stringify(redata)}
  let request = GetSignature(updata, lastdata, SECRET)
  return new Promise((resolve, reject) => {
    Vue.http.post(baseUrl, request.returns, {
      // headers: {
      //   'Access-Control-Allow-Origin': '*',
      //   'Content-Type': 'application/json; charset=utf-8'
      // },
      before (xhr) {
        if(globalxhr) {
          globalxhr.abort()
        }
        globalxhr = xhr
      },
      emulateJSON: true
    }).then(function (response) {
      resolve(response.body.Response)
    })
  })
}

//下拉选择请求
api.select = (requestData, method, isall) => {
  PARAM.timestamp = gettime()
  let redata = JSON.parse(JSON.stringify(requestData))
  let updata = JSON.parse(JSON.stringify(PARAM))
  updata.method = METHOD[method]
  updata.PageSize = isall?0:PAGESIZE
  updata.PageNo = isall?0:redata.PageNo
  delete redata.PageNo
  let lastdata = {JSON: JSON.stringify(redata)}
  let request = GetSignature(updata, lastdata, SECRET)
  return new Promise((resolve, reject) => {
    Vue.http.post(baseUrl, request.returns, {
      // headers: {
      //   'Access-Control-Allow-Origin': '*',
      //   'Content-Type': 'application/json; charset=utf-8'
      // },
      emulateJSON: true
    }).then(function (response) {
      resolve(response.body.Response)
    })
  })
}
//操作请求
api.post = (requestData, method) => {
  PARAM.timestamp = gettime()
  PARAM.method = METHOD[method]
  let request = GetSignature(PARAM, requestData, SECRET)
  return new Promise((resolve, reject) => {
    Vue.http.post(baseUrl, request.returns, {
      headers: {
        'Content-Type': 'multipart/form-data; charset=UTF-8'
      },
      emulateJSON: true,
    }).then(function (response) {
      resolve(response.body.Response)
    })
  })
}
//用户选择请求
api.user = (requestData, method) => {
  PARAM.timestamp = gettime()
  PARAM.method = METHOD[method]
  let request = GetSignature(PARAM, requestData, SECRET)
  return new Promise((resolve, reject) => {
    Vue.http.post(baseUrl, request.returns, {
      headers: {
        'Content-Type': 'multipart/form-data; charset=UTF-8'
      },
      emulateJSON: true,
    }).then(function (response) {
      resolve(response.body.Response.UserList)

    })
  })
}

//模拟数据
const mockUrl = 'http://localhost:3000/'
api.mockPost = (requestData, method) => {
  return new Promise((resolve, reject) => {
    Vue.http.post(mockUrl + method, requestData, {
      emulateJSON: true,
    }).then(function (response) {
      resolve(response)
    })
  })
}
api.mockPut = (requestData, method) => {
  return new Promise((resolve, reject) => {
    Vue.http.put(mockUrl + method, requestData, {
      emulateJSON: true,
    }).then(function (response) {
      resolve(response)
    })
  })
}
api.mockGet = (requestData, method) => {
  console.log('qwqeq', requestData)
  let query = '?'
  if (requestData.Search) {
    query += 'q=' + requestData.Search
  }
  return new Promise((resolve, reject) => {
    Vue.http.get(mockUrl + method + query, {
      emulateJSON: true,
    }).then(function (response) {
      console.log('response', response)
      let data = {
        count: response.body.length,
        pageno: requestData.PageNo,
        results: response.body.slice((requestData.PageNo -1)*10, requestData.PageNo*10)
      }
      resolve(data)
    })
  })
}
api.mockDel = (requestData, method) => {
  console.log('asasasasa111', requestData)
  let id = JSON.parse(requestData.JSON)[0]
  return new Promise((resolve, reject) => {
    Vue.http.delete(mockUrl + method + '/' + id, {
      emulateJSON: true,
    }).then(function (response) {
      resolve(response)
    })
  })
}

export default api
