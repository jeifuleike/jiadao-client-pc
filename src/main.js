import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import RabbitUi from 'rabbit-ui-core'
import 'rabbit-ui-core/dist/rabbit-ui.css'
import 'normalize.css'
import '@/assets/style/common.less'

createApp(App).use(store).use(router).use(RabbitUi).mount('#app')
