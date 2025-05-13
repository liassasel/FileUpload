"use client"

import * as React from "react"
import { UploadCloud } from "lucide-react"
import { cn } from "@/lib/utils"
import { FileUploadDropzoneProps } from "@/interfaces"


export function FileUploadDropzone({
    onFilesSelected,
    value,
    helperText,
    maxSize = 10 * 1024 * 1024, // 10MB default
    accept,
    className,
    ...props
}: FileUploadDropzoneProps) {
    const [isDragging, setIsDragging] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)
    const inputRef = React.useRef<HTMLInputElement>(null)

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(true)
    }

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
    }

    const validateFile = (file: File): boolean => {
        // Check file size
        if (file.size > maxSize) {
            setError(`File is too large. Maximum size is ${maxSize / (1024 * 1024)}MB.`)
            return false
        }

        // Check file type if accept is specified
        if (accept) {
            const acceptedTypes = accept.split(",").map((type) => type.trim())
            const fileType = file.type

            // Check if the file type matches any of the accepted types
            const isAccepted = acceptedTypes.some((type) => {
                if (type.startsWith(".")) {
                    // Check file extension
                    return file.name.endsWith(type)
                } else if (type.endsWith("/*")) {
                    // Check MIME type category (e.g., "image/*")
                    const category = type.split("/")[0]
                    return fileType.startsWith(`${category}/`)
                } else {
                    // Check exact MIME type
                    return fileType === type
                }
            })

            if (!isAccepted) {
                setError(`File type not accepted. Accepted types: ${accept}`)
                return false
            }
        }

        setError(null)
        return true
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0]
            if (validateFile(file)) {
                onFilesSelected(e.dataTransfer.files)
            }
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            if (validateFile(file)) {
                onFilesSelected(e.target.files)
            }
        }
    }

    const handleClick = () => {
        inputRef.current?.click()
    }

    return (
        <div className="space-y-2">
            <div
                onClick={handleClick}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={cn(
                    "flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors",
                    isDragging ? "border-primary bg-primary/5" : "border-border hover:bg-accent/50",
                    className,
                )}
            >
                <UploadCloud className="w-10 h-10 mb-2 text-muted-foreground" />
                <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                {value ? (
                    <p className="text-xs text-muted-foreground">{value.name}</p>
                ) : (
                    <p className="text-xs text-muted-foreground">
                        {helperText || `SVG, PNG, JPG or PDF (MAX. ${maxSize / (1024 * 1024)}MB)`}
                    </p>
                )}
                <input ref={inputRef} type="file" className="hidden" onChange={handleChange} accept={accept} {...props} />
            </div>
            {error && <p className="text-xs text-destructive">{error}</p>}
        </div>
    )
}
