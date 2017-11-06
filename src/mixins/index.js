/* eslint-disable */
const PATTERN = {
    is_null: /\S/,
    is_email: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
    is_mobile: /^1[34578]\d{9}$/
  }
const MSG = {
  is_null: '不能为空',
  is_email: '格式不正确',
  is_mobile: '格式不正确'
}
export const CheckRule = {
  methods: {
    checkdata (data, checks) {
        let checkdatas = JSON.parse(JSON.stringify(data))
        let result = []
        checks.forEach((value, index) => {
          if (!PATTERN[value.type].test(checkdatas[value.name])) {
            result.push(value.msg + MSG[value.type])
          }
        })
        return result
      }
  }
}
