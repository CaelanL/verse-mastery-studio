import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { VerseProgress } from "@/lib/progress-data";

type Difficulty = "easy" | "medium" | "hard";

interface DifficultySelectorProps {
  value: Difficulty;
  onChange: (difficulty: Difficulty) => void;
  progress?: VerseProgress | null;
  className?: string;
}

const MASTERY_THRESHOLD = 90;

const difficulties: { value: Difficulty; label: string; description: string }[] = [
  { value: "easy", label: "Easy", description: "Full text" },
  { value: "medium", label: "Medium", description: "With blanks" },
  { value: "hard", label: "Hard", description: "No hints" },
];

function getMasteryBadge(difficulty: Difficulty, score: number | null) {
  if (score === null || score < MASTERY_THRESHOLD) return null;

  if (difficulty === "hard") {
    return <Check className="w-3.5 h-3.5 text-green-500" strokeWidth={3} />;
  }
  if (difficulty === "medium") {
    return <span className="w-2 h-2 rounded-full bg-blue-500" />;
  }
  if (difficulty === "easy") {
    return <span className="w-2 h-2 rounded-full bg-amber-400" />;
  }
  return null;
}

export function DifficultySelector({ value, onChange, progress, className }: DifficultySelectorProps) {
  const getScore = (difficulty: Difficulty): number | null => {
    if (!progress) return null;
    const diffProgress = progress[difficulty];
    return diffProgress?.bestScore ?? null;
  };

  return (
    <div className={cn("flex p-1 rounded-xl bg-secondary", className)}>
      {difficulties.map((difficulty) => {
        const score = getScore(difficulty.value);
        const badge = getMasteryBadge(difficulty.value, score);

        return (
          <button
            key={difficulty.value}
            onClick={() => onChange(difficulty.value)}
            className={cn(
              "relative flex-1 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors",
              value === difficulty.value
                ? "text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {value === difficulty.value && (
              <motion.div
                layoutId="difficulty-pill"
                className="absolute inset-0 bg-primary rounded-lg shadow-sm"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center justify-center gap-1.5">
              {badge}
              {difficulty.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
