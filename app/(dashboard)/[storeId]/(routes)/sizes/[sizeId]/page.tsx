import { getSize } from "@/actions/owner/size";
import { SizeForm } from "./components/size-form";
import { notFound } from "next/navigation";

const SizePage = async ({
  params
}: {
  params: { sizeId: string }
}) => {
  const { data, error } = await getSize(params.sizeId)

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={data?.content} />
      </div>
    </div>
  );
}

export default SizePage;
