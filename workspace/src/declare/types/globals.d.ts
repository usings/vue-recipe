import type { App } from 'vue'

declare global {
  /** A function that installs a module in a Vue app. */
  type ModuleInstaller = (context: App<Element>) => void

  /** Array, or maybe not */
  type Arrayable<T = unknown> = T | T[]

  /** Promise, or maybe not */
  type Awaitable<T> = Promise<T> | T

  /** Infers the element type of  */
  type ElementOf<T> = T extends (infer E)[] ? E : never

  /** Null or whatever */
  type Nullable<T> = null | T | undefined
}
