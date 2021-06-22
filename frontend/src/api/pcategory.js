import request from '@/utils/request'
import host from '@/api/host'

export function getCategoryList() {
    return request({
    url: host + 'pcategory/',
    method: 'get',
     })
    }

export function addCategory(data) {
return request({
    url: host + 'pcategory/',
    method: 'post',
    data
 })
}

export function getCategory(id) {
    return request({
    url: host + 'pcategory/'+ id +'/',
    method: 'get',
     })
}

export function deleteCategory(id) {
    return request({
    url: host + 'pcategory/'+ id +'/',
    method: 'delete',
    })
}

export function updateCategory(data) {
    return request({
    url: host + 'pcategory/'+ data.id +'/',
    method: 'put',
    data
     })
}