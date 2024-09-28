import { get, patch, post, remove } from './http-client'

export const httpClient = {
  get,
  post,
  patch,
  delete: remove
}
