import { createRouter, createWebHistory } from 'vue-router/auto'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
})

export const install: ModuleInstaller = (context) => {
  context.use(router)
}
