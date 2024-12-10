import React from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react"; // Importa el ícono de cierre
import Image from "next/image";

interface DialogModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    children?: React.ReactNode;
    title?: string;
    description?: string;
    url?: string;
}

export function DialogModal({
    open,
    setOpen,
    children,
    url,
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

    console.log("url", url);

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

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent
                // Añadir roles y atributos de accesibilidad
                role="dialog"
                aria-modal="true"
                aria-labelledby="dialog-title"
                aria-describedby="dialog-description"
                className="bg-transparent border-0 shadow-none"
            >
                {/* Botón de cierre accesible */}
                <button
                    onClick={handleClose}
                    className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
                    aria-label="Close"
                >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </button>

                <div className="grid gap-4 py-4">
                    <Image
                        src={url}
                        alt="imagen del juego"
                        className="w-full h-full"
                        width={600}
                        height={400}
                        style={{ objectFit: "contain" }}
                    />
                </div>

                <DialogFooter>
                    <Button
                        type="button"
                        variant="primary"
                        onClick={handleClose}
                    >
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
