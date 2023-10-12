import { createPinia } from 'pinia'

export const pinia = createPinia()

export const install: ModuleInstaller = (ctx) => {
  ctx.use(pinia)
}
