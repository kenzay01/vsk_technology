// Toaster.tsx - Виправлений код
"use client";

import { useState, useEffect } from "react";

interface Toast {
  id: string;
  message: string;
  type: "success" | "error";
}

interface ToasterProps {
  addToast: React.MutableRefObject<
    (message: string, type: "success" | "error") => void
  >;
}

export function Toaster({ addToast }: ToasterProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Generate a unique ID for each toast
  const generateId = () => Math.random().toString(36).substr(2, 9);

  // Add a new toast
  const handleAddToast = (message: string, type: "success" | "error") => {
    const newToast: Toast = { id: generateId(), message, type };
    setToasts((prev) => [...prev, newToast]);
  };

  // Remove a toast by ID
  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  // Expose addToast function to parent components
  useEffect(() => {
    addToast.current = handleAddToast;
  }, [addToast]);

  // Auto-dismiss toasts after 5 seconds
  useEffect(() => {
    const timers = toasts.map((toast) =>
      setTimeout(() => removeToast(toast.id), 5000)
    );
    return () => timers.forEach((timer) => clearTimeout(timer));
  }, [toasts]);

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center justify-between p-4 rounded-md shadow-md max-w-sm w-full transition-opacity duration-300 ${
            toast.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          <span>{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-4 text-white hover:text-gray-200 focus:outline-none"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
