import request from '@/utils/request'
import host from '@/api/host'

export function getUserList() {
    return request({
        url: host + 'users/',
        method: 'get'
    })
}

export function assignRole(data) {
    return request({
        url: host + 'role/assign/',
        method: 'post',
        data
    })
}

export function getRole() {
    return request({
        url: host + 'role/',
        method: 'get',
    })
}

export function deleteAdmin(id) {
    return request({
        url: host + 'role/' + id + '/',
        method: 'delete'

    })
}

export function addUser(data) {
    return request({
        url: host + 'users/add/',
        method: "post",
        data
    })
}

export function deleteUser(id) {
    return request({
        url: host + 'users/' + id + '/',
        method: "delete",
    })
}

export function getUnadmin() {
    return request({
        url: host + 'role/unadmin/',
        method: 'get'
    })
}

export function getAdmin() {
    return request({
        url: host + 'role/admin/',
        method: 'get'
    })
}