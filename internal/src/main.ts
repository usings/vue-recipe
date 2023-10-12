import { createApp } from 'vue'
import '@/design'
import app from '@/app.vue'

const client = createApp(app)

const modules = import.meta.glob<{
  install: ModuleInstaller
}>('./modules/*.ts', { eager: true })

Object.values(modules)
  .forEach((i) => i.install?.(client))

client.mount('#app')
