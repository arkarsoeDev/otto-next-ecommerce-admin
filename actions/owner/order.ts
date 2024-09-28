'use server'

import { Order } from "@/core/models"
import { ApiPaginatedResponse, ApiResponse } from "@/core/response/response"
import { BasePayload } from "../base/base-payload"
import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { validateResponse } from "@/core/validate-response"
import { httpClient } from "@/lib/http-client"
import { routeTags } from "@/core/route-tag"

const baseUrl = 'api/owner/orders'

interface GetAllOrdersPayload {
  params: {
    storeId?: string,
    limit?: number
  }
}

interface CreateOrderPayload extends BasePayload {
  data: {
    name: string;
    categoryId: string;
    price: number;
    storeId: string;
    isFeatured?: boolean;
    isArchived?: boolean;
    sizeId: string;
    colorId: string;
    images: { url: string }[]
  }
}

interface UpdateOrderPayload extends BasePayload {
  data: {
    id: string
    name: string;
    categoryId: string;
    price: number;
    isFeatured?: boolean;
    isArchived?: boolean;
    sizeId: string;
    colorId: string;
    images: { url: string }[]
  }
}

interface DeleteOrderPayload extends BasePayload {
  data: {
    id: string
  }
}

export const getAllOrders = async (payload?: GetAllOrdersPayload): Promise<ApiPaginatedResponse<Order>> => {

  let res: Response | null = null
  let error: BaseError | null = null
  let data = null

  const url = `${process.env.BASE_URL}/${baseUrl}`

  res = await httpClient.get(url, { params: payload?.params, next: { tags: [routeTags.getOrders()] } });

  error = await validateResponse(res)

  console.log(error)

  if (!error) {
    data = await res.json()
  }

  console.log(data)

  return { data, error }
}

export const getOrder = async (id: string): Promise<ApiResponse<Order>> => {

  let res: Response | null = null
  let error: BaseError | null = null
  let data = null

  const url = `${process.env.BASE_URL}/${baseUrl}/${id}`

  res = await httpClient.get(url);

  error = await validateResponse(res)

  if (!error) {
    data = await res.json()
  }

  return { data, error }
}


export const createOrder = async (payload: CreateOrderPayload) => {
  const url = `${process.env.BASE_URL}/${baseUrl}`

  let res = await httpClient.post(url, {
    body: JSON.stringify(payload.data),
  });

  const result = await validateResponse(res)

  if (result) {
    throw new Error(result.message)
  }

  revalidateTag(routeTags.getOrders())

  if (payload.revalidate) {
    payload.revalidate.map(each => {
      revalidatePath(each)
    })
  }

  if (payload.revalidateTags) {
    payload.revalidateTags.map(each => {
      revalidateTag(each)
    })
  }

  if (payload.redirectPath) {
    redirect(payload.redirectPath)
  }

  const data = await res.json()

  console.log(data)

  return data
}


export const updateOrder = async (payload: UpdateOrderPayload) => {
  const url = `${process.env.BASE_URL}/${baseUrl}/${payload.data.id}`

  let res = await httpClient.patch(url, {
    body: JSON.stringify(payload.data),
  });

  const result = await validateResponse(res)

  if (result) {
    throw new Error(result.message)
  }

  revalidateTag(routeTags.getOrders())

  if (payload.revalidate) {
    payload.revalidate.map(each => {
      revalidatePath(each)
    })
  }

  if (payload.revalidateTags) {
    payload.revalidateTags.map(each => {
      revalidateTag(each)
    })
  }

  if (payload.redirectPath) {
    redirect(payload.redirectPath)
  }

  const data = await res.json()

  console.log(data)

  return data
}



export const deleteOrder = async (payload: DeleteOrderPayload) => {
  console.log(payload)
  const url = `${process.env.BASE_URL}/${baseUrl}/${payload.data.id}`

  let res = await httpClient.delete(url);

  const result = await validateResponse(res)

  if (result) {
    throw new Error(result.message)
  }

  revalidateTag(routeTags.getOrders())

  if (payload.revalidate) {
    payload.revalidate.map(each => {
      revalidatePath(each)
    })
  }

  if (payload.revalidateTags) {
    payload.revalidateTags.map(each => {
      revalidateTag(each)
    })
  }

  if (payload.redirectPath) {
    redirect(payload.redirectPath)
  }
}
