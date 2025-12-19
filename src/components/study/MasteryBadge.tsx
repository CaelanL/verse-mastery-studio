import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MasteryLevel } from "@/lib/progress-data";

interface MasteryBadgeProps {
  level: MasteryLevel;
  size?: "sm" | "md";
  className?: string;
}

export function MasteryBadge({ level, size = "md", className }: MasteryBadgeProps) {
  if (!level) return null;

  const sizeClasses = {
    sm: "w-2 h-2",
    md: "w-2.5 h-2.5",
  };

  const checkSizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
  };

  if (level === "hard") {
    return (
      <Check
        className={cn(
          "text-green-500",
          checkSizeClasses[size],
          className
        )}
        strokeWidth={3}
      />
    );
  }

  return (
    <span
      className={cn(
        "rounded-full inline-block",
        sizeClasses[size],
        level === "easy" && "bg-amber-400",
        level === "medium" && "bg-blue-500",
        className
      )}
    />
  );
}

export function MasteryLegend({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-4 text-xs text-muted-foreground", className)}>
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-amber-400" />
        <span>Easy</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-blue-500" />
        <span>Medium</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Check className="w-3 h-3 text-green-500" strokeWidth={3} />
        <span>Hard</span>
      </div>
    </div>
  );
}
