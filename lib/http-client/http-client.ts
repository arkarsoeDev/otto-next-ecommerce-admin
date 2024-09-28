'use server'

import { cookies } from "next/headers";

export async function get(url: string, options?: any) {
  const { params, ...rest } = options ?? {}
  let preparedUrl = url
  if (params) preparedUrl = url + '?' + new URLSearchParams(params).toString()

  return fetch(preparedUrl, {
    method: 'GET',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies().toString()
    },
    ...rest
  })
}

export async function post(url: string, options: any) {
  const { params, ...rest } = options ?? {}
  let preparedUrl = url
  if (params) preparedUrl = url + '?' + new URLSearchParams(params).toString()


  return fetch(preparedUrl, {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies().toString()
    },
    ...rest
  })
}

export async function patch(url: string, options: any) {
  const { params, ...rest } = options ?? {}
  let preparedUrl = url
  if (params) preparedUrl = url + '?' + new URLSearchParams(params).toString()


  return fetch(preparedUrl, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies().toString()
    },
    ...rest
  })
}

export async function remove(url: string, options?: any) {
  const { params, ...rest } = options ?? {}
  let preparedUrl = url
  if (params) preparedUrl = url + '?' + new URLSearchParams(params).toString()


  return fetch(preparedUrl, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies().toString()
    },
    ...rest
  })
}

