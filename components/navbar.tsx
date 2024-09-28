import { redirect } from "next/navigation";

import StoreSwitcher from "@/components/store-switcher";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileNav } from "./mobile-nav";
import { getAllStores } from "@/actions";
import SignOutButton from "./sign-out";

const Navbar = async () => {
  const { data, error } = await getAllStores()

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={data?.content ?? []} />
        <MainNav className="mx-6 sm:hidden lg:block" />
        <div className="ml-auto flex items-center space-x-4">
          <MobileNav className="hidden sm:block lg:hidden mr-auto" />
          <ThemeToggle />
          <SignOutButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
