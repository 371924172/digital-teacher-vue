import request from '@/utils/request'
import host from '@/api/host'

export function addPgroup(data) {
    return request({
        url: host + 'pgroup/',
        method: 'post',
        data : data
    })
}
export function deletePgroup() {
       return request({
            url: host + 'pgroup/'+ id +'/',
           method: 'delete',
        })
}