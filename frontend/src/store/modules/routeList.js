import store from '@/store'
import { constantRoutes, asyncRoutes } from '@/router/index'
const state = {
    routes: []
}

const mutations = {
    SET_ROUTES: (state, routes) => {
        state.routes = routes
    }
}

const actions = {
    // setRouteList
    setRoutes({ commit }) {
        return new Promise((resolve) => {
            routes = store.getters.is_superuser ? constantRoutes + asyncRoutes : constantRoutes;
            commit('SET_ROUTES', routes)
            console.log('1')
            resolve(routes)
        })

    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
