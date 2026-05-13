import { useEffect } from "react";
import { X } from "lucide-react";
import Button from "./Button";

export default function Modal({ isOpen, onClose, title, children }) {
  // إغلاق بالـ Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // منع الـ scroll لما الـ modal مفتوح
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal box */}
      <div className="relative bg-luxe-surface rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] w-full max-w-md z-10 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-luxe-text">{title}</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="!p-2 rounded-full"
          >
            <X size={18} />
          </Button>
        </div>

        {/* Content */}
        {children}
      </div>
    </div>
  );
}
