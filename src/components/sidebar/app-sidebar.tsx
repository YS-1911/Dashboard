import * as React from "react"
import {
IconTruckDelivery,
  IconDashboard,
  IconCategory2,
  IconStarFilled,
  IconSettings,
  IconUsers,
  IconBuildingStore,
  IconReportAnalytics,
  IconLogout2
} from "@tabler/icons-react"

import { SidebarFooter } from "@/components/ui/sidebar"


import { NavMain } from "@/components/sidebar/nav-main"


import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "youssef",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Products",
      url: "/products",
      icon: IconBuildingStore,
    },
    {
      title: "Categories",
      url: "/categories",
      icon: IconCategory2,
    },
    {
      title: "Orders",
      url: "/orders",
      icon: IconTruckDelivery,
    },
    {
      title: "Customers",
      url: "/customers",
      icon: IconUsers,
    },
    {
      title: "Reviews",
      url: "/reviews",
      icon: IconStarFilled,
    },
    {
      title: "Reports",
      url: "/reports",
      icon: IconReportAnalytics,
    },

    
  ],
  navSecondary: [
    {
      title: "settings",
      url: "/settings",
      icon: IconSettings,
    },
    {
      title: "Logout",
      url: "/",
      icon: IconLogout2,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas"  {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <h1>
                <img src="/assets/logo.jpeg" className="w-5 h-5 rounded-full" alt="" />
                <span className=" font-semibold text-xl text-primary ">YS</span>
              </h1>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter >
        <NavMain items={data.navSecondary} />
      </SidebarFooter>
    </Sidebar>
  )
}
