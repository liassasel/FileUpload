"use client"

import * as React from "react"
import { PageLayout } from "@/components/common/templates/PageLayout"
import { FileList } from "@/components/common/organisms/FileList"
import { FileUploadForm } from "@/components/features/FileUpload/FileUploadForm"
import { FileViewerModal } from "@/components/features/FileUpload/FileViewerModal"
import { mockFiles } from "@/mock/MockData"
import { FileInfo } from "@/interfaces"


export function FileManagerPage() {
    const [files, setFiles] = React.useState<FileInfo[]>(mockFiles)
    const [isUploading, setIsUploading] = React.useState(false)
    const [viewingFile, setViewingFile] = React.useState<FileInfo | null>(null)

    const handleUpload = async (file: File) => {
        setIsUploading(true)

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500))

            // In a real app, you would upload to your backend here
            // const formData = new FormData()
            // formData.append('file', file)
            // const response = await fetch('/api/upload', { method: 'POST', body: formData })
            // const data = await response.json()

            // Add the new file to the list
            const newFile: FileInfo = {
                id: Date.now().toString(),
                name: file.name,
                size: formatFileSize(file.size),
                type: file.type,
                uploadedAt: new Date().toISOString().split("T")[0],
                url: URL.createObjectURL(file),
            }

            setFiles((prev) => [newFile, ...prev])
        } catch (error) {
            console.error("Error uploading file:", error)
            // Handle error (show toast, etc.)
        } finally {
            setIsUploading(false)
        }
    }

    const handleView = (file: FileInfo) => {
        // Solo permitir vista previa para imágenes y PDFs
        const viewableTypes = ["image/jpeg", "image/png", "image/gif", "image/svg+xml", "application/pdf"]
        if (viewableTypes.includes(file.type)) {
            setViewingFile(file)
        } else {
            // Para otros tipos de archivos, podríamos mostrar un mensaje o simplemente descargar
            handleDownload(file)
        }
    }

    const handleDownload = (file: FileInfo) => {
        // In a real app, this would trigger a download from your backend
        window.open(file.url, "_blank")
    }

    const handleDelete = (file: FileInfo) => {
        // In a real app, you would call your backend to delete the file
        setFiles((prev) => prev.filter((f) => f.id !== file.id))
    }

    return (
        <PageLayout title="File Manager" description="Upload, view and manage your files">
            <div className="grid gap-6">
                <FileUploadForm onUpload={handleUpload} isUploading={isUploading} />

                <div>
                    <h2 className="text-xl font-semibold mb-4">Your Files</h2>
                    <FileList files={files} onView={handleView} onDownload={handleDownload} onDelete={handleDelete} />
                </div>
            </div>

            {viewingFile && <FileViewerModal file={viewingFile} onClose={() => setViewingFile(null)} />}
        </PageLayout>
    )
}

// Helper function to format file size
function formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 Bytes"

    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i]
}
