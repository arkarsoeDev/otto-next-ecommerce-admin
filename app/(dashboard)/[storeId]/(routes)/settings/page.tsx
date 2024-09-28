import { redirect } from "next/navigation";

import { SettingsForm } from "./components/settings-form";
import { routePath } from "@/core/route-path";
import { getStore } from "@/actions";

interface SettingsPageProps {
  params: {
    storeId: string;
  }
};

const SettingsPage: React.FC<SettingsPageProps> = async ({
  params
}) => {

  const { data, error } = await getStore(params.storeId)

  if (!data) {
    redirect(routePath.home());
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={data.content} />
      </div>
    </div>
  );
}

export default SettingsPage;
