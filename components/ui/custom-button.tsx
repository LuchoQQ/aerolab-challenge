import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            isActive: {
                true: "bg-[#6727A6] text-white hover:bg-[#6727A6]/90 font-bold", // Borde y sombra activos
                false: "bg-background text-[#6727A6] hover:bg-accent hover:text-[#6727A6] font-medium text-base border-none shadow-none", // Sin borde ni sombra cuando no está activo
            },
        },
        defaultVariants: {
            isActive: false,
        },
    }
);

export interface CustomButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    isActive?: boolean;
}

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
    ({ className, isActive, ...props }, ref) => {
        return (
            <Button
                className={cn(buttonVariants({ isActive }), className)}
                ref={ref}
                variant="destructive"
                {...props}
            />
        );
    }
);
CustomButton.displayName = "CustomButton";

export { CustomButton, buttonVariants };
