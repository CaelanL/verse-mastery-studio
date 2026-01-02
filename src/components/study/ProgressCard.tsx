import { Cross, Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { VerseProgress } from "@/lib/progress-data";
import { getEngravedStatus, isMastered } from "@/lib/progress-data";
import { format, addMonths } from "date-fns";

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

function getFutureMonthLabel(monthsFromNow: number): string {
  const futureDate = addMonths(new Date(), monthsFromNow);
  return format(futureDate, "MMM");
}

export function ProgressCard({ verseId, progress, className }: ProgressCardProps) {
  const engravedStatus = getEngravedStatus(verseId);
  const hasMastered = isMastered(verseId);

  const getScore = (difficulty: Difficulty): number | null => {
    if (!progress) return null;
    return progress[difficulty]?.bestScore ?? null;
  };

  return (
    <div className={cn("space-y-3", className)}>
      <h2 className="text-lg font-semibold text-foreground">Your Progress</h2>
      <div className="bg-card rounded-2xl p-4 shadow-elevation-2 border border-border/50 space-y-4">
        {/* Best scores - Horizontal columns with lines */}
        <div className="flex items-stretch divide-x divide-border">
          {(["easy", "medium", "hard"] as Difficulty[]).map((difficulty) => {
            const score = getScore(difficulty);
            
            return (
              <div key={difficulty} className="flex-1 flex flex-col items-center py-2 first:pl-0 last:pr-0 px-4">
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

        {/* Engraved Progress - Connected bar with circles */}
        {(hasMastered || engravedStatus.monthsCompleted > 0) && (
          <div className="pt-4 border-t border-border/50">
            <div className="flex items-center justify-center gap-1.5 mb-3">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {engravedStatus.isEngraved ? "Engraved" : "Engraved Progress"}
              </span>
              {engravedStatus.isEngraved ? (
                <div className="relative">
                  <Cross className="w-4 h-4 text-amber-500 drop-shadow-[0_0_6px_rgba(245,158,11,0.6)]" />
                  <Sparkles className="absolute -top-1 -right-2 w-3 h-3 text-amber-400 animate-pulse" />
                </div>
              ) : (
                <Cross className="w-4 h-4 text-purple-500" />
              )}
            </div>
            
            {/* Shimmer background when fully engraved */}
            <div className={cn(
              "relative rounded-lg p-3 -mx-1",
              engravedStatus.isEngraved && "bg-gradient-to-r from-amber-500/5 via-yellow-400/10 to-amber-500/5"
            )}>
              <div className="relative flex items-center justify-between">
                {/* Connecting line */}
                <div className={cn(
                  "absolute top-1/2 left-3 right-3 h-0.5 -translate-y-1/2 -mt-3",
                  engravedStatus.isEngraved 
                    ? "bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.4)]" 
                    : "bg-border"
                )} />
                
                {Array.from({ length: engravedStatus.monthsRequired }).map((_, i) => {
                  const isCompleted = i < engravedStatus.monthsCompleted;
                  const monthLabel = engravedStatus.completedMonths[i];
                  const isGolden = engravedStatus.isEngraved && isCompleted;
                  
                  return (
                    <div key={i} className="relative z-10 flex flex-col items-center gap-1.5">
                      <div
                        className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors",
                          isGolden
                            ? "bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 border-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                            : isCompleted
                              ? "bg-purple-500 border-purple-500"
                              : "bg-background border-muted-foreground/30"
                        )}
                      >
                        {isCompleted && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                      </div>
                      <span className={cn(
                        "text-[10px]",
                        isGolden ? "text-amber-600 font-medium" : "text-muted-foreground"
                      )}>
                        {monthLabel ? getMonthLabel(monthLabel) : getFutureMonthLabel(i)}
                      </span>
                    </div>
                  );
                })}
              </div>
              
              {/* "Forever in your heart" tagline when engraved */}
              {engravedStatus.isEngraved && (
                <p className="text-center text-[10px] text-amber-600/70 mt-3 tracking-wide">
                  Forever in your heart
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}