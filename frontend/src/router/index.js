import Vue from 'vue'
import VueRouter from 'vue-router'
import test from '../views/test.vue'
import dynamicForm from '../views/form.vue'
import waveDrom from '../views/waveVue.vue'
Vue.use(VueRouter);


const routes = [
    { path: '/', component: dynamicForm },
    { path: '/wave', component: waveDrom }
]

const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
})

export default router