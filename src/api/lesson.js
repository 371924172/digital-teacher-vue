import request from '@/utils/request'
import host from '@/api/host'

export function getLessonList() {
  return request({
    url: host + 'lesson/',
    method: 'get',
  })
}

export function addLesson(data) {
  return request({
    url: host + 'lesson/',
    method: 'post',
    data
  })
}

export function getLesson(id) {
  return request({
    url: host + 'lesson/' + id + '/',
    method: 'get',
  })
}

export function deleteLesson(id) {
  return request({
    url: host + 'lesson/' + id + '/',
    method: 'delete'

  })
}

export function updateLesson(data) {
  return request({
    url: host + 'lesson/' + data.id  + '/',
    method: "put",
    data
  })
}


