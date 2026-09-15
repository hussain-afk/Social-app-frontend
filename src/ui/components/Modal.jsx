import React, { useEffect } from 'react';
import { X } from 'lucide-react';

function Modal({ isOpen, onClose, title, children }) {
    
    // Close modal on pressing 'Escape' key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.body.style.overflow = 'auto';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 font-sans">
            
            {/* ================= BACKDROP ================= */}
            <div 
                onClick={onClose}
                className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-fade-in"
            />

            {/* ================= MODAL CONTAINER ================= */}
            <div className="relative w-full max-w-lg overflow-hidden rounded-[28px] border border-white/10 bg-[#121214] shadow-[0_25px_70px_rgba(0,0,0,0.6)] backdrop-blur-xl z-10 animate-scale-up">
                
                {/* Modal Header */}
                <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                    <h3 className="text-sm font-black tracking-tight text-white/90">
                        {title || "Modal Title"}
                    </h3>

                    <button 
                        onClick={onClose}
                        className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/60 hover:bg-white hover:text-black hover:border-white transition-all active:scale-95"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Modal Body / Content */}
                <div className="p-6 max-h-[80vh] overflow-y-auto">
                    {children}
                </div>

            </div>

        </div>
    );
}

export default Modal;