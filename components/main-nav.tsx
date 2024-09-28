"use client";

import Link from "next/link"
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils"
import { routePath } from "@/core/route-path";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params: { storeId: string } = useParams();

  const routes = [
    {
      href: `/${params.storeId}`,
      label: 'Dashboard',
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `${routePath.billboards(params.storeId)}`,
      label: 'Billboards',
      active: pathname === `${routePath.billboards(params.storeId)}`,
    },
    {
      href: `${routePath.categories(params.storeId)}`,
      label: 'Categories',
      active: pathname === `${routePath.categories(params.storeId)}`,
    },
    {
      href: `${routePath.sizes(params.storeId)}`,
      label: 'Sizes',
      active: pathname === `${routePath.sizes(params.storeId)}`,
    },
    {
      href: `${routePath.colors(params.storeId)}`,
      label: 'Colors',
      active: pathname === `${routePath.colors(params.storeId)}`,
    },
    {
      href: `${routePath.products(params.storeId)}`,
      label: 'Products',
      active: pathname === `${routePath.products(params.storeId)}`,
    },
    {
      href: `${routePath.orders(params.storeId)}`,
      label: 'Orders',
      active: pathname === `${routePath.orders(params.storeId)}`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: 'Settings',
      active: pathname === `/${params.storeId}/settings`,
    },
  ]

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            route.active ? 'text-black dark:text-white' : 'text-muted-foreground'
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  )
};
