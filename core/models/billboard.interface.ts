import { Store } from "./store.interface"

export interface Billboard {
  id: string
  storeId: string
  label: string
  imageUrl: string
  store?: Store
  createdAt: Date
  updatedAt: Date
}
