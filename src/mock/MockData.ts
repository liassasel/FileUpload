import { FileInfo } from "@/interfaces";

export const mockFiles: FileInfo[] = [
    {
        id: "1",
        name: "document.pdf",
        size: "2.5 MB",
        type: "application/pdf",
        uploadedAt: "2023-05-10",
        url: "/files/document.pdf",
    },
    {
        id: "2",
        name: "image.jpg",
        size: "1.2 MB",
        type: "image/jpeg",
        uploadedAt: "2023-05-09",
        url: "/placeholder.svg?height=400&width=600",
    },
    {
        id: "3",
        name: "spreadsheet.xlsx",
        size: "3.7 MB",
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        uploadedAt: "2023-05-08",
        url: "/files/spreadsheet.xlsx",
    },
]