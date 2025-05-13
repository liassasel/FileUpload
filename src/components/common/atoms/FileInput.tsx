"use client"

import * as React from "react"
import { UploadCloud } from "lucide-react"

import { cn } from "@/lib/utils"

interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    helperText?: string
    containerClassName?: string
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
    ({ className, label, helperText, containerClassName, ...props }, ref) => {
        const [fileName, setFileName] = React.useState<string>("")
        const inputRef = React.useRef<HTMLInputElement>(null)

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files.length > 0) {
                setFileName(e.target.files[0].name)
            } else {
                setFileName("")
            }

            if (props.onChange) {
                props.onChange(e)
            }
        }

        const handleClick = () => {
            inputRef.current?.click()
        }

        return (
            <div className={cn("space-y-2", containerClassName)}>
                {label && (
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {label}
                    </label>
                )}
                <div
                    onClick={handleClick}
                    className={cn(
                        "flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg cursor-pointer border-border hover:bg-accent/50 transition-colors",
                        className,
                    )}
                >
                    <UploadCloud className="w-10 h-10 mb-2 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    {fileName ? (
                        <p className="text-xs text-muted-foreground">{fileName}</p>
                    ) : (
                        <p className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF (MAX. 2MB)</p>
                    )}
                    <input ref={inputRef} type="file" className="hidden" onChange={handleChange} {...props} />
                </div>
                {helperText && <p className="text-xs text-muted-foreground">{helperText}</p>}
            </div>
        )
    },
)

FileInput.displayName = "FileInput"

export { FileInput }
