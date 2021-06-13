import request from '@/utils/request'
import host from '@/api/host'

export function addProblemPgroup(data) {
    return request({
        url: host + 'propgroup/',
        method: 'post',
        data: data
    })
}
export function deleteProblemPgroup(id) {
    return request({
        url: host + 'propgroup/batchDelete/',
        method: 'delete',
        data: id
    })
}