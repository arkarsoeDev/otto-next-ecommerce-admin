import { Product } from "./product.interface"

export interface OrderItem {
  id: string

  orderId: string
  productId: string
  quantity: number
  price: number

  product: Product

  createdAt: Date
  updatedAt: Date
}
