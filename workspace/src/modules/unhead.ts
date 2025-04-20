import { createHead } from '@unhead/vue/client'

const head = createHead()

export const install: ModuleInstaller = (context) => {
  context.use(head)
}
