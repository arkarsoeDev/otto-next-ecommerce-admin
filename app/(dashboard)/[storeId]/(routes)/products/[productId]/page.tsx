import { getProduct } from "@/actions/owner/product";
import { ProductForm } from "./components/product-form";
import ErrorPage from "@/components/common/error-page";
import { getAllCategories, getAllColors, getAllSizes } from "@/actions";

const ProductPage = async ({
  params
}: {
  params: { productId: string, storeId: string }
}) => {
  const { data: product, error: productError } = await getProduct(params.productId)
  const { data: categories, error: categoryError } = await getAllCategories({ params: { storeId: params.storeId } })
  const { data: sizes, error: sizeError } = await getAllSizes({ params: { storeId: params.storeId } })
  const { data: colors, error: colorError } = await getAllColors({ params: { storeId: params.storeId } })

  let content
  let error

  if (!categories || !sizes || !colors) {
    content = (
      <div>
        <ErrorPage error={{ message: 'Data Fetching error' }} />
      </div>
    )
  }
  else {
    content = (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ProductForm
            initialData={product?.content}
            categories={categories.content}
            sizes={sizes.content}
            colors={colors.content}
          />
        </div>
      </div>
    )
  }

  return content
}

export default ProductPage;
