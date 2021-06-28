import request from '@/utils/request'
import host from '@/api/host'

export function getInstructList() {
  return request({
    url: host + 'instruct/',
    method: 'get',
  })
}

export function addInstruct(data) {
  return request({
    url: host + 'instruct/',
    method: 'post',
    data
  })
}

export function getInstruct(id) {
  return request({
    url: host + 'instruct/' + id + '/',
    method: 'get',
  })
}

export function deleteInstruct(id) {
  return request({
    url: host + 'instruct/' + id + '/',
    method: 'delete',

  })
}

export function updateInstruct(data) {
  return request({
    url: host + 'instruct/' + data.id  + '/',
    method: "put",
    data
  })
}


