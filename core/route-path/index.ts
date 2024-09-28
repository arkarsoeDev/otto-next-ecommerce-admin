export const routePath = {
  home: () => {
    return '/'
  },

  signIn: () => {
    return '/sign-in'
  },

  storeShowPage: (id: string) => {
    return `/${id}`
  },

  dashboard: (storeId: string) => {
    return `/${storeId}`
  },

  billboards: (storeId: string) => {
    return `/${storeId}/billboards`
  },

  updateBillboard: (storeId: string, billboardId: string) => {
    return `/${storeId}/billboards/${billboardId}`
  },

  categories: (storeId: string) => {
    return `/${storeId}/categories`
  },

  updateCategory: (storeId: string, billboardId: string) => {
    return `/${storeId}/categories/${billboardId}`
  },

  sizes: (storeId: string) => {
    return `/${storeId}/sizes`
  },

  updateSize: (storeId: string, sizeId: string) => {
    return `/${storeId}/sizes/${sizeId}`
  },

  colors: (storeId: string) => {
    return `/${storeId}/colors`
  },

  updateColor: (storeId: string, colorId: string) => {
    return `/${storeId}/colors/${colorId}`
  },

  products: (storeId: string) => {
    return `/${storeId}/products`
  },

  updateProduct: (storeId: string, productId: string) => {
    return `/${storeId}/products/${productId}`
  },

  orders: (storeId: string) => {
    return `/${storeId}/orders`
  },

  updateOrder: (storeId: string, orderId: string) => {
    return `/${storeId}/orders/${orderId}`
  },

  settings: (storeId: string) => {
    return `/${storeId}/settings`
  }
}
