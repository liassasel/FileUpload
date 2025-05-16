import { badgeVariants } from "@/components/common/atoms/Badge";
import { buttonVariants } from "@/components/common/atoms/Button";
import { ToastType } from "@/hooks/UseToast";
import { VariantProps } from "class-variance-authority";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> { }

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

export interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    helperText?: string
    containerClassName?: string
}

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    value: number
    max?: number
}

export interface EmptyStateProps {
    title?: string
    description?: string
    actionLabel?: string
    onAction?: () => void
}

export interface FileInfo {
    id: string
    name: string
    size: string
    type: string
    uploadedAt: string
    url: string
}

export interface FileCardProps {
    file: FileInfo
    onView?: (file: FileInfo) => void
    onDownload?: (file: FileInfo) => void
    onDelete?: (file: FileInfo) => void
    className?: string
}

export interface FileTypeBadgeProps {
    fileType: string
    className?: string
}

export interface FileUploadDropzoneProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value"> {
    onFilesSelected: (files: FileList) => void
    value?: File | null
    helperText?: string
    maxSize?: number 
    accept?: string
    className?: string
}

export interface FileGridProps {
    files: FileInfo[]
    onView?: (file: FileInfo) => void
    onDownload?: (file: FileInfo) => void
    onDelete?: (file: FileInfo) => void
}

export interface FileListProps {
    files: FileInfo[]
    onView?: (file: FileInfo) => void
    onDownload?: (file: FileInfo) => void
    onDelete?: (file: FileInfo) => void
}

export interface FileUploadFormProps {
    onUpload: (file: File) => Promise<void>
    isUploading?: boolean
    acceptedTypes?: string
}

export interface FileViewerModalProps {
    file: FileInfo | null
    onClose: () => void
    onDownload: (file: FileInfo) => void
}

export interface UploadProgressProps {
    fileName: string
    progress: number
    status: "uploading" | "success" | "error"
    error?: string
}

export interface ToastOptions {
    title?: string
    description?: string
    type?: ToastType
    duration?: number
    id?: number
}

export interface FileResponse {
    id: string;
    original_name: string;
    file_size: number;
    file_extension: string;
    uploaded_at: string;
}