import request from '@/utils/request'
import host from '@/api/host'

export function getTagList() {
    return request({
    url: host + 'ptag/',
    method: 'get',
     })
    }

export function addTag(data) {
return request({
    url: host + 'ptag/',
    method: 'post',
    data
 })
}

export function getTag(id) {
    return request({
    url: host + 'ptag/'+ id +'/',
    method: 'get',
     })
}

export function deleteTag(id) {
    return request({
    url: host + 'ptag/'+ id +'/',
    method: 'delete',
    })
}

export function updateTag(data) {
    return request({
    url: host + 'ptag/'+ data.id +'/',
    method: 'put',
    data
     })
}