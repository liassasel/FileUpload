import { FileIcon, FileTextIcon, ImageIcon, FileArchiveIcon, FileAudioIcon, FileVideoIcon } from "lucide-react"
import { Badge } from "@/components/common/atoms/Badge"
import { cn } from "@/lib/utils"

interface FileTypeBadgeProps {
    fileType: string
    className?: string
}

export function FileTypeBadge({ fileType, className }: FileTypeBadgeProps) {
    const getFileTypeInfo = (type: string) => {
        if (type.startsWith("image/")) {
            return {
                label: "Image",
                icon: ImageIcon,
                variant: "default" as const,
            }
        } else if (type === "application/pdf") {
            return {
                label: "PDF",
                icon: FileTextIcon,
                variant: "secondary" as const,
            }
        } else if (type.includes("spreadsheet") || type.includes("excel") || type.includes("csv")) {
            return {
                label: "Spreadsheet",
                icon: FileTextIcon,
                variant: "outline" as const,
            }
        } else if (type.includes("document") || type.includes("word") || type.includes("text")) {
            return {
                label: "Document",
                icon: FileTextIcon,
                variant: "outline" as const,
            }
        } else if (type.includes("zip") || type.includes("compressed") || type.includes("archive")) {
            return {
                label: "Archive",
                icon: FileArchiveIcon,
                variant: "outline" as const,
            }
        } else if (type.includes("audio")) {
            return {
                label: "Audio",
                icon: FileAudioIcon,
                variant: "outline" as const,
            }
        } else if (type.includes("video")) {
            return {
                label: "Video",
                icon: FileVideoIcon,
                variant: "outline" as const,
            }
        } else {
            return {
                label: "File",
                icon: FileIcon,
                variant: "outline" as const,
            }
        }
    }

    const { label, icon: Icon, variant } = getFileTypeInfo(fileType)

    return (
        <Badge variant={variant} className={cn("gap-1", className)}>
            <Icon className="h-3 w-3" />
            <span>{label}</span>
        </Badge>
    )
}
