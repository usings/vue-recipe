import app from '@/app.vue'
import '@/design'

const client = createApp(app)

const modules = import.meta.glob<{
  install: ModuleInstaller
}>('./modules/*.ts', { eager: true })

Object.values(modules)
  .forEach(index => index.install?.(client))

client.mount('#app')
