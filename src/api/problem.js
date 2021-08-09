import request from '@/utils/request'
import host from '@/api/host'

export function getList() {
    return request({
        url: host + 'problem/',
        method: 'get',
    })
}
export function getProblem(id) {
    return request({
        url: host + 'problem/' + id + '/',
        method: 'get'
    })
}
export function addProblem(data) {
    return request({
        url: host + 'problem/',
        method: 'post',
        data: data
    })
}
export function updateProblem(data) {
    return request({
        url: host + 'problem/' + data.id + '/',
        method: 'put',
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

export function getByPublishStatus(id) {
    var data = { 'type': id }
    return request({
        url: host + 'problem/getByPublishStatus/',
        method: 'post',
        data
    })
}
export function publish_status(id, status) {
    var data = { "publish_status": status }
    return request({
        url: host + 'problem/' + id + '/publishStatus/',
        method: 'put',
        data
    })
}

export function draftCount(data) {
    return request({
        url: host + 'problem/draftCount/',
        method: 'post',
        data
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

export var statusList = [
    {
        id: 0,
        label: "未发布"
    }, {
        id: 1,
        label: "发布待审核"
    }, {
        id: 2,
        label: "发布审核成功"
    }, {
        id: 3,
        label: "发布审核失败"
    }, {
        id: 4,
        label: "已发布"
    }, {
        id: 5,
        label: "下架待审核"
    }, {
        id: 6,
        label: "下架审核通过"
    },
    {
        id: 7,
        label: "下架审核失败"
    }, {
        id: 8,
        label: "已下架"
    }, {
        id: 9,
        label: "删除待审核"
    }, {
        id: 10,
        label: "删除审核通过"
    }, {
        id: 11,
        label: "删除审核失败"
    }, {
        id: 12,
        label: "已删除"
    },
]