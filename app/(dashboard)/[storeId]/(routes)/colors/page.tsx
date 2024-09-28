import { format } from "date-fns";

import { ColorClient } from "./components/client";
import { ColorColumn } from "./components/columns";
import { getAllColors } from "@/actions/owner/color";
import ErrorPage from "@/components/common/error-page";

const ColorsPage = async ({
  params
}: {
  params: { storeId: string }
}) => {

  const { data, error } = await getAllColors({ params: { storeId: params.storeId } })
  let content

  if (data) {
    const formattedColors: ColorColumn[] = data.content.map((item) => ({
      id: item.id,
      name: item.name,
      value: item.value,
      createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))

    content = (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ColorClient data={formattedColors} />
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

export default ColorsPage;
