'use server'

import { Category } from "@/core/models"
import { ApiPaginatedResponse, ApiResponse } from "@/core/response/response"
import { BasePayload } from "../base/base-payload"
import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { validateResponse } from "@/core/validate-response"
import { httpClient } from "@/lib/http-client"
import { routeTags } from "@/core/route-tag"

const baseUrl = 'api/owner/categories'

interface GetAllCategoriesPayload {
  params: {
    storeId?: string,
    limit?: number
  }
}

export const getAllCategories = async (payload?: GetAllCategoriesPayload): Promise<ApiPaginatedResponse<Category>> => {

  let res: Response | null = null
  let error: BaseError | null = null
  let data = null

  const url = `${process.env.BASE_URL}/${baseUrl}`

  res = await httpClient.get(url, { params: payload?.params, next: { tags: [routeTags.getCategories()] } });

  error = await validateResponse(res)

  console.log(error)

  if (!error) {
    data = await res.json()
  }

  return { data, error }
}

export const getCategory = async (id: string): Promise<ApiResponse<Category>> => {

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

interface CreateCategoryPayload extends BasePayload {
  data: {
    name: string
    billboardId: string
    storeId: string
  }
}

export const createCategory = async (payload: CreateCategoryPayload) => {
  const url = `${process.env.BASE_URL}/${baseUrl}`

  let res = await httpClient.post(url, {
    body: JSON.stringify(payload.data),
  });

  const result = await validateResponse(res)

  if (result) {
    throw new Error(result.message)
  }

  revalidateTag(routeTags.getCategories())

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

interface UpdateCategoryPayload extends BasePayload {
  data: {
    id?: string
    name?: string
    billboardId?: string
  }
}

export const updateCategory = async (payload: UpdateCategoryPayload) => {
  const url = `${process.env.BASE_URL}/${baseUrl}/${payload.data.id}`

  let res = await httpClient.patch(url, {
    body: JSON.stringify(payload.data),
  });

  const result = await validateResponse(res)

  if (result) {
    throw new Error(result.message)
  }

  revalidateTag(routeTags.getCategories())

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

interface DeleteCategoryPayload extends BasePayload {
  data: {
    id: string
  }
}

export const deleteCategory = async (payload: DeleteCategoryPayload) => {
  console.log(payload)
  const url = `${process.env.BASE_URL}/${baseUrl}/${payload.data.id}`

  let res = await httpClient.delete(url);

  const result = await validateResponse(res)

  if (result) {
    throw new Error(result.message)
  }

  revalidateTag(routeTags.getCategories())

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
