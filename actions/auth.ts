'use server'

import { Store } from "@/core/models"
import { ApiPaginatedResponse, ApiResponse } from "@/core/response/response"
import { BasePayload } from "./base/base-payload"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { validateResponse } from "@/core/validate-response"
import { httpClient } from "@/lib/http-client"
import { cookies } from "next/headers";
import { routePath } from "@/core/route-path"

const baseUrl = 'api/auth'

interface SignInPayload extends BasePayload {
  data: {
    username: string
    password: string
  }
}

export const signIn = async (payload: SignInPayload) => {

  const url = `${process.env.BASE_URL}/${baseUrl}/sign-in`

  let res = await httpClient.post(url, {
    body: JSON.stringify(payload.data),
  })

  const result = await validateResponse(res)

  if (result) {
    throw new Error(result.message)
  }

  const data = await res.json()

  cookies().set('jwt', data.access_token)

  if (payload.revalidate) {
    payload.revalidate.map(each => {
      revalidatePath(each)
    })
  }

  if (payload.redirectPath) {
    redirect(payload.redirectPath)
  }

  return data
}

export const getProfile = async () => {

  let res: Response | null = null
  let error: BaseError | null = null
  let data = null

  const url = `${process.env.BASE_URL}/${baseUrl}/profile`

  res = await httpClient.get(url);

  error = await validateResponse(res)

  console.log(error)

  if (!error) {
    data = await res.json()
  }

  return { data, error }
}

export const signOut = async () => {

  let res: Response | null = null
  let error: BaseError | null = null
  let data = null

  const url = `${process.env.BASE_URL}/${baseUrl}/sign-out`

  res = await httpClient.get(url);

  error = await validateResponse(res)

  if (!error) {
    cookies().delete('jwt')
    redirect(routePath.signIn())
  }

  return { data, error }
}
