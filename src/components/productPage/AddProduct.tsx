// ================== API ==================
import { useState, useEffect } from "react"
import { productsApi} from "@/api"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
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
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ImageDropzone } from "./Drop_Image_Upload"
import { IconPlus } from "@tabler/icons-react"


const AddProduct = () => {

    const [title, setTitle] = useState("")
    const [price, setPrice] = useState(0)
    const [brand, setBrand] = useState("")
    const [description, setDescription] = useState("")
    const [imageFile, setImageFile] = useState("");
    const [addcategory, setaddCategory] = useState("")
    const [categories, setCategories] = useState<string[]>([])

    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    // ========== Fetch Data ==========
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await productsApi.getAll()
                const unicecategories: string[] = Array.from(new Set(data.products.map(p => p.category)));
                setCategories(unicecategories);
                console.log(data.products);
            } catch (error) {
                console.error("Error fetching products:", error)
            }
        }
        fetchData()
    }, [])



    const handleAddProduct = async () => {
        try {
            const { data } = await productsApi.create({
                title: title,
                price: price,
                brand: brand,
                description: description,
                category: addcategory,
                thumbnail: imageFile
            });
            setIsAddDialogOpen(false);
            console.log("Product added:", data);
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };
    const handleFileSelect = (file: File) => {
        setImageFile(URL.createObjectURL(file));
    }

    return (
        <div>
            {/* Add Product Dialog */}
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                    <Button className="bg-primary text-primary-foreground cursor-pointer">
                        Add product <IconPlus className="ml-2 h-4 w-4" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Add product</DialogTitle>
                        <DialogDescription>
                            Add a new product to the store
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 ">
                        <label className="text-sm font-medium"> Name</label>
                        <Input onChange={(e) => setTitle(e.target.value)} placeholder="Product name" />
                        <label className="text-sm font-medium">Price</label>
                        <Input onChange={(e) => setPrice(parseFloat(e.target.value))} placeholder="Product price" />
                        <label className="text-sm font-medium">Brand</label>
                        <Input onChange={(e) => setBrand(e.target.value)} placeholder=" Product brand" />
                        <label className="text-sm font-medium">Category</label>
                        <Select onValueChange={(value) => setaddCategory(value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((cat) => (
                                    <SelectItem key={cat} value={cat}>
                                        {cat}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <label className="text-sm font-medium"> Description</label>
                        <Textarea onChange={(e) => setDescription(e.target.value)} placeholder="Product description" />
                        <label className="text-sm font-medium">Image</label>
                        <ImageDropzone onFileSelect={handleFileSelect} />
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" className="cursor-pointer">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" onClick={handleAddProduct} className="cursor-pointer">Add product</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    );
}

export default AddProduct;
