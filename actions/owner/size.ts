'use server'

import { Size } from "@/core/models"
import { ApiPaginatedResponse, ApiResponse } from "@/core/response/response"
import { BasePayload } from "../base/base-payload"
import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { validateResponse } from "@/core/validate-response"
import { httpClient } from "@/lib/http-client"
import { routeTags } from "@/core/route-tag"

const baseUrl = 'api/owner/sizes'

interface GetAllSizesPayload {
  params: {
    storeId?: string,
    limit?: number
  }
}

export const getAllSizes = async (payload?: GetAllSizesPayload): Promise<ApiPaginatedResponse<Size>> => {

  let res: Response | null = null
  let error: BaseError | null = null
  let data = null

  const url = `${process.env.BASE_URL}/${baseUrl}`

  res = await httpClient.get(url, { params: payload?.params, next: { tags: [routeTags.getSizes()] } });

  error = await validateResponse(res)

  console.log(error)

  if (!error) {
    data = await res.json()
  }

  return { data, error }
}

export const getSize = async (id: string): Promise<ApiResponse<Size>> => {

  let res: Response | null = null
  let error: BaseError | null = null
  let data = null

  const url = `${process.env.BASE_URL}/${baseUrl}/${id}`

  res = await httpClient.get(url);

  error = await validateResponse(res)

  console.log(error)

  if (!error) {
    data = await res.json()
  }

  return { data, error }
}

interface CreateSizePayload extends BasePayload {
  data: {
    name: string
    value: string
    storeId: string
  }
}

export const createSize = async (payload: CreateSizePayload) => {
  const url = `${process.env.BASE_URL}/${baseUrl}`

  let res = await httpClient.post(url, {
    body: JSON.stringify(payload.data),
  });

  const result = await validateResponse(res)

  if (result) {
    throw new Error(result.message)
  }

  revalidateTag(routeTags.getSizes())

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

interface UpdateSizePayload extends BasePayload {
  data: {
    id?: string
    name?: string
    value?: string
  }
}

export const updateSize = async (payload: UpdateSizePayload) => {
  const url = `${process.env.BASE_URL}/${baseUrl}/${payload.data.id}`

  let res = await httpClient.patch(url, {
    body: JSON.stringify(payload.data),
  });

  const result = await validateResponse(res)

  if (result) {
    throw new Error(result.message)
  }

  revalidateTag(routeTags.getSizes())

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

interface DeleteSizePayload extends BasePayload {
  data: {
    id: string
  }
}

export const deleteSize = async (payload: DeleteSizePayload) => {
  console.log(payload)
  const url = `${process.env.BASE_URL}/${baseUrl}/${payload.data.id}`

  let res = await httpClient.delete(url);

  const result = await validateResponse(res)

  if (result) {
    throw new Error(result.message)
  }

  revalidateTag(routeTags.getSizes())

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
