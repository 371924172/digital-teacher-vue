import request from '@/utils/request'
import host from '@/api/host'

export function getUserlist() {
    return request({
        url: host + 'users/',
        method: 'get'
    })
}