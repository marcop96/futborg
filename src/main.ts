import { createApp } from 'vue'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import PrimeVue from 'primevue/config'
import App from '@/App.vue'
import router from '@/router'

const app = createApp(App)
app.use(PrimeVue)
app.use(router)

createApp(App).mount('#app')
