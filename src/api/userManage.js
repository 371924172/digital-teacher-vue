import request from '@/utils/request'
import host from '@/api/host'

export function getUserList() {
    return request({
        url: host + 'users/',
        method: 'get'
    })
}


export function getRole() {
    return request({
        url: host + 'role/',
        method: 'get',
    })
}

export function deleteRole(id) {
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
export function assignRole(data) {
    return request({
        url: host + 'role/assignRole/',
        method: 'post',
        data
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



export function getUnstudent() {
    return request({
        url: host + 'role/unstudent/',
        method: 'get'
    })
}

export function getStudent() {
    return request({
        url: host + 'role/student/',
        method: 'get'
    })
}
export function getStudent111() {
    return request({
        url: host + 'student/',
        method: 'get'
    })
}

export function getUnteacher() {
    return request({
        url: host + 'role/unteacher/',
        method: 'get'
    })
}

export function getTeacher() {
    return request({
        url: host + 'role/teacher/',
        method: 'get'
    })
}

export function getTeacher111() {
    return request({
        url: host + 'teacher/',
        method: 'get'
    })
}
