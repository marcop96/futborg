import { createApp } from 'vue'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import PrimeVue from 'primevue/config'
import App from '@/App.vue'

const app = createApp(App)
app.use(PrimeVue)

createApp(App).mount('#app')
