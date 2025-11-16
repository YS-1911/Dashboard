import React from "react"

interface ImageDropzoneProps {
    onFileSelect?: (file: File) => void
    preview?: string
}
import { IconCloudDown } from "@tabler/icons-react"
export function ImageDropzone({ onFileSelect    }: ImageDropzoneProps) {
    const [preview, setPreview] = React.useState<string | null>(null)
    const [dragActive, setDragActive] = React.useState(false)
    const fileInputRef = React.useRef<HTMLInputElement | null>(null)

    const handleFile = (file: File) => {
        if (!file.type.startsWith("image/")) return
        const objectUrl = URL.createObjectURL(file)
        setPreview(objectUrl)
        onFileSelect?.(file)
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        const file = e.dataTransfer.files?.[0]
        if (file) handleFile(file)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) handleFile(file)
    }

    return (
        <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setDragActive(true)
            }}
            onDragLeave={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setDragActive(false)
            }}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition
        ${dragActive ? "border-primary bg-primary/5" : "border-muted hover:border-primary/60"}`}
        >

            <input
                id="file-input"
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
            />

            {preview ? (
                <div className="flex flex-col items-center gap-2">
                    <img
                        src={preview}
                        alt="Preview"
                        className="mx-auto h-32 w-32 object-cover rounded-lg shadow-sm"
                    />
                    <p className="text-xs text-muted-foreground"></p>
                </div>
            ) : (
                <div className="text-sm flex flex-col align-center justify-center text-muted-foreground">
                    <p className="text-2xl block mx-auto mb-2"> <IconCloudDown /></p>
                    <p className="text-xs"> PNG, JPG, JPEG</p>
                </div>
            )}
        </div>
    )
}
