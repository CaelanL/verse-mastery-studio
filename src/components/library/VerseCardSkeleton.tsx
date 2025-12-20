import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

interface VerseCardSkeletonProps {
  index?: number;
}

export function VerseCardSkeleton({ index = 0 }: VerseCardSkeletonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.3 }}
      className="bg-card rounded-xl p-4 shadow-elevation-1 border border-border/50"
    >
      <div className="flex items-start gap-3">
        {/* Icon skeleton */}
        <Skeleton className="w-10 h-10 rounded-lg flex-shrink-0" />
        
        <div className="flex-1 min-w-0 space-y-2">
          {/* Title skeleton */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-12" />
          </div>
          
          {/* Preview text skeleton */}
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </motion.div>
  );
}

export function VerseListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <VerseCardSkeleton key={i} index={i} />
      ))}
    </div>
  );
}
