
import { useEffect, useState } from "react"

interface PopupMessageProps {
    message: string
    type?: "success" | "error" | "info"
    setMessage: (value: string) => void
}

export function PopupMessage({ message, type = "success", setMessage }: PopupMessageProps) {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (message) {
            setVisible(true)

            const timer = setTimeout(() => {
                setVisible(false)
                setTimeout(() => setMessage(""), 300) // بعد ما يخلص الترانزيشن
            }, 3000)

            return () => clearTimeout(timer)
        }
    }, [message, setMessage])

    const colors = {
        success: "bg-green-600",
        error: "bg-red-600",
        info: "bg-blue-600",
    }

    if (!message) return null

    return (
        <div
            className={`fixed bottom-6 right-6 text-white px-5 py-3 rounded-lg shadow-lg font-medium transition-all duration-300 transform
      ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
      ${colors[type]}`}
        >
            {message}
        </div>
    )
}
