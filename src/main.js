import { createApp } from 'vue'
import App from './App.vue'
import html2canvas from 'html2canvas'
import '@fortawesome/fontawesome-free/css/all.min.css'

const app = createApp(App)
app.config.globalProperties.$html2canvas = html2canvas
app.mount('#app')