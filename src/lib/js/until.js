import md5 from 'MD5'
export const GetSignature = (param, requestdata, secret) => {
  let arr = []
  let result = ''
  let url = ''
  let tempparam = JSON.parse(JSON.stringify(param))
  let temprequestdata = JSON.parse(JSON.stringify(requestdata))
  tempparam = Object.assign(tempparam, temprequestdata)
  console.log('wwww', tempparam)
  for (let value in tempparam) {
    arr.push(encodeURI(value))
    url += encodeURI(value) + '=' + encodeURI(tempparam[value]) + '&'
  }
  arr.sort()
  result = arr.map((val) => {
    return val + tempparam[val]
  }).join('')
  result = secret + result + secret
  result = md5(result).toLocaleUpperCase()
  url += 'sign=' + result
  let returns = JSON.parse(JSON.stringify(tempparam))
  returns.sign = result
  return {
    result,
    url,
    returns
  }
}

