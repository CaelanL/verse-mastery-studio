import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Check, RefreshCw } from "lucide-react";
import { AlignmentText, AlignmentLegend, type AlignmentWord } from "./AlignmentText";

interface AttemptCardProps {
  transcription?: string;
  alignment?: AlignmentWord[];
  accuracy?: number;
  status: "success" | "partial" | "retry" | "pending";
  className?: string;
}

const statusConfig = {
  success: {
    icon: Check,
    label: "Perfect!",
    bgClass: "bg-success/10",
    borderClass: "border-success/30",
    iconClass: "text-success",
    textClass: "text-success",
  },
  partial: {
    icon: Check,
    label: "Good effort!",
    bgClass: "bg-warning/10",
    borderClass: "border-warning/30",
    iconClass: "text-warning",
    textClass: "text-warning",
  },
  retry: {
    icon: RefreshCw,
    label: "Try again",
    bgClass: "bg-destructive/10",
    borderClass: "border-destructive/30",
    iconClass: "text-destructive",
    textClass: "text-destructive",
  },
  pending: {
    icon: null,
    label: "Your attempt",
    bgClass: "bg-muted/50",
    borderClass: "border-border",
    iconClass: "text-muted-foreground",
    textClass: "text-muted-foreground",
  },
};

export function AttemptCard({ transcription, alignment, accuracy, status, className }: AttemptCardProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.4, 
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.1
      }}
      className={cn("w-full", className)}
    >
      <Card className={cn(
        "overflow-hidden border shadow-elevation-2 transition-all duration-300",
        config.bgClass,
        config.borderClass
      )}>
        <CardContent className="p-5 sm:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {Icon && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 400 }}
                >
                  <Icon className={cn("w-5 h-5", config.iconClass)} />
                </motion.div>
              )}
              <span className={cn("text-sm font-medium", config.textClass)}>
                {config.label}
              </span>
            </div>

            {accuracy !== undefined && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className={cn(
                  "px-2.5 py-1 rounded-full text-xs font-semibold",
                  accuracy >= 90 ? "bg-success/20 text-success" :
                  accuracy >= 70 ? "bg-warning/20 text-warning" :
                  "bg-destructive/20 text-destructive"
                )}
              >
                {accuracy}% match
              </motion.div>
            )}
          </div>

          {/* Alignment or plain transcription */}
          {alignment ? (
            <div className="space-y-3">
              <AlignmentText words={alignment} />
              <AlignmentLegend className="pt-2 border-t border-border/50" />
            </div>
          ) : transcription ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg leading-relaxed text-card-foreground"
            >
              "{transcription}"
            </motion.p>
          ) : null}
        </CardContent>
      </Card>
    </motion.div>
  );
}
