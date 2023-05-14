import Vue from 'vue'
import { createPinia, PiniaVuePlugin } from 'pinia'
import {
    ethers
} from 'ethers'
import settings from '@/settings'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

Vue.use(PiniaVuePlugin)

const pinia = createPinia()

const app = new Vue({
    router,
    vuetify,
    pinia,
    render: (h) => h(App)
}).$mount('#app')

window.provider = new ethers.BrowserProvider(window.ethereum)
