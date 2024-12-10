import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface DialogModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    url?: string;
    onPrev?: () => void;
    onNext?: () => void;
    hasPrev?: boolean;
    hasNext?: boolean;
}

export function DialogModal({
    open,
    setOpen,
    url,
    onPrev,
    onNext,
    hasPrev,
    hasNext,
}: DialogModalProps) {
    // Manejar cierre con Escape
    const handleEscapeKey = React.useCallback(
        (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setOpen(false);
            }
        },
        [setOpen]
    );

    // Añadir listener de teclado cuando el modal está abierto
    React.useEffect(() => {
        if (open) {
            document.addEventListener("keydown", handleEscapeKey);
            return () => {
                document.removeEventListener("keydown", handleEscapeKey);
            };
        }
    }, [open, handleEscapeKey]);

    // Función para manejar el cierre
    const handleClose = () => {
        setOpen(false);
    };

    const handleKeyboardNavigation = React.useCallback(
        (event: KeyboardEvent) => {
            // Cerrar con Escape
            if (event.key === "Escape") {
                setOpen(false);
            }

            // Navegar con flechas izquierda y derecha
            if (event.key === "ArrowLeft" && hasPrev) {
                onPrev?.();
            }

            if (event.key === "ArrowRight" && hasNext) {
                onNext?.();
            }
        },
        [setOpen, onPrev, onNext, hasPrev, hasNext]
    );

    // Añadir listener de teclado cuando el modal está abierto
    React.useEffect(() => {
        if (open) {
            document.addEventListener("keydown", handleKeyboardNavigation);
            return () => {
                document.removeEventListener(
                    "keydown",
                    handleKeyboardNavigation
                );
            };
        }
    }, [open, handleKeyboardNavigation]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent
                role="dialog"
                aria-modal="true"
                className="bg-transparent border-0 shadow-none max-w-4xl w-[90vw]"
            >
                {/* Botón de cierre */}
                <button
                    onClick={handleClose}
                    className="absolute right-4 top-[-30px] z-50 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none bg-white/30 p-1 rounded-full"
                    aria-label="Close"
                >
                    <X className="h-6 w-6 text-black" />
                    <span className="sr-only">Close</span>
                </button>

                {/* Botones de navegación */}
                {hasPrev && (
                    <button
                        onClick={onPrev}
                        className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-50 bg-white/30 p-2 rounded-full"
                        aria-label="Previous Image"
                    >
                        <ChevronLeft className="h-6 w-6 text-black" />
                    </button>
                )}

                {hasNext && (
                    <button
                        onClick={onNext}
                        className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-50 bg-white/30 p-2 rounded-full"
                        aria-label="Next Image"
                    >
                        <ChevronRight className="h-6 w-6 text-black" />
                    </button>
                )}

                {/* Imagen con animación */}
                <AnimatePresence mode="wait">
                    {url && (
                        <motion.div
                            key={url}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="relative w-full h-full flex justify-center items-center"
                        >
                            <Image
                                src={url}
                                alt="imagen del juego"
                                className="max-w-full max-h-[80vh] object-contain"
                                width={600}
                                height={400}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    );
}
