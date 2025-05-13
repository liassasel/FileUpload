"use client"

import { ToastOptions } from "@/interfaces"
// Este archivo es un placeholder para el hook use-toast
// En una implementación real, este archivo contendría la lógica para mostrar notificaciones toast
// Para simplificar, solo exportamos un hook básico

import { useState } from "react"

export type ToastType = "default" | "success" | "error" | "warning" | "info"


export function useToast() {
    const [toasts, setToasts] = useState<ToastOptions[]>([])

    const toast = (options: ToastOptions) => {
        const id = Date.now()
        const newToast = {
            id,
            ...options,
            duration: options.duration || 5000,
        }

        setToasts((prev) => [...prev, newToast])

        // Auto dismiss
        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id))
        }, newToast.duration)

        return id
    }

    const dismiss = (id: number) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }

    return { toast, dismiss, toasts }
}
