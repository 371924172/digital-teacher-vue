import request from '@/utils/request'
import host from '@/api/host'

export function getClassList() {
        return request({
                url: host + 'class/',
                method: 'get',
        })
}

export function addClass(data) {
        return request({
                url: host + 'class/',
                method: 'post',
                data
        })
}

export function getClass(id) {
        return request({
                url: host + 'class/' + id + '/',
                method: 'get',
        })
}

export function deleteClass(id) {
        return request({
                url: host + 'class/' + id + '/',
                method: 'delete'

        })
}

export function updateClass(data) {
        return request({
                url: host + 'class/' + data.id + '/',
                method: "put",
                data
        })
}

export function getClassByMajor(data) {
        return request({
                url: host + 'class/getClassByMajor/',
                method: "post",
                data
        })
}