import { format } from "date-fns";

import { CategoryClient } from "./components/client";
import { CategoryColumn } from "./components/columns";
import { getAllCategories } from "@/actions";

const CategoriesPage = async ({
  params
}: {
  params: { storeId: string }
}) => {

  const { data, error } = await getAllCategories({ params: { storeId: params.storeId } })

  let content
  if (data) {
    const formattedCategories: CategoryColumn[] = data.content.map((item) => ({
      id: item.id,
      name: item.name,
      createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))

    content = (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <CategoryClient data={formattedCategories} />
        </div>
      </div>
    )
  } else {
    content = (
      <div>no category exist</div>
    )
  }

  return (
    <>
      {content}
    </>
  );
}

export default CategoriesPage;
