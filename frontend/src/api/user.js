import request from '@/utils/request'
import host from '@/api/host'
export function login(data) {
  return request({
    url: host + 'authenticated/',
    method: 'post',
    data
  })
}

export function getInfo(userid) {
  return request({
    url: host + 'getInfo/' + userid + '/',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}


export function getUserlist() {
  return request({
      url: host + 'users/',
      method: 'get'
  })
}