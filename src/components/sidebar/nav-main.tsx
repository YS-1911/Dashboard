import { type Icon } from "@tabler/icons-react"

import { NavLink } from "react-router";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,

  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col mt-5 gap-2">

        <SidebarMenu className="flex flex-col gap-3">
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <NavLink  to={item.url} className="flex ps-2  py-2 items-center gap-2 text-sm " >
                {item.icon && <item.icon  size={18} className="text-gray-400"/>}
                <span className="">{item.title}</span>
              </NavLink>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
