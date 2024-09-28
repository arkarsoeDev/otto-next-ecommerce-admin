import { format } from "date-fns";

import { ProductClient } from "./components/client";
import { ProductColumn } from "./components/columns";
import { getAllProducts } from "@/actions/owner/product";
import { formatter } from "@/lib/utils";
import ErrorPage from "@/components/common/error-page";

const ProductsPage = async ({
  params
}: {
  params: { storeId: string }
}) => {

  const { data, error } = await getAllProducts({ params: { storeId: params.storeId } })

  let content
  if (data) {
    const formattedProducts: ProductColumn[] = data.content.map((item) => ({
      id: item.id,
      name: item.name,
      isFeatured: item.isFeatured,
      isArchived: item.isArchived,
      price: formatter.format(item.price),
      category: item.category.name,
      size: item.size.name,
      color: item.color.value,
      createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))

    content = (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ProductClient data={formattedProducts} />
        </div>
      </div>
    )
  } else {
    content = (
      <ErrorPage error={error} />
    )
  }

  return (
    <>
      {content}
    </>
  );
}

export default ProductsPage;
