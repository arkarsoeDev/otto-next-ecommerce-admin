import { getColor } from "@/actions/owner/color";
import { ColorForm } from "./components/color-form";
import { notFound } from "next/navigation";

const ColorPage = async ({
  params
}: {
  params: { colorId: string }
}) => {
  const { data, error } = await getColor(params.colorId)

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={data?.content} />
      </div>
    </div>
  );
}

export default ColorPage;
