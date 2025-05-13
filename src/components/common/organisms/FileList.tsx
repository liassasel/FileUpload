"use client"
import { Download, Eye, File, FileText, ImageIcon, Trash2 } from "lucide-react"
import { Button } from "@/components/common/atoms/Button"
import type { FileInfo } from "@/components/common/molecules/FileCard"

interface FileListProps {
    files: FileInfo[]
    onView?: (file: FileInfo) => void
    onDownload?: (file: FileInfo) => void
    onDelete?: (file: FileInfo) => void
}

export function FileList({ files, onView, onDownload, onDelete }: FileListProps) {
    if (files.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-center">
                <p className="text-muted-foreground mb-2">No files uploaded yet</p>
                <p className="text-sm text-muted-foreground">Upload files to see them here</p>
            </div>
        )
    }

    const getFileIcon = (fileType: string) => {
        if (fileType.startsWith("image/")) {
            return <ImageIcon className="h-5 w-5" />
        } else if (fileType === "application/pdf" || fileType.includes("text")) {
            return <FileText className="h-5 w-5" />
        } else {
            return <File className="h-5 w-5" />
        }
    }

    const isViewable = (fileType: string) => {
        const viewableTypes = ["image/jpeg", "image/png", "image/gif", "image/svg+xml", "application/pdf"]
        return viewableTypes.includes(fileType)
    }

    return (
        <div className="border rounded-md overflow-hidden">
            <div className="bg-muted/50 px-4 py-3 text-sm font-medium grid grid-cols-12 gap-4">
                <div className="col-span-5">Name</div>
                <div className="col-span-2">Size</div>
                <div className="col-span-2">Type</div>
                <div className="col-span-3 text-right pr-2">Actions</div>
            </div>
            <div className="divide-y">
                {files.map((file) => (
                    <div key={file.id} className="px-4 py-3 grid grid-cols-12 gap-4 items-center hover:bg-muted/30">
                        <div className="col-span-5 flex items-center gap-2 truncate">
                            {getFileIcon(file.type)}
                            <span className="truncate" title={file.name}>
                                {file.name}
                            </span>
                        </div>
                        <div className="col-span-2 text-sm text-muted-foreground">{file.size}</div>
                        <div className="col-span-2 text-sm text-muted-foreground truncate" title={file.type}>
                            {file.type.split("/")[1] || file.type}
                        </div>
                        <div className="col-span-3 flex items-center justify-end gap-2">
                            {isViewable(file.type) && onView && (
                                <Button variant="ghost" size="sm" onClick={() => onView(file)} title="View">
                                    <Eye className="h-4 w-4" />
                                    <span className="sr-only">View</span>
                                </Button>
                            )}
                            {onDownload && (
                                <Button variant="ghost" size="sm" onClick={() => onDownload(file)} title="Download">
                                    <Download className="h-4 w-4" />
                                    <span className="sr-only">Download</span>
                                </Button>
                            )}
                            {onDelete && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
                                    onClick={() => onDelete(file)}
                                    title="Delete"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">Delete</span>
                                </Button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
