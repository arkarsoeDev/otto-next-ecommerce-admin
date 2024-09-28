import { Store } from "./store.interface"

export interface Size {
  id: string

  name: string
  value: string
  storeId: string
  store?: Store

  createdAt: Date
  updatedAt: Date
}
