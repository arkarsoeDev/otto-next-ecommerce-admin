import { format } from "date-fns";

import { BillboardClient } from "./components/client";
import { BillboardColumn } from "./components/columns";
import { getAllBillboards } from "@/actions/owner/billboard";

const BillboardsPage = async ({
  params
}: {
  params: { storeId: string }
}) => {

  const { data, error } = await getAllBillboards({ params: { storeId: params.storeId } })

  let content
  if (data) {
    const formattedBillboards: BillboardColumn[] = data.content.map((item) => ({
      id: item.id,
      label: item.label,
      createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))

    content = (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <BillboardClient data={formattedBillboards} />
        </div>
      </div>
    )
  } else {
    content = (
      <div>no billboard exist</div>
    )
  }

  return (
    <>
      {content}
    </>
  );
}

export default BillboardsPage;
