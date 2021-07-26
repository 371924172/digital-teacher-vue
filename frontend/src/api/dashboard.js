import request from '@/utils/request'
import host from '@/api/host'

export function recordByClass(data) {
        return request({
                url: host + 'precord/recordByClass/',
                method: 'post',
                data
        })
}

export function recordByProblem(data) {
        return request({
                url: host + 'precord/recordByProblem/',
                method: 'post',
                data
        })
}