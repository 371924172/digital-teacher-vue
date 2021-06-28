import request from '@/utils/request'
import host from '@/api/host'

export function getSelclassList() {
  return request({
    url: host + 'selclass/',
    method: 'get',
  })
}

export function addSelclass(data) {
  return request({
    url: host + 'selclass/',
    method: 'post',
    data
  })
}

export function getSelclass(id) {
  return request({
    url: host + 'selclass/' + id + '/',
    method: 'get',
  })
}

export function deleteSelclass(id) {
  return request({
    url: host + 'selclass/' + id + '/',
    method: 'delete'

  })
}

export function updateSelclass(data) {
  return request({
    url: host + 'selclass/' + data.id  + '/',
    method: "put",
    data
  })
}


