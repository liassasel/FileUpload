import { FileResponse } from "@/interfaces"
import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
    throw new Error("API_URL is not defined in .env file.");
}

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "multipart/form-data",
    },
})



export const uploadFile = async (file: File): Promise<FileResponse> => {
    const formData = new FormData()
    formData.append("file", file)

    try {
        const response = await api.post("/api/upload/", formData)
        return response.data
    } catch (error) {
        throw new Error(handleApiError(error))
    }
}

export const fetchFiles = async (): Promise<FileResponse[]> => {
    try {
        const response = await api.get("/api/files/")
        return response.data
    } catch (error) {
        throw new Error(handleApiError(error))
    }
}

export const deleteFile = async (fileId: string): Promise<void> => {
    try {
        await api.delete(`/api/files/${fileId}/`)
    } catch (error) {
        throw new Error(handleApiError(error))
    }
}

const handleApiError = (error: any): string => {
    if (axios.isAxiosError(error)) {
        return error.response?.data?.message || error.message
    }
    return "An unexpected error occurred"
}