import request from '@/utils/request'
import host from '@/api/host'

export function getTeacherList() {
  return request({
    url: host + 'teacher/',
    method: 'get',
  })
}

export function addTeacher(data) {
  return request({
    url: host + 'teacher/',
    method: 'post',
    data
  })
}
export function getTeacher(id) {
  return request({
    url: host + 'teacher/' + id + '/',
    method: 'get',
  })
}

export function deleteTeacher(id) {
  return request({
    url: host + 'teacher/' + id + '/',
    method: 'delete',
  })
}

export function updateTeacher(data) {
  return request({
    url: host + 'teacher/' + data.id  + '/',
    method: "put",
    data
  })
}


