import { createApp } from 'vue'
import type { App } from 'vue'

import ElementPlus from 'element-plus'
import './style.css'
import 'element-plus/dist/index.css'
import AppVue from './App.vue'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

function useTable (app: App) {
    app.use(VXETable)
  }
const app = createApp(AppVue)
app.use(ElementPlus)
app.use(useTable)
app.mount('#app')
