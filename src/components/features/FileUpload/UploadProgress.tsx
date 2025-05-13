import { Progress } from "@/components/common/atoms/Progress"
import { FileIcon, CheckCircle, XCircle } from "lucide-react"

interface UploadProgressProps {
    fileName: string
    progress: number
    status: "uploading" | "success" | "error"
    error?: string
}

export function UploadProgress({ fileName, progress, status, error }: UploadProgressProps) {
    return (
        <div className="border rounded-md p-4 mb-4">
            <div className="flex items-center gap-3 mb-2">
                <div className="bg-muted rounded-md p-2">
                    <FileIcon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="font-medium truncate" title={fileName}>
                        {fileName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {status === "uploading" && "Uploading..."}
                        {status === "success" && "Upload complete"}
                        {status === "error" && (error || "Upload failed")}
                    </p>
                </div>
                {status === "uploading" && <p className="text-sm font-medium">{progress}%</p>}
                {status === "success" && <CheckCircle className="h-5 w-5 text-green-500" />}
                {status === "error" && <XCircle className="h-5 w-5 text-destructive" />}
            </div>
            {status === "uploading" && <Progress value={progress} className="h-1" />}
        </div>
    )
}
