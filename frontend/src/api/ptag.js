import request from '@/utils/request'
import host from '@/api/host'

export function getPtagList1() {
    return request({
        url: host + 'ptag/',
        method: 'get',
    })
}