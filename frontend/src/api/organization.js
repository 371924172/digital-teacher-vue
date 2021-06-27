import request from '@/utils/request'
import host from '@/api/host'

export function getOrganizationList() {
  return request({
    url: host + 'organization/',
    method: 'get',
  })
}

export function addOrganization(data) {
  return request({
    url: host + 'organization/',
    method: 'post',
    data
  })
}

export function getOrganization(id) {
  return request({
    url: host + 'organization/' + id + '/',
    method: 'get',
  })
}

export function deleteOrganization(id) {
  return request({
    url: host + 'organization/' + id + '/',
    method: 'delete'

  })
}

export function updateOrganization(data) {
  return request({
    url: host + 'organization/' + data.id  + '/',
    method: "put",
    data
  })
}


