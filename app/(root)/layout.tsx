import { redirect } from "next/navigation";
import Navbar from "@/components/navbar";
import { cookies } from "next/headers";
import { routePath } from "@/core/route-path";
import { getAllStores, getProfile } from "@/actions";

export default async function HomeLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const user = cookies().get('jwt')
  if (!user) {
    return redirect(routePath.signIn())
  }

  if (user) {
    const { data } = await getProfile()


    if (!data) {
      return redirect(routePath.signIn())
    }
  }

  const { data, error } = await getAllStores({ params: { limit: 1 } })
  if (data && data.totalElements >= 1) {
    return redirect(routePath.storeShowPage(data.content[0].id))
  }

  return (
    <>
      {children}
    </>
  );
}
