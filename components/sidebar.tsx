'use client';

import { handleSignOut } from "@/app/actions/cognitoActions";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Settings,
  BarChart3,
  Store,
  LogOutIcon,
  PackagePlus,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
    color: "text-sky-500",
  },
  {
    label: "Orders",
    icon: ShoppingCart,
    href: "/dashboard/orders",
    color: "text-violet-500",
  },
  {
    label: "Inventory",
    icon: Package,
    href: "/dashboard/inventory",
    color: "text-pink-700",
  },
  {
    label: "Add Product",
    icon: PackagePlus,
    href: "/dashboard/add-product",
    color: "text-gray-500",
  },
  {
    label: "Marketplace",
    icon: Store,
    href: "/dashboard/marketplace",
    color: "text-green-500",
  },
  {
    label: "Analytics",
    icon: BarChart3,
    href: "/dashboard/analytics",
    color: "text-orange-700",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
    color: "text-gray-500",
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async() => {
    const logoutRes = await handleSignOut();

    const logoutResObj = JSON.parse(logoutRes);
    if(logoutResObj.success){
      router.push('/auth/login');
    }else{
      console.log(logoutResObj.error);
    }
  }

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/" className="flex items-center pl-3 mb-14">
          <h1 className="text-2xl font-bold">MCF Dashboard</h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href
                  ? "text-white bg-white/10"
                  : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
          <button className="text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition text-zinc-400">
              <div className="flex items-center flex-1" onClick={async()=>await handleLogout()}>
                <LogOutIcon className="h-5 w-5 mr-3"/>
                Logout
              </div>
          </button>
        </div>
      </div>
    </div>
  );
}