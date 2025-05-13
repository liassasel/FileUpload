import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

 
export function formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 Bytes"

    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i]
}


export function getFileExtension(filename: string): string {
    return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2)
}

export function isImageFile(fileType: string): boolean {
    return fileType.startsWith("image/")
}


export function isPdfFile(fileType: string): boolean {
    return fileType === "application/pdf"
}


export function isPreviewableFile(fileType: string): boolean {
    const previewableTypes = ["image/jpeg", "image/png", "image/gif", "image/svg+xml", "application/pdf"]
    return previewableTypes.includes(fileType)
}
