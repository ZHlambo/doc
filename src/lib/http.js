import Vue from 'vue';

const formateUrl = (url) => {
  return url.indexOf("http") === 0 ? url : `http://localhost:3000${url}`;
}


const methods = ['get', 'post', 'put', 'patch', 'delete']
var fetchRequest = {}
var user = {}
try {
  user = JSON.parse(localStorage.getItem('user') || "{}")
} catch (e) {
  throw e;
}
methods.forEach(method => {
  fetchRequest[method] = (url, body, headers = {}) => {
    url = formateUrl(url);
    let options = {
      url,
      method,
      headers
    }
    if (method === 'get') {
      if (body && typeof body === 'object') {
        url += '?'
        for (let k in body) {
          url += (k + '=' + body[k] + '&')
        }
        url = url.substring(0, url.length - 1)
      }
      options.url = url
    } else {
      options.body = JSON.stringify(body)
    }

    if (typeof options.headers !== 'object') {
      options.headers = {}
    }
    if (user && (user.access_token || user.token)) {
      options.headers['Authorization'] = `bearer ${user.access_token || user.token}`
      options.headers['access_token'] = `${user.access_token || user.token}`
    }
    for (let key in options.headers) {
      Vue.http.headers.common[key] = options.headers[key] + ''
    }
    delete options.headers
    return Vue.http(options).then(res => {
      try {
        res = res.json()
      } catch (e) {
        res = {}
      }
      return res
    });
  }
})

fetchRequest.setUser = (data) => {
  user = Object.assign(user, data)
  localStorage.setItem('user', JSON.stringify(user))
}

export default fetchRequest
