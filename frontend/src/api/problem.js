import request from '@/utils/request'
import host from '@/api/host'

export function getList() {
    return request({
        url: host + 'problem/',
        method: 'get',
    })
}
export function getListofId(id) {
    return request({
        url: host + 'propgroup/listOfId/',
        method: 'post',
        data: id,
    })
}
export function addProblem(data) {
    return request({
        url: host + 'problem/',
        method: 'post',
        data: data
    })
}
export function getMyProblem() {
    return request({
        url: host + 'problem/myProblem/',
        method: 'get'
    })
}
export function getPtagList() {
    return request({
        url: host + 'ptag/',
        method: 'get',
    })
}

export var PtagColor = [
    "#9dc6eb",
    "#f8c471",
    "#b9a3ef",
    "#fdb1ca",
    "#9dc6eb",
    "#f8c471",
    "#b9a3ef",
    "#fdb1ca",
]

export var status = [
    
]