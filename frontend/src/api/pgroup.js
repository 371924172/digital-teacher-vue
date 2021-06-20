import request from '@/utils/request'
import host from '@/api/host'

export function addPgroup(data) {
    return request({
        url: host + 'pgroup/',
        method: 'post',
        data: data
    })
}
export function deletePgroup() {
    return request({
        url: host + 'pgroup/' + id + '/',
        method: 'delete',
    })
}
export function getPgroupList() {
    return request({
        url: host + 'pgroup/',
        method: 'get'
    })
}

export function getMyPgroup() {
    return request({
        url: host + 'pgroup/myPgroup/',
        method: 'get'
    })
}