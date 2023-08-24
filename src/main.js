import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import RabbitUi from 'rabbit-ui-core'
import 'rabbit-ui-core/dist/rabbit-ui.css'
import 'normalize.css'
import '@/assets/style/common.less'
// 自定义组件库
import UI from '@/components/library'

// mockjs
import '@/mock'

createApp(App).use(store).use(router).use(RabbitUi).use(UI).mount('#app')
