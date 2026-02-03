import { cn } from "@/lib/utils/cn";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'text' | 'circular' | 'rectangular';
  className?: string;
  width?: string;
  height?: string;
}

function SkeletonBase({
  variant = 'default',
  className,
  width,
  height,
  ...props
}: SkeletonProps) {
  const variantClasses = {
    default: 'rounded-md',
    text: 'rounded h-4 w-full',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  const sizeStyles = width || height
    ? { width, height }
    : undefined;

  return (
    <div
      className={cn(
        "animate-pulse bg-white/10",
        variantClasses[variant],
        className
      )}
      style={sizeStyles}
      {...props}
    />
  );
}

export function Skeleton({ ...props }: SkeletonProps) {
  return <SkeletonBase {...props} />;
}

// Export specific skeleton types for convenience
export function TextSkeleton({ width = "100%", className }: { width?: string; className?: string }) {
  return <Skeleton variant="text" width={width} className={cn("h-4", className)} />;
}

export function AvatarSkeleton({ size = "md", className }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };
  return (
    <Skeleton
      variant="circular"
      className={cn(sizeClasses[size], className)}
    />
  );
}

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("bg-system-panel/50 border border-white/10 rounded-xl p-6", className)}>
      <div className="space-y-3">
        <Skeleton variant="rectangular" height="h-6" width="w-3/4" />
        <Skeleton variant="text" />
        <Skeleton variant="text" width="w-2/3" />
        <Skeleton variant="text" width="w-1/2" />
      </div>
    </div>
  );
}

export function ButtonSkeleton({ className }: { className?: string }) {
  return (
    <Skeleton
      variant="rectangular"
      height="h-10"
      width="w-24"
      className={cn("rounded-lg", className)}
    />
  );
}

export function TableSkeleton({ rows = 5, columns = 4, className }: { rows?: number; columns?: number; className?: string }) {
  return (
    <div className={cn("bg-system-panel/50 border border-white/10 rounded-xl overflow-hidden", className)}>
      {/* Header */}
      <div className="grid grid-cols-4 gap-4 p-4 border-b border-white/10 bg-white/5">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={`header-${i}`} variant="rectangular" height="h-6" />
        ))}
      </div>

      {/* Rows */}
      <div className="divide-y divide-white/10">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={`row-${rowIndex}`} className="grid grid-cols-4 gap-4 p-4 items-center">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <Skeleton key={`cell-${rowIndex}-${colIndex}`} variant="text" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// Export all from the simple Skeleton component too
export { SkeletonBase };
