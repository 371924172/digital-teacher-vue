import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
        token: getToken(),
        name: '',
        userid: '',
        username: '',
        status: '',
        roles: []
}

const mutations = {
        SET_TOKEN: (state, token) => {
                state.token = token
        },
        SET_ROLES: (state, roles) => {
                state.roles = roles
        },
        SET_USERID: (state, userid) => {
                state.userid = userid
        },
        SET_USERNAME: (state, username) => {
                state.username = username
        },
        SET_STATUS: (state, status) => {
                state.status = status
        }
}

const actions = {

        // user login
        login({ commit }, userInfo) {
                const { username, password } = userInfo
                return new Promise((resolve, reject) => {
                        login({ username: username.trim(), password: password }).then(response => {
                                const { token, userid } = response.data;
                                commit('SET_TOKEN', token)
                                commit('SET_USERID', userid)
                                setToken(response.data.token)
                                resolve()
                        }).catch(error => {
                                reject(error)


                        })
                })
        },

        // get user info
        getInfo({ commit, state }) {
                return new Promise((resolve, reject) => {
                        getInfo(state.userid).then(response => {
                                console.log(response.data)
                                const { data } = response
                                if (!data) {
                                        reject('Verification failed, please Login again.')
                                }

                                const { roles, username, status } = data
                                commit('SET_ROLES', roles)
                                commit('SET_USERNAME', username)
                                commit("SET_STATUS", status)
                                resolve(data)
                        }).catch(error => {
                                reject(error)
                        })
                })
        },

        // user logout
        logout({ commit, state, dispatch }) {
                return new Promise((resolve, reject) => {
                        logout(state.token).then(() => {
                                commit('SET_TOKEN', '')
                                commit('SET_USERID', Number)
                                commit('SET_USERNAME', '')
                                commit('SET_ROLES', [])
                                commit("SET_STATUS", '')
                                removeToken()
                                resetRouter()

                                // reset visited views and cached views
                                // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
                                dispatch('tagsView/delAllViews', null, { root: true })

                                resolve()
                        }).catch(error => {
                                reject(error)
                        })
                })
        },

        // remove token
        resetToken({ commit }) {
                return new Promise(resolve => {
                        commit('SET_TOKEN', '')
                        commit('SET_ROLES', [])
                        removeToken()
                        resolve()
                })
        },

        // dynamically modify permissions
        async changeRoles({ commit, dispatch }, role) {
                const token = role + '-token'

                commit('SET_TOKEN', token)
                setToken(token)

                const { roles } = await dispatch('getInfo')

                resetRouter()

                // generate accessible routes map based on roles
                const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
                        // dynamically add accessible routes
                router.addRoutes(accessRoutes)

                // reset visited views and cached views
                dispatch('tagsView/delAllViews', null, { root: true })
        }
}

export default {
        namespaced: true,
        state,
        mutations,
        actions
}