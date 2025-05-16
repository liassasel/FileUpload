"use client"

import { useEffect, useState } from "react"
import { PageLayout } from "@/components/common/templates/PageLayout"
import { FileList } from "@/components/common/organisms/FileList"
import { FileUploadForm } from "@/components/features/FileUpload/FileUploadForm"
import { FileViewerModal } from "@/components/features/FileUpload/FileViewerModal"
import { FileInfo } from "@/interfaces"
import { toast } from "react-hot-toast"
import { deleteFile, fetchFiles, uploadFile } from "@/lib/api/FileUpload"

export function FileManagerPage() {
    const [files, setFiles] = useState<FileInfo[]>([])
    const [isUploading, setIsUploading] = useState(false)
    const [viewingFile, setViewingFile] = useState<FileInfo | null>(null)
    const [refreshKey, setRefreshKey] = useState(0)

    // Fetch files from backend
    useEffect(() => {
        const loadFiles = async () => {
            try {
                const response = await fetchFiles()
                const formattedFiles = response.map(file => ({
                    id: file.id.toString(),
                    name: file.original_name,
                    size: formatFileSize(file.file_size),
                    type: getMimeType(file.file_extension),
                    uploadedAt: new Date(file.uploaded_at).toLocaleDateString(),
                    url: `${process.env.NEXT_PUBLIC_API_URL}/api/download/${file.id}/`
                }))
                setFiles(formattedFiles)
            } catch (error) {
                toast.error("Error loading files")
                console.error("Error loading files:", error)
            }
        }
        loadFiles()
    }, [refreshKey])

    // Handle file upload
    const handleUpload = async (file: File) => {
        setIsUploading(true)
        try {
            const uploadedFile = await uploadFile(file)
            
            const newFile: FileInfo = {
                id: uploadedFile.id.toString(),
                name: uploadedFile.original_name,
                size: formatFileSize(uploadedFile.file_size),
                type: getMimeType(uploadedFile.file_extension),
                uploadedAt: new Date(uploadedFile.uploaded_at).toLocaleDateString(),
                url: `${process.env.NEXT_PUBLIC_API_URL}/api/download/${uploadedFile.id}/`
            }

            setFiles(prev => [newFile, ...prev])
            toast.success("File uploaded successfully!")
        } catch (error) {
            toast.error("Error uploading file")
            console.error("Upload error:", error)
        } finally {
            setIsUploading(false)
        }
    }

    // Handle file view
    const handleView = (file: FileInfo) => {
        const viewableTypes = [
            "image/jpeg", 
            "image/png", 
            "image/gif", 
            "image/svg+xml", 
            "application/pdf"
        ]
        
        if (viewableTypes.includes(file.type)) {
            setViewingFile(file)
        } else {
            handleDownload(file)
        }
    }

    // Handle file download
    const handleDownload = (file: FileInfo) => {
        const link = document.createElement('a')
        link.href = file.url
        link.setAttribute('download', file.name)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    // Handle file deletion
    const handleDelete = async (file: FileInfo) => {
        try {
            await deleteFile(file.id)
            setFiles(prev => prev.filter(f => f.id !== file.id))
            toast.success("File deleted successfully!")
        } catch (error) {
            toast.error("Error deleting file")
            console.error("Delete error:", error)
        }
    }

    return (
        <PageLayout 
            title="File Manager" 
            description="Upload, view and manage your files"
        >
            <div className="grid gap-8">
                <FileUploadForm 
                    onUpload={handleUpload} 
                    isUploading={isUploading} 
                    acceptedTypes="*"
                />
                
                <div className="bg-background rounded-lg shadow-sm">
                    <h2 className="text-2xl font-semibold mb-6 px-4 pt-4">
                        Uploaded Files
                    </h2>
                    <FileList 
                        files={files}
                        onView={handleView}
                        onDownload={handleDownload}
                        onDelete={handleDelete}
                    />
                </div>
            </div>

            {viewingFile && (
                <FileViewerModal
                    file={viewingFile}
                    onClose={() => setViewingFile(null)}
                    onDownload={handleDownload}
                />
            )}
        </PageLayout>
    )
}

// Helper function to format file size
const formatFileSize = (bytes: number): string => {
    const units = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${units[i]}`
}

// Helper function to get MIME type from extension
const getMimeType = (extension: string): string => {
    const typeMap: { [key: string]: string } = {
        png: 'image/png',
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        gif: 'image/gif',
        pdf: 'application/pdf',
        txt: 'text/plain',
        doc: 'application/msword',
        docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        xls: 'application/vnd.ms-excel',
        xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        zip: 'application/zip',
        rar: 'application/x-rar-compressed',
        mp4: 'video/mp4',
        mp3: 'audio/mpeg'
    }
    
    const cleanExtension = extension.toLowerCase().replace('.', '')
    return typeMap[cleanExtension] || 'application/octet-stream'
}