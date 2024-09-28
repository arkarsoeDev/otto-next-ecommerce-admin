import { getBillboard } from "@/actions/owner/billboard";
import { BillboardForm } from "./components/billboard-form";
import { notFound } from "next/navigation";

const BillboardPage = async ({
  params
}: {
  params: { billboardId: string }
}) => {
  const { data, error } = await getBillboard(params.billboardId)

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={data?.content} />
      </div>
    </div>
  );
}

export default BillboardPage;
