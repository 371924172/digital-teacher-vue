import request from '@/utils/request'
import host from '@/api/host'

export function getMajorList() {
  return request({
    url: host + 'major/',
    method: 'get',
  })
}

export function addMajor(data) {
  return request({
    url: host + 'major/',
    method: 'post',
    data
  })
}

export function getMajor(id) {
  return request({
    url: host + 'major/' + id + '/',
    method: 'get',
  })
}

export function deleteMajor(id) {
  return request({
    url: host + 'major/' + id + '/',
    method: 'delete'

  })
}

export function updateMajor(data) {
  return request({
    url: host + 'major/' + data.id  + '/',
    method: "put",
    data
  })
}


