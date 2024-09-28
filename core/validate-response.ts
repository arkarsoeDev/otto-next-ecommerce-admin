export async function validateResponse(resp: Response, skipAuth?: boolean): Promise<{ message: string, errors?: [] } | null> {

  if (resp.status === 403) {
    return { message: "FORBIDDEN: Permission denied" }
  }

  if (resp.status === 404) {
    return { message: "Resource not found" }
  }

  if (!resp.ok) {
    const json = await resp.json();

    if (resp.status === 400) {
      let errors = []
      if (!Array.isArray(json.message)) {
        errors = [json.message]
      } else {
        errors = json.message
      }

      return { message: "Bad Request", errors }
    }

    return { message: json.message }
  }

  return null
}
