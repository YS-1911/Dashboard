
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useLocation } from "react-router-dom";
import { ModeToggle } from "./mode-toggle"
export function SiteHeader() {
  const location = useLocation();

  const titles: Record<string, string> = {
    "/": "Dashboard",
    "/reports": "Reports",
    "/settings": "Settings",
    "/reviews": "Reviews",
    "/customers": "Customers",
    "/orders": "Orders",
    "/categories": "Categories",
    "/products": "Products",
  };

  const pageTitle = titles[location.pathname] || "Page";
  return (
    <header className="flex md:relative w-full fixed top-0 md:bg-none  bg-[#18181a] justify-between h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1 text-white cursor-pointer" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base text-white font-medium">{pageTitle}</h1>
        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
        
        </div>
      </div>
    </header>
  )
}
