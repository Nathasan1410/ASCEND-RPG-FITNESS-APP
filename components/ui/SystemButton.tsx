import { cn } from "@/lib/utils/cn";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface SystemButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  glow?: boolean;
}

const SystemButton = forwardRef<HTMLButtonElement, SystemButtonProps>(
  ({ className, variant = "primary", size = "md", glow = false, ...props }, ref) => {
    const variants = {
      primary: "bg-system-cyan text-white hover:bg-system-cyan/90 border-transparent font-bold tracking-wider",
      secondary: "bg-transparent text-system-cyan border-system-cyan/40 hover:bg-system-cyan/10",
      danger: "bg-transparent text-status-danger border-status-danger/40 hover:bg-status-danger/10",
      ghost: "bg-transparent text-white/60 hover:text-white border-transparent",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs",
      md: "px-6 py-3 text-sm",
      lg: "px-8 py-4 text-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none uppercase border",
          variants[variant],
          sizes[size],
          glow && "shadow-[0_0_20px_rgba(0,255,255,0.4)]",
          className
        )}
        {...props}
      />
    );
  }
);

SystemButton.displayName = "SystemButton";

export { SystemButton };
