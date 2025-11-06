import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { DataTableDemo } from "@/components/productPage/table"
import { SiteHeader } from "@/components/sidebar/site-header"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"

const Products = () => {
    return (
        <div>
            <SidebarProvider
                style={
                    {
                        "--sidebar-width": "calc(var(--spacing) * 72)",
                        "--header-height": "calc(var(--spacing) * 12)",
                    } as React.CSSProperties
                }
            >
                <AppSidebar variant="inset" />
                <SidebarInset>
                    <SiteHeader />
                    <div className="flex flex-1 flex-col">
                        <div className="@container/main flex flex-1 flex-col gap-2">
                            <div className="px-10 mt-20">
                                <DataTableDemo />
                            </div>
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </div>
    );
}

export default Products;
