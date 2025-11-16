import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { IconEye } from "@tabler/icons-react"

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


export type CategoryCount = {
    category: string
    count: number
    products: { title: string; thumbnail: string }[]
}

export const columnsCategory: ColumnDef<CategoryCount>[] = [
    {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => <div className="capitalize text-center">{row.original.category}</div>,
    },
    {
        accessorKey: "count",
        header: "Number of Products",
        cell: ({ row }) => <div className="text-center">{row.original.count}</div>,
    },
    {
        accessorKey: "thumbnail",
        header: "image",
        cell: ({ row }) =>
            <div className="flex flex-wrap justify-center gap-1">
                {row.original.products.map((product, index) => (
                    <img
                        key={index}
                        className="w-6 h-6 rounded"
                        src={product.thumbnail}
                        alt={product.title}
                        title={product.title} // يظهر العنوان عند hover
                    />
                ))}
            </div>,
    },
    {
        id: "actions",
        enableHiding: false,
        header: "view products in this category",
        cell: ( { row }) => <div className="text-center">
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="bg-primary w-7 h-7 text-primary-foreground cursor-pointer">
                        <IconEye />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>view products in this category</DialogTitle>
                        <DialogDescription>
                            Here you can see all products related to this category.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="">
                        {row.original.products.map((product, index) => (
                            <div key={index} className="flex items-center gap-2 mb-2">
                                <img className="w-10 h-10 rounded" src={product.thumbnail} alt={product.title} />
                                <span>{product.title}</span>
                            </div>
                        ))}
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" className="cursor-pointer">Cancel</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>,
    },
]
