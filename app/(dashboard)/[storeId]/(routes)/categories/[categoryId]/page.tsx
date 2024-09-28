import { getCategory } from "@/actions/owner/category";
import { CategoryForm } from "./components/category-form";
import { notFound } from "next/navigation";
import { getAllBillboards } from "@/actions";
import ErrorPage from "@/components/common/error-page";

const CategoryPage = async ({
  params
}: {
  params: { categoryId: string, storeId: string }
}) => {
  const { data: category } = await getCategory(params.categoryId)
  const { data: billboards, error: billboardError } = await getAllBillboards({ params: { storeId: params.storeId } })

  let content

  if (!billboards) {
    content = (
      <div>
        <ErrorPage error={billboardError} />
      </div>
    )
  } else {
    content = (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <CategoryForm initialData={category?.content} billboards={billboards.content} />
        </div>
      </div>
    )
  }

  return content
}

export default CategoryPage;
