import { createHead } from '@unhead/vue'

const head = createHead()

export const install: ModuleInstaller = (context) => {
  context.use(head)
}
