"use client"

import { FolderUp } from "lucide-react"
import { Button } from "@/components/common/atoms/Button"
import { EmptyStateProps } from "@/interfaces"


export function EmptyState({
    title = "No files uploaded",
    description = "Upload files to see them here",
    actionLabel = "Upload a file",
    onAction,
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center h-64 text-center p-6 border-2 border-dashed rounded-lg border-border">
            <FolderUp className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{description}</p>
            {onAction && <Button onClick={onAction}>{actionLabel}</Button>}
        </div>
    )
}
