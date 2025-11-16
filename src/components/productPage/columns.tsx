/* eslint-disable react-hooks/rules-of-hooks */


// ================== React Table ==================
import {
    type ColumnDef,
} from "@tanstack/react-table"


// ================== Components ==================
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ImageDropzone } from "./Drop_Image_Upload"
import { PopupMessage } from "./PopupMessage"


// ================== Modals ==================
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

// ================== Icons ==================
import { IconEdit, IconTrashFilled, IconEye, IconCoinFilled, IconBrandMedium, IconBox, IconStarFilled } from "@tabler/icons-react"
// ================== API ==================
import { useState } from "react"
import { productsApi, type Product } from "@/api"

export const columns = (categories: string[]): ColumnDef<Product>[] => [
    {
        accessorKey: "title",
        header: ({ column }) => (
            <div className="flex justify-center">
            <Button
                variant="ghost"
                className="cursor-pointer"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Product Name
                <ArrowUpDown />
            </Button>
            </div>
        ),
        cell: ({ row }) => (
            <div className="text-center  capitalize">{row.getValue("title")}</div>
        ),
    },

    {
        accessorKey: "category",
        header: () => <div className="text-center">Category</div>,
        cell: ({ row }) => (
            <div className="text-center capitalize">{row.getValue("category")}</div>
        ),
    },
    {
        accessorKey: "brand",
        header: () => <div className="text-center">Brand</div>,
        cell: ({ row }) => (
            <div className="text-center capitalize">{row.getValue("brand")}</div>
        ),
    },
    {
        accessorKey: "thumbnail",
        header: () => <div className="text-center">Image</div>,
        cell: ({ row }) => (
            <div className=" flex justify-center">
            <img
                className="h-10 w-10   rounded-sm object-cover"
                src={row.getValue("thumbnail")}
                alt=""
            />
            </div>
        ),
    },
    {
        accessorKey: "stock",
        header: () => <div className="text-center">Amount</div>,
        cell: ({ row }) => (
            <div className="text-center capitalize">{row.getValue("stock")}</div>
        ),
    },
    {
        accessorKey: "price",
        header: () => <div className="text-center">Price</div>,
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("price"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(price)
            return <div className="text-center font-medium">{formatted}</div>
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const productTitle: string = row.getValue("title")
            const warrantyInformation: string = row.original.warrantyInformation
            const shippingInformation = row.original.shippingInformation
            const returnPolicy = row.original.returnPolicy
            const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
            const images: string[] = row.original.images || []
            const [popupMessage, setPopupMessage] = useState("")

            // ================= Delete Product ==================
            const deleteProduct = async () => {
                try {
                    const productId = row.original.id;
                    await productsApi.delete(productId);
                    console.log(`  Deleted product: ${productTitle}`);
                    setIsDeleteDialogOpen(false);
                    setPopupMessage("Product deleted successfully ✅")
                } catch (error) {
                    console.error("Error deleting product:", error)
                }
            }

            // ================= Edit Product ==================
            const [productTitleState, setProductTitleState] = useState(row.original.title)
            const [price, setPrice] = useState(row.original.price)
            const [brand, setBrand] = useState(row.original.brand)
            const [category, setCategory] = useState(row.original.category)
            const [description, setDescription] = useState(row.original.description)
            const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);


            const editProduct = async () => {
                try {
                    const productId = row.original.id
                    await productsApi.update(productId, {
                        title: productTitle,
                        price,
                        brand,
                        category,
                        description,
                    })
                    console.log(`Updated product: ${category}`)
                    setPopupMessage("Product updated successfully ✅")
                    setIsEditDialogOpen(false);

                } catch (error) {
                    console.error("Error updating product:", error)
                }
            }


            return (
                <>
                    <div className="flex gap-2 items-center justify-center">
                        {/* Edit */}
                        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} >
                            <DialogTrigger asChild>
                                <Button className="bg-primary w-7 h-7 text-primary-foreground cursor-pointer">
                                    <IconEdit />
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[525px] max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                    <DialogTitle>Edit product</DialogTitle>
                                    <DialogDescription>
                                        Make changes to your product here. Click save when you're done.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4">
                                    <label className="text-sm font-medium">Name</label>
                                    <Input
                                        value={productTitleState}
                                        onChange={(e) => setProductTitleState(e.target.value)}
                                        placeholder="Product name"
                                    />

                                    <label className="text-sm font-medium">Price</label>
                                    <Input
                                        value={price}
                                        onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                                        placeholder="Product price"
                                    />

                                    <label className="text-sm font-medium">Brand</label>
                                    <Input
                                        value={brand}
                                        onChange={(e) => setBrand(e.target.value)}
                                        placeholder="Product brand"
                                    />

                                    <label className="text-sm font-medium">Category</label>
                                    <Select value={category} onValueChange={setCategory}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder={category} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((cat) => (
                                                <SelectItem key={cat} value={cat}>
                                                    {cat}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>


                                    <label className="text-sm font-medium">Description</label>
                                    <Textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Product description"
                                    />

                                    <label className="text-sm font-medium">Image</label>
                                    <ImageDropzone />
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="outline" className="cursor-pointer">Cancel</Button>
                                    </DialogClose>
                                    <Button type="submit" onClick={editProduct} className="cursor-pointer">Save changes</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        {/* Delete */}
                        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                            <DialogTrigger asChild>
                                <Button onClick={() => setIsDeleteDialogOpen(true)} className="bg-primary w-7 h-7 text-primary-foreground cursor-pointer">
                                    <IconTrashFilled className="text-red-400" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="lg:max-w-[525px] max-w-[325px]  max-h-[90vh] overflow-y-auto">
                                <DialogHeader className=" flex items-center">
                                    <DialogTitle>Delete product</DialogTitle>
                                    <DialogDescription className="text-center">
                                        Are you sure you want to delete <span className="font-bold text-primary">{productTitle}</span>  ? <br /> This action cannot be undone.
                                    </DialogDescription>
                                </DialogHeader>

                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="outline" className="cursor-pointer">Cancel</Button>
                                    </DialogClose>
                                    <Button type="submit" onClick={deleteProduct} className="cursor-pointer">Delete <IconTrashFilled className="text-red-400" /></Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        {/* View */}
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="bg-primary w-7 h-7 text-primary-foreground cursor-pointer">
                                    <IconEye />
                                </Button>
                            </DialogTrigger>

                            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto rounded-2xl shadow-lg">
                                <DialogHeader className="text-center space-y-1">
                                    <DialogTitle className="text-lg font-semibold text-foreground">View Product</DialogTitle>
                                    <DialogDescription className="text-muted-foreground text-sm">
                                        Product detailed information
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="flex flex-col gap-6 items-center justify-center px-4 pb-6">
                                    {/* Main thumbnail */}
                                    <img
                                        src={row.getValue("thumbnail")}
                                        alt="thumbnail"
                                        className="h-44 w-44 object-cover rounded-lg shadow-md border border-border"
                                    />

                                    {/* Gallery */}
                                    {images.length > 1 && (
                                        <div className="flex flex-wrap justify-center gap-2">
                                            {images.map((image, index) => (
                                                <img
                                                    key={index}
                                                    src={image}
                                                    className="h-20 w-20 object-cover rounded-md border border-border hover:scale-105 transition-transform"
                                                    alt={`image-${index}`}
                                                />
                                            ))}
                                        </div>
                                    )}

                                    {/* Title & Description */}
                                    <div className="text-center space-y-1 max-w-[90%]">
                                        <p className="text-xs uppercase tracking-wide text-primary font-medium">
                                            {row.getValue("category")}
                                        </p>
                                        <h3 className="text-lg font-semibold text-foreground">{row.getValue("title")}</h3>
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            {row.original.description}
                                        </p>
                                    </div>

                                    {/* Price / Brand / Stock */}
                                    <div className="flex items-center justify-between w-full bg-muted/30 p-4 rounded-xl shadow-sm">
                                        <div className="flex flex-col items-center">
                                            <div className="flex items-center gap-1 text-primary font-semibold">
                                                <IconCoinFilled className="size-4" />
                                                <h3 className="text-sm">Price</h3>
                                            </div>
                                            <p className="text-muted-foreground text-sm mt-1">${row.getValue("price")}</p>
                                        </div>

                                        <div className="flex flex-col items-center">
                                            <div className="flex items-center gap-1 text-primary font-semibold">
                                                <IconBrandMedium className="size-4" />
                                                <h3 className="text-sm">Brand</h3>
                                            </div>
                                            <p className="text-muted-foreground text-sm mt-1">{row.getValue("brand")}</p>
                                        </div>

                                        <div className="flex flex-col items-center">
                                            <div className="flex items-center gap-1 text-primary font-semibold">
                                                <IconBox className="size-4" />
                                                <h3 className="text-sm">Stock</h3>
                                            </div>
                                            <p className="text-muted-foreground text-sm mt-1">{row.getValue("stock")}</p>
                                        </div>
                                    </div>

                                    {/* Warranty, Shipping, Return */}
                                    <div className="w-full bg-muted/30 p-4 rounded-xl space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="font-medium text-foreground">Warranty:</span>
                                            <span className="text-muted-foreground">{warrantyInformation}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="font-medium text-foreground">Shipping:</span>
                                            <span className="text-muted-foreground">{shippingInformation}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="font-medium text-foreground">Return Policy:</span>
                                            <span className="text-muted-foreground">{returnPolicy}</span>
                                        </div>
                                    </div>

                                    {/* Rating & Reviews */}
                                    <div className="w-full bg-muted/30 p-4 rounded-xl space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-primary font-semibold">
                                                <IconStarFilled className="size-4" />
                                                <span>Rating</span>
                                            </div>
                                            <span className="text-muted-foreground">{row.original.rating} / 5</span>
                                        </div>

                                        <div className="max-h-28 overflow-y-auto space-y-2">
                                            {row.original.reviews?.map((review, index) => (
                                                <div key={index} className="p-2 border-b border-border">
                                                    <p className="text-sm text-foreground font-medium">
                                                        {review.reviewerName} ({review.rating}/5)
                                                    </p>
                                                    <p className="text-muted-foreground text-xs">{review.comment}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <DialogFooter className="flex justify-center">
                                    <DialogClose asChild>
                                        <Button variant="outline" className="cursor-pointer w-24">
                                            Close
                                        </Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        <PopupMessage message={popupMessage} setMessage={setPopupMessage} />
                    </div>
                </>
            )
        },
    },
]
