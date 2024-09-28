import { OrderItem } from "./order-item.interface";
import { Store } from "./store.interface";

export interface Order {
  id: string

  storeId: string;
  userId: string;
  isPaid: boolean;
  phone: string;
  address: string;

  orderItems: OrderItem[]
  store?: Store

  createdAt: Date
  updatedAt: Date
}
