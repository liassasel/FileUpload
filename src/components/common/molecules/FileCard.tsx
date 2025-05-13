"use client"

import * as React from "react"
import { Download, Eye, File, Trash2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "../atoms/Button"
import { Card, CardContent, CardFooter } from "../atoms/Card"
import { FileCardProps } from "@/interfaces"

export function FileCard({ file, onView, onDownload, onDelete, className }: FileCardProps) {
    const isViewable = React.useMemo(() => {
        const viewableTypes = ["image/jpeg", "image/png", "image/gif", "image/svg+xml", "application/pdf", "text/plain"]
        return viewableTypes.includes(file.type)
    }, [file.type])

    return (
        <Card className={cn("overflow-hidden", className)}>
            <div className="h-32 bg-muted flex items-center justify-center">
                <File className="h-16 w-16 text-muted-foreground" />
            </div>
            <CardContent className="p-4">
                <div className="space-y-1">
                    <h3 className="font-medium truncate" title={file.name}>
                        {file.name}
                    </h3>
                    <div className="text-xs text-muted-foreground">
                        <span>{file.size}</span>
                        <span className="mx-1">•</span>
                        <span>{file.uploadedAt}</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 gap-2 flex-wrap">
                {isViewable && onView && (
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => onView(file)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View
                    </Button>
                )}
                {onDownload && (
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => onDownload(file)}>
                        <Download className="h-4 w-4 mr-2" />
                        Download
                    </Button>
                )}
                {onDelete && (
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 text-destructive hover:text-destructive-foreground hover:bg-destructive"
                        onClick={() => onDelete(file)}
                    >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                    </Button>
                )}
            </CardFooter>
        </Card>
    )
}
