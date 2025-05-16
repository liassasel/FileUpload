"use client"

import * as React from "react"
import { Button } from "@/components/common/atoms/Button"
import { FileInput } from "@/components/common/atoms/FileInput"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/common/atoms/Card"
import { FileUploadFormProps } from "@/interfaces"

export function FileUploadForm({
    onUpload,
    isUploading = false,
    acceptedTypes = "*"
}: FileUploadFormProps) {
    const [file, setFile] = React.useState<File | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0])
        } else {
            setFile(null)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (file) {
            await onUpload(file)
            setFile(null)
            const fileInput = document.getElementById("file-upload") as HTMLInputElement
            if (fileInput) {
                fileInput.value = ""
            }
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Upload File</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent>
                    <FileInput
                        id="file-upload"
                        onChange={handleFileChange}
                        helperText="Upload any file type up to 10MB"
                        accept={acceptedTypes}
                    />
                </CardContent>
                <CardFooter>
                    <Button
                        type="submit"
                        disabled={!file || isUploading}
                        className="w-full"
                    >
                        {isUploading ? "Uploading..." : "Upload File"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}