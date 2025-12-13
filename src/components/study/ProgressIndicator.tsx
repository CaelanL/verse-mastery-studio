import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressIndicatorProps {
  current: number;
  total: number;
  className?: string;
}

export function ProgressIndicator({ current, total, className }: ProgressIndicatorProps) {
  const progress = (current / total) * 100;

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-muted-foreground">
          Verse {current} of {total}
        </span>
        <span className="text-sm font-semibold text-primary">
          {Math.round(progress)}%
        </span>
      </div>
      
      <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute left-0 top-0 h-full bg-primary rounded-full"
        />
      </div>
    </div>
  );
}
