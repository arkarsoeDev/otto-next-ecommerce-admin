import { format } from "date-fns";

import { SizeClient } from "./components/client";
import { SizeColumn } from "./components/columns";
import { getAllSizes } from "@/actions/owner/size";
import ErrorPage from "@/components/common/error-page";

const SizesPage = async ({
  params
}: {
  params: { storeId: string }
}) => {

  const { data, error } = await getAllSizes({ params: { storeId: params.storeId } })
  let content

  if (data) {
    const formattedSizes: SizeColumn[] = data.content.map((item) => ({
      id: item.id,
      name: item.name,
      value: item.value,
      createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))

    content = (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <SizeClient data={formattedSizes} />
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

export default SizesPage;
