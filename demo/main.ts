import '@/assets/main.css'

import { createApp } from 'vue'
import '../dist/style.css'
import calendar from '../dist/vue-calendar'

import App from './App.vue'

createApp(App)
  .use(calendar)
  .mount('#app')