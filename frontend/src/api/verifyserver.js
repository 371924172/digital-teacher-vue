import request from '@/utils/request'
import host from '@/api/host'

export function getVerifyserverList() {
    return request({
    url: host + '/',
    method: 'get',
     })
    }

export function addVerifyserver(data) {
return request({
    url: host + 'device/',
    method: 'post',
    data
 })
}

export function getVerifyserver(id) {
    return request({
    url: host + 'device/'+ id +'/',
    method: 'get',
     })
}

export function deleteVerifyserver(id) {
    return request({
    url: host + 'device/'+ id +'/',
    method: 'delete',
    })
}

export function updateVerifyserver(data) {
    return request({
    url: host + 'device/'+ data.id +'/',
    method: 'put',
    data
     })
}