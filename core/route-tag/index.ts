export const routeTags = {
  getStores: () => {
    return 'get:stores'
  },

  getBillboards: () => {
    return 'get:billboards'
  },

  getBillboard: (id: string) => {
    return `get:billboards:${id}`
  },

  getCategories: () => {
    return 'get:categories'
  },

  getCategory: (id: string) => {
    return `get:categories:${id}`
  },

  getSizes: () => {
    return 'get:sizes'
  },

  getSize: (id: string) => {
    return `get:sizes:${id}`
  },

  getColors: () => {
    return 'get:colors'
  },

  getColor: (id: string) => {
    return `get:colors:${id}`
  },

  getProducts: () => {
    return 'get:products'
  },

  getProduct: (id: string) => {
    return `get:products:${id}`
  },


  getOrders: () => {
    return 'get:orders'
  },

  getOrder: (id: string) => {
    return `get:orders:${id}`
  },
}
