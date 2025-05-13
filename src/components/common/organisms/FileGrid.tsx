import { type FileInfo, FileCard } from "@/components/common/molecules/FileCard"

interface FileGridProps {
    files: FileInfo[]
    onView?: (file: FileInfo) => void
    onDownload?: (file: FileInfo) => void
    onDelete?: (file: FileInfo) => void
}

export function FileGrid({ files, onView, onDownload, onDelete }: FileGridProps) {
    if (files.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-center">
                <p className="text-muted-foreground mb-2">No files uploaded yet</p>
                <p className="text-sm text-muted-foreground">Upload files to see them here</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {files.map((file) => (
                <FileCard key={file.id} file={file} onView={onView} onDownload={onDownload} onDelete={onDelete} />
            ))}
        </div>
    )
}
