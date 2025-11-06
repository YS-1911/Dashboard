import * as React from "react"
import {
IconTruckDelivery,
  IconDashboard,
  IconCategory2,
  IconInnerShadowTop,
  IconStarFilled,
  IconSettings,
  IconUsers,
  IconBuildingStore,
  IconReportAnalytics,
} from "@tabler/icons-react"

import { SidebarFooter } from "@/components/ui/sidebar"
import { NavUser } from "@/components/sidebar/nav-user"

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

    {
      title: "settings",
      url: "/settings",
      icon: IconSettings,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    }
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
                <IconInnerShadowTop className="size-5!" />
                <span className="text-base font-semibold ">YS</span>
              </h1>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter >
        <NavUser user={{ name: "youssef", email: "m@example.com", avatar: "/default-avatar.png" }} />
      </SidebarFooter>
    </Sidebar>
  )
}
