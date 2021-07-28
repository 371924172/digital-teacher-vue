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

export function getListofId(data) {
        return request({
                url: host + 'propgroup/listOfId/',
                method: 'post',
                data: data,
        })
}

export function getOutofPgroup(data) {
        return request({
                url: host + 'propgroup/outofPgroup/',
                method: 'post',
                data: data,
        })
}