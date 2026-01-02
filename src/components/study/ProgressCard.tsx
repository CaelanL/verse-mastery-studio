import { X, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { VerseProgress } from "@/lib/progress-data";
import { getEngravedStatus, isMastered } from "@/lib/progress-data";
import { format } from "date-fns";

interface ProgressCardProps {
  verseId: string;
  progress: VerseProgress | null;
  className?: string;
}

type Difficulty = "easy" | "medium" | "hard";

const difficultyLabels: Record<Difficulty, string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

function getMonthLabel(monthStr: string): string {
  const [year, month] = monthStr.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return format(date, "MMM");
}

export function ProgressCard({ verseId, progress, className }: ProgressCardProps) {
  const engravedStatus = getEngravedStatus(verseId);
  const hasMastered = isMastered(verseId);

  const getScore = (difficulty: Difficulty): number | null => {
    if (!progress) return null;
    return progress[difficulty]?.bestScore ?? null;
  };

  return (
    <div className={cn("space-y-5", className)}>
      {/* Best Attempts - Horizontal columns with lines */}
      <div>
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3 block">
          Best Attempts
        </span>
        <div className="flex items-stretch divide-x divide-border">
          {(["easy", "medium", "hard"] as Difficulty[]).map((difficulty) => {
            const score = getScore(difficulty);
            
            return (
              <div key={difficulty} className="flex-1 flex flex-col items-center py-3 first:pl-0 last:pr-0 px-4">
                <span className="text-xs text-muted-foreground mb-1">{difficultyLabels[difficulty]}</span>
                <span className={cn(
                  "text-lg font-semibold tabular-nums",
                  score !== null ? "text-foreground" : "text-muted-foreground/50"
                )}>
                  {score !== null ? `${score}%` : "—"}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Engraved Progress - Connected bar with circles */}
      {(hasMastered || engravedStatus.monthsCompleted > 0) && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Engraved Progress
            </span>
            <span className="text-xs text-muted-foreground">
              {engravedStatus.monthsCompleted} of {engravedStatus.monthsRequired} months
            </span>
          </div>
          
          {engravedStatus.isEngraved ? (
            <div className="flex items-center gap-2 text-purple-500">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-medium">Engraved!</span>
            </div>
          ) : (
            <div className="relative flex items-center justify-between">
              {/* Connecting line */}
              <div className="absolute top-1/2 left-3 right-3 h-0.5 bg-border -translate-y-1/2 -mt-3" />
              
              {Array.from({ length: engravedStatus.monthsRequired }).map((_, i) => {
                const isCompleted = i < engravedStatus.monthsCompleted;
                const monthLabel = engravedStatus.completedMonths[i];
                
                return (
                  <div key={i} className="relative z-10 flex flex-col items-center gap-1.5">
                    <div
                      className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors",
                        isCompleted
                          ? "bg-purple-500 border-purple-500"
                          : "bg-background border-muted-foreground/30"
                      )}
                    >
                      {isCompleted && <X className="w-3 h-3 text-white" strokeWidth={3} />}
                    </div>
                    <span className="text-[10px] text-muted-foreground">
                      {monthLabel ? getMonthLabel(monthLabel) : `M${i + 1}`}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
