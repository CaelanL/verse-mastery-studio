import { Check, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { VerseProgress } from "@/lib/progress-data";
import { getHighestMastery, getEngravedStatus, isMastered } from "@/lib/progress-data";
import { MasteryBadge } from "./MasteryBadge";
import { format } from "date-fns";

interface ProgressCardProps {
  verseId: string;
  progress: VerseProgress | null;
  className?: string;
}

const MASTERY_THRESHOLD = 90;

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
  const highestMastery = getHighestMastery(verseId);
  const engravedStatus = getEngravedStatus(verseId);
  const hasMastered = isMastered(verseId);

  const getScore = (difficulty: Difficulty): number | null => {
    if (!progress) return null;
    return progress[difficulty]?.bestScore ?? null;
  };

  const getMasteryForDifficulty = (difficulty: Difficulty): boolean => {
    const score = getScore(difficulty);
    return score !== null && score >= MASTERY_THRESHOLD;
  };

  const getMasteryLabel = () => {
    if (highestMastery === "engraved") return "Engraved";
    if (highestMastery === "hard") return "Mastered";
    if (highestMastery === "medium") return "Medium";
    if (highestMastery === "easy") return "Easy";
    return "Not Started";
  };

  return (
    <div className={cn("bg-card rounded-2xl p-5 shadow-elevation-2 border border-border/50", className)}>
      <h3 className="text-sm font-medium text-muted-foreground mb-4">Your Progress</h3>
      
      {/* Current Status */}
      <div className="flex items-center gap-2 mb-5">
        <span className="text-sm text-muted-foreground">Status:</span>
        <div className="flex items-center gap-1.5">
          <MasteryBadge level={highestMastery} size="md" />
          <span className={cn(
            "text-sm font-medium",
            highestMastery === "engraved" && "text-purple-500",
            highestMastery === "hard" && "text-green-500",
            highestMastery === "medium" && "text-blue-500",
            highestMastery === "easy" && "text-amber-500",
            !highestMastery && "text-muted-foreground"
          )}>
            {getMasteryLabel()}
          </span>
        </div>
      </div>

      {/* Best Attempts */}
      <div className="space-y-2 mb-5">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Best Attempts</span>
        <div className="space-y-1.5">
          {(["easy", "medium", "hard"] as Difficulty[]).map((difficulty) => {
            const score = getScore(difficulty);
            const hasMastery = getMasteryForDifficulty(difficulty);
            
            return (
              <div key={difficulty} className="flex items-center justify-between py-1">
                <span className="text-sm text-foreground">{difficultyLabels[difficulty]}</span>
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "text-sm tabular-nums",
                    score !== null ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {score !== null ? `${score}%` : "—"}
                  </span>
                  {hasMastery && (
                    <MasteryBadge level={difficulty} size="sm" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Engraved Progress - only show if mastered or working toward engraved */}
      {(hasMastered || engravedStatus.monthsCompleted > 0) && (
        <div className="pt-4 border-t border-border/50">
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
            <div className="flex items-center gap-1.5">
              {Array.from({ length: engravedStatus.monthsRequired }).map((_, i) => {
                const isCompleted = i < engravedStatus.monthsCompleted;
                const monthLabel = engravedStatus.completedMonths[i];
                
                return (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div
                      className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors",
                        isCompleted
                          ? "bg-purple-500 border-purple-500"
                          : "bg-transparent border-muted-foreground/30"
                      )}
                    >
                      {isCompleted && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
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
