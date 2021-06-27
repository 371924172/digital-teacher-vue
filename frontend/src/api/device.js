import request from '@/utils/request'
import host from '@/api/host'

export function getDeviceList() {
    return request({
    url: host + 'device/',
    method: 'get',
     })
    }

export function addDevice(data) {
return request({
    url: host + 'device/',
    method: 'post',
    data
 })
}

export function getDevice(id) {
    return request({
    url: host + 'device/'+ id +'/',
    method: 'get',
     })
}

export function deleteDevice(id) {
    return request({
    url: host + 'device/'+ id +'/',
    method: 'delete',
    })
}

export function updateDevice(data) {
    return request({
    url: host + 'device/'+ data.id +'/',
    method: 'put',
    data
     })
}
    