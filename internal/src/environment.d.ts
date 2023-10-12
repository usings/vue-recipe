/// <reference types="vite/client" />

import type { App } from 'vue'

declare global {
  type ModuleInstaller = (context: App<Element>) => void
}
