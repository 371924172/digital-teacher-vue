import request from '@/utils/request'
import host from '@/api/host'

export function getStudentList() {
  return request({
    url: host + 'student/',
    method: 'get',
  })
}

export function addStudent(data) {
  return request({
    url: host + 'student/',
    method: 'post',
    data
  })
}
export function getStudent(id) {
  return request({
    url: host + 'student/' + id + '/',
    method: 'get',
  })
}

export function deleteStudent(id) {
  return request({
    url: host + 'student/' + id + '/',
    method: 'delete',
  })
}

export function updateStudent(data) {
  return request({
    url: host + 'student/' + data.id  + '/',
    method: "put",
    data
  })
}


