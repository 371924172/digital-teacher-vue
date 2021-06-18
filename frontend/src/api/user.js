import request from '@/utils/request'
import host from '@/api/host'

export function exist(data) {
  return request({
    url: host + 'userProfile/exist/',
    method: 'post',
    data
  })
}
export function register(data) {
  return request({
    url: host + 'userProfile/',
    method: 'post',
    data
  })
}

export function login(data) {
  return request({
    url: host + 'authenticated/',
    method: 'post',
    data
  })
}

export function getInfo(userid) {
  return request({
    url: host + 'userProfile/' + userid + '/',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}


export function getUncheckedUser() {
  return request({
    url: host + 'users/unchecked/',
    method: 'get'
  })
}

export function checkUser(data) {
  return request({
    url: host + 'users/check/',
    method: 'post',
    data
  })
}

export function updateInfo(data) {
  return request({
    url: host + 'users/' + data.id + '/',
    method: 'put',
    data
  })
}

export function changePassword(data) {
  return request({
    url: host + 'changePassword/',
    method: 'put',
    data
  })
}

