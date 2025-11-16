
import * as React from "react"
import {
    type ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    type SortingState,
    useReactTable,
    type VisibilityState,
} from "@tanstack/react-table"
import { PopupMessage } from "../productPage/PopupMessage"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { useState } from "react"

import { IconPlus } from "@tabler/icons-react"

import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"

import { columnsCategory, type CategoryCount } from "./columnsCategory"
import { productsApi, type Product } from "@/api"

export function DataTableCategory() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [data, setData] = React.useState<CategoryCount[]>([])

    // ========== Fetch Data ==========
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await productsApi.getAll()
                const products: Product[] = data.products

                // استخراج الفئات مع العناوين و thumbnail لكل منتج
                const categories = Object.values(
                    products.reduce((acc, product) => {
                        const { category, title, thumbnail } = product

                        if (!acc[category]) {
                            acc[category] = {
                                category,
                                count: 0,
                                products: [] as { title: string; thumbnail: string }[],
                            }
                        }

                        acc[category].count += 1
                        acc[category].products.push({
                            title,
                            thumbnail,
                        })

                        return acc
                    }, {} as Record<string, { category: string; count: number; products: { title: string; thumbnail: string }[] }>)
                )

                setData(categories)
            } catch (error) {
                console.error("Error fetching products:", error)
            }
        }

        fetchData()
    }, [])

    // popup message
    const [popupMessage, setPopupMessage] = useState("")
    const [DialogOpen, setDialogOpen] = useState(false);
    const handlePopupMessage = () => {
        setDialogOpen(false)
        setPopupMessage("Category added successfully!")
        setTimeout(() => setPopupMessage(""), 3000)
    }
    // ========== إعداد الجدول ==========
    const table = useReactTable({
        data,
        columns: columnsCategory,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    // ========== واجهة العرض ==========
    return (
        <div className="w-full">
            <div className="flex items-center justify-between py-4">
                <Input
                    placeholder="Filter by category..."
                    value={(table.getColumn("category")?.getFilterValue() as string) ?? ""}
                    onChange={(e) =>
                        table.getColumn("category")?.setFilterValue(e.target.value)
                    }
                    className="max-w-sm"
                />
                <div className=" flex gap-x-3">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Columns <ChevronDown />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize tex"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Dialog open={DialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-primary text-primary-foreground cursor-pointer">
                                Add category <IconPlus className="ml-2 h-4 w-4" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[525px] max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>Add category</DialogTitle>
                                <DialogDescription>
                                    Fill the form below to add a new category.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="">
                                {/* Form fields for adding a new category can be placed here */}
                                <Input placeholder="Category Name" className="mb-4 w-full" />
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline" className="cursor-pointer">Cancel</Button>
                                </DialogClose>
                                <Button type="submit" onClick={handlePopupMessage} className="cursor-pointer">Add Category</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                </div>
            </div>

            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader className="bg-primary text-primary-foreground text-center "  >
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead className="text-center" key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columnsCategory.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="text-muted-foreground flex-1 text-sm">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
            {popupMessage && <PopupMessage setMessage={setPopupMessage} message={popupMessage} />}
        </div>

    )
}
