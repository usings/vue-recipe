import { createPinia } from 'pinia'

export const pinia = createPinia()

export const install: ModuleInstaller = (context) => {
  context.use(pinia)
}
