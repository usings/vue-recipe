import type { ShallowRef } from 'vue'
import { sleep } from 'radash'

type QueryService<
  Response, Payload extends unknown[],
> = (...args: Payload) => Promise<Response>
interface QueryOptions<Response, Payload extends unknown[]> {
  manual?: boolean
  initialData?: Response
  defaultParams?: Payload
  loadingKeep?: number
  onBefore?: (payload: Payload) => void
  onSuccess?: (data: Response, payload: Payload) => void
  onFailure?: (error: Error, payload: Payload) => void
  onAfter?: (payload: Payload) => void
}
interface QueryResults<Response, Payload extends unknown[]> {
  run: (...args: Payload) => Promise<void>
  refresh: () => void
  data: ShallowRef<Response | undefined>
  error: ShallowRef<Error | undefined>
  loading: ShallowRef<boolean>
}

export function useRequest<Response, Payload extends unknown[]>(
  service: QueryService<Response, Payload>,
  options: QueryOptions<Response, Payload> = {},
): QueryResults<Response, Payload> {
  const {
    initialData,
    defaultParams = [] as unknown as Payload,
    manual = false,
    loadingKeep = 0,
    onBefore,
    onSuccess,
    onFailure,
    onAfter,
  } = options
  const error = shallowRef()
  const loading = shallowRef(false)
  const result = shallowRef<Response | undefined>(initialData)

  async function runAsync(...args: Payload): Promise<void> {
    try {
      onBefore?.(args)
      loading.value = true
      const [res] = await Promise.all([
        service(...args),
        loadingKeep && sleep(loadingKeep),
      ])
      result.value = res
      onSuccess?.(result.value, args)
    } catch (err: unknown) {
      error.value = err as Error
      onFailure?.(error.value, args)
    } finally {
      loading.value = false
      onAfter?.(args)
    }
  }

  function runPrimitive(): void {
    runAsync(...defaultParams)
  }

  if (!manual) {
    runPrimitive()
  }

  return {
    data: result,
    error,
    loading,
    refresh: runPrimitive,
    run: runAsync,
  }
}
