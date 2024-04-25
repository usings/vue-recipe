import app from '@/app.vue'
import '@/design'

const client = createApp(app)

const modules = import.meta.glob<{
  install: ModuleInstaller
}>('./modules/*.ts', { eager: true })

for (const module of Object.values(modules)) {
  module.install?.(client)
}

client.mount('#app')
