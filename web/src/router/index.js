import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: () => import('@/layouts/Main.vue'),
        children: [
            {
                path: '/',
                name: 'home',
                component: () => import('@/views/Home.vue')
            },
            {
                path: '/app',
                name: 'app',
                component: () => import('@/views/DApp.vue')
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
