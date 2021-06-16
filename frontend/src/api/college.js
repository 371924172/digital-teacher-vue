import request from '@/utils/request'
import host from '@/api/host'

export function getCollegeList() {
  return request({
    url: host + 'college/',
    method: 'get',
  })
}

export function addCollege(data) {
  return request({
    url: host + 'college/',
    method: 'post',
    data
  })
}
export function getCollege(id) {
  return request({
    url: host + 'college/' + id + '/',
    method: 'get',
  })
}

export function deleteCollege(id) {
  return request({
    url: host + 'college/' + id + '/',
    method: 'delete'

  })
}

export function updateCollege(data) {
  return request({
    url: host + 'college/' + data.id  + '/',
    method: "put",
    data
  })
}


