const baseURL = 'https://mep.herb.app.meca.in.th'
export default {
  get (endpoint, token = null) {
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    return fetch(baseURL + endpoint, { method: 'GET', headers })
  },
  post (endpoint, body = {}, token = null) {
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    if (token) {
      headers['Authorization'] = 'Bearer ' + token
    }
    return fetch(baseURL + endpoint, { method: 'POST', headers, body: JSON.stringify(body) })
  },
}