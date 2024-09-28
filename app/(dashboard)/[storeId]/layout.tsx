import { redirect } from "next/navigation";
import Navbar from "@/components/navbar";
import { cookies } from "next/headers";
import { routePath } from "@/core/route-path";

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const user = cookies().get('jwt')
  if (!user) {
    redirect(routePath.signIn())
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
