import { Store } from "./store.interface"

export interface Color {
  id: string

  name: string
  value: string
  storeId: string
  store?: Store

  createdAt: Date
  updatedAt: Date
}
