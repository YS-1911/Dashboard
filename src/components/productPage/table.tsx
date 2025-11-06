

import * as React from "react"
import {
    type ColumnDef,
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
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const data: Payment[] = [
    {
        id: "m5gr84i9",
        price: 316,
        status: "active",
        productName: "produst 1",
        productImage : "/assets/images.jpeg",
    },
    {
        id: "3u1reuv4",
        price: 242,
        status: "active",
        productName: "produst 2",
        productImage : "/assets/images.jpeg",
    },
    {
        id: "derv1ws0",
        price: 837,
        status: "active",
        productName: "produst 3",
        productImage : "/assets/images.jpeg",
    },
    {
        id: "5kma53ae",
        price: 874,
        status: "active",
        productName: " produst 4",
        productImage : "/assets/images.jpeg",
    },
    {
        id: "bhqecj4p",
        price: 721,
        status: "not-active",
        productName: " produst 5",
        productImage : "/assets/images.jpeg",
    },
    {
        id: "bhqecj4p",
        price: 721,
        status: "not-active",
        productName: " produst 5",
        productImage : "/assets/images.jpeg",
    },
    {
        id: "bhqecj4p",
        price: 721,
        status: "not-active",
        productName: " produst 5",
        productImage : "/assets/images.jpeg",
    },
    {
        id: "bhqecj4p",
        price: 721,
        status: "not-active",
        productName: " produst 5",
        productImage : "/assets/images.jpeg",
    },
    {
        id: "bhqecj4p",
        price: 721,
        status: "not-active",
        productName: " produst 5",
        productImage : "/assets/images.jpeg",
    },
    {
        id: "bhqecj4p",
        price: 721,
        status: "not-active",
        productName: " produst 5",
        productImage : "/assets/images.jpeg",
    },
    {
        id: "bhqecj4p",
        price: 721,
        status: "not-active",
        productName: " produst 5",
        productImage : "/assets/images.jpeg",
    },
    {
        id: "bhqecj4p",
        price: 721,
        status: "not-active",
        productName: " produst 5",
        productImage : "/assets/images.jpeg",
    },
    {
        id: "bhqecj4p",
        price: 721,
        status: "not-active",
        productName: " produst 5",
        productImage : "/assets/images.jpeg",
    },
    {
        id: "bhqecj4p",
        price: 721,
        status: "not-active",
        productName: " produst 5",
        productImage : "/assets/images.jpeg",
    },
    {
        id: "bhqecj4p",
        price: 721,
        status: "not-active",
        productName: " produst 5",
        productImage : "/assets/images.jpeg",
    },
]

export type Payment = {
    id: string
    price: number
    status: "active" | "not-active"   
    productName: string
    productImage: string
}

// eslint-disable-next-line react-refresh/only-export-components
export const columns :  ColumnDef<Payment >[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("status")}</div>
        ),
    },
    {
        accessorKey: "productName",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="cursor-pointer"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Product name
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase text-start">{row.getValue("productName")}</div>,
    },
    {
        accessorKey: "productImage",
        header: () => <div className="text-start">Image</div>,
        cell: ({ row }) => {
            const formatted = String(row.getValue("productImage"))
            // Ensure the product image value is a string before using it as src
            
            return <img className="h-10  w-10 rounded-sm" src={formatted} alt="" />
        },
    },
    {
        accessorKey: "price",
        header: () => <div className="text-right ">Price</div>,
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("price"))

            // Format the price as a dollar price
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(price)

            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const payment = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(payment.id)}
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

export function DataTableDemo() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
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

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter name..."
                    value={(table.getColumn("productName")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("productName")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
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
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
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
                                    colSpan={columns.length}
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
                        className="cursor-pointer"
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="cursor-pointer"
                        onClick={() => table.nextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}
