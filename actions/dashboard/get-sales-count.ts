import { ApiResponse } from "@/core/response/response";
import { validateResponse } from "@/core/validate-response";
import { httpClient } from "@/lib/http-client";

interface GraphData {
    name: string
    total: number
}

const baseUrl = "api/dashboard"

export const getSalesCount = async (storeId: string): Promise<ApiResponse<number>> => {

    let res: Response | null = null
    let error: BaseError | null = null
    let data = null

    const url = `${process.env.BASE_URL}/${baseUrl}/${storeId}/get-sales-count`

    res = await httpClient.get(url);

    error = await validateResponse(res)

    console.log(error)

    if (!error) {
        data = await res.json()
    }

    return { data, error }
}
