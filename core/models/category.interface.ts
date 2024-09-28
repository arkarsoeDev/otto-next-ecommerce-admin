import { Billboard } from "./billboard.interface"
import { Store } from "./store.interface"

export interface Category {
  id: string
  storeId: string
  name: string
  billboardId: string
  store?: Store
  billboard?: Billboard
  createdAt: Date
  updatedAt: Date
}
