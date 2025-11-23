import { cn } from "@/lib/utils";

/**
 * Skeleton Loading Component
 * Provides visual feedback during content loading
 * Implements System Visibility principle from Nielsen's Heuristics
 */
function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="status"
      aria-label="Loading content"
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export { Skeleton };
