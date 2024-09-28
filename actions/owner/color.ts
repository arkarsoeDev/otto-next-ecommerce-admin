'use server'

import { Color } from "@/core/models"
import { ApiPaginatedResponse, ApiResponse } from "@/core/response/response"
import { BasePayload } from "../base/base-payload"
import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { validateResponse } from "@/core/validate-response"
import { httpClient } from "@/lib/http-client"
import { routeTags } from "@/core/route-tag"

const baseUrl = 'api/owner/colors'

interface GetAllColorsPayload {
  params: {
    storeId?: string,
    limit?: number
  }
}

export const getAllColors = async (payload?: GetAllColorsPayload): Promise<ApiPaginatedResponse<Color>> => {

  let res: Response | null = null
  let error: BaseError | null = null
  let data = null

  const url = `${process.env.BASE_URL}/${baseUrl}`

  res = await httpClient.get(url, { params: payload?.params, next: { tags: [routeTags.getColors()] } });

  error = await validateResponse(res)

  console.log(error)

  if (!error) {
    data = await res.json()
  }

  return { data, error }
}

export const getColor = async (id: string): Promise<ApiResponse<Color>> => {

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

interface CreateColorPayload extends BasePayload {
  data: {
    name: string
    value: string
    storeId: string
  }
}

export const createColor = async (payload: CreateColorPayload) => {
  const url = `${process.env.BASE_URL}/${baseUrl}`

  let res = await httpClient.post(url, {
    body: JSON.stringify(payload.data),
  });

  const result = await validateResponse(res)

  if (result) {
    throw new Error(result.message)
  }

  revalidateTag(routeTags.getColors())

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

interface UpdateColorPayload extends BasePayload {
  data: {
    id?: string
    name?: string
    value?: string
  }
}

export const updateColor = async (payload: UpdateColorPayload) => {
  const url = `${process.env.BASE_URL}/${baseUrl}/${payload.data.id}`

  let res = await httpClient.patch(url, {
    body: JSON.stringify(payload.data),
  });

  const result = await validateResponse(res)

  if (result) {
    throw new Error(result.message)
  }

  revalidateTag(routeTags.getColors())

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

interface DeleteColorPayload extends BasePayload {
  data: {
    id: string
  }
}

export const deleteColor = async (payload: DeleteColorPayload) => {
  console.log(payload)
  const url = `${process.env.BASE_URL}/${baseUrl}/${payload.data.id}`

  let res = await httpClient.delete(url);

  const result = await validateResponse(res)

  if (result) {
    throw new Error(result.message)
  }

  revalidateTag(routeTags.getColors())

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
