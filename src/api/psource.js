import request from '@/utils/request'
import host from '@/api/host'

export function getSourceList() {
    return request({
    url: host + 'psource/',
    method: 'get',
     })
    }

export function addSource(data) {
return request({
    url: host + 'psource/',
    method: 'post',
    data
 })
}

export function getSource(id) {
    return request({
    url: host + 'psource/'+ id +'/',
    method: 'get',
     })
}

export function deleteSource(id) {
    return request({
    url: host + 'psource/'+ id +'/',
    method: 'delete',
    })
}

export function updateSource(data) {
    return request({
    url: host + 'psource/'+ data.id +'/',
    method: 'put',
    data
     })
}