import axios from 'axios'

import Auth from './auth'

const API = 'http://localhost:8000/api'

export const login = (user) => {
  axios.post(`${API}/user/login`,  user )
  .then(res => {
    console.log(res.data.refresh)
    // let date = new Date(Date.now)
    // let expire = new Date(date.setMonth(date.getMonth() + 1))
    // document.cookie = `refresh=${res.data.refresh}; expires=${expire.toUTCString()}`
    localStorage.setItem('refresh', res.data.refresh)
    localStorage.setItem('id', res.data.user._id)
    localStorage.setItem('name', res.data.user.name)
    Auth.addToken(res.data.user._id, res.data.token, res.data.user.name)
  }).catch(error => {
    console.log(error)
  })
}

const renew = () => {
  const token = Auth.getToken(localStorage.getItem('id')).then(token => {
    const refreshToken = localStorage.getItem('refresh')
    const tokens = {
      refresh: refreshToken,
      token: token
    }
    axios.post(`${API}/validate/renew`, tokens).then(newToken => {
      Auth.replaceToken(localStorage.getItem('id'), newToken, localStorage.getItem('name'))
    }).catch(err => {
      console.log(err)
    })
  }).catch(error => {
    const refreshToken = localStorage.getItem('refresh')
    const data = {
      refresh: refreshToken
    }
    axios.post(`${API}/validate/refresh`, data).then(accessToken => {
      Auth.replaceToken(localStorage.getItem('id'), accessToken, localStorage.getItem('name'))
    }).catch(e => {
      console.log(e)
    })
  })
}

// get posts for user so we need to validate
export const getPosts = () => {
  renew()
  let temp = ''
  Auth.getToken(localStorage.getItem('id')).then(token => {
    temp = token
  }).catch(er => {
    console.log(er)
  })

  axios.get(`${API}/posts`, {
    headers: {
      'Content-Type': 'application/json',
      'refresh-token': localStorage.getItem('refresh'),
      'authorization': temp
    }
  }).then(res => {
    return res
  }).catch(err => {
    console.log(err)
  })
}
