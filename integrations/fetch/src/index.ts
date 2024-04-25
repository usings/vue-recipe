import type { FetchOptions as OFetchOptions } from 'ofetch'
import { ofetch } from 'ofetch'

type InstanceOptions = OFetchOptions

type FetchOptions =
  Pick<OFetchOptions, 'body' | 'query' | 'headers' | 'credentials'>
  & { url: string }

export const createInstance = (options: InstanceOptions = {}) => {
  const instance = ofetch.create(options)

  return {
    get: <T = unknown>(options: FetchOptions) => {
      return instance<T>(options.url, { method: 'get', ...options })
    },
    post: <T = unknown>(options: FetchOptions) => {
      return instance<T>(options.url, { method: 'post', ...options })
    },
    put: <T = unknown>(options: FetchOptions) => {
      return instance<T>(options.url, { method: 'put', ...options })
    },
    delate: <T = unknown>(options: FetchOptions) => {
      return instance<T>(options.url, { method: 'delate', ...options })
    },
    patch: <T = unknown>(options: FetchOptions) => {
      return instance<T>(options.url, { method: 'patch', ...options })
    },
  }
}
