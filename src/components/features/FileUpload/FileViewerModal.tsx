"use client"

import { X } from "lucide-react"
import { Button } from "@/components/common/atoms/Button"
import { FileViewerModalProps } from "@/interfaces"

export function FileViewerModal({ file, onClose, onDownload }: FileViewerModalProps) {
    if (!file) return null

    const isImage = file.type.startsWith("image/")
    const isPdf = file.type === "application/pdf"

    const handleDownload = () => {
        onDownload(file)
        onClose()
    }

    return (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
            <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-4xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">{file.name}</h2>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </Button>
                </div>
                <div className="h-[60vh] overflow-auto border rounded-md p-2">
                    {isImage && (
                        <img src={file.url} alt={file.name} className="max-w-full h-auto mx-auto" />
                    )}
                    {isPdf && <iframe src={file.url} title={file.name} className="w-full h-full" />}
                    {!isImage && !isPdf && (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-muted-foreground">Preview not available for this file type</p>
                        </div>
                    )}
                </div>
                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={onClose}>
                        Close
                    </Button>
                    <Button onClick={handleDownload}>
                        Download
                    </Button>
                </div>
            </div>
        </div>
    )
}