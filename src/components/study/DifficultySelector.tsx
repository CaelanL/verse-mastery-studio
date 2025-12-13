import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Difficulty = "easy" | "medium" | "hard";

interface DifficultySelectorProps {
  value: Difficulty;
  onChange: (difficulty: Difficulty) => void;
  className?: string;
}

const difficulties: { value: Difficulty; label: string; description: string }[] = [
  { value: "easy", label: "Easy", description: "Full text" },
  { value: "medium", label: "Medium", description: "With blanks" },
  { value: "hard", label: "Hard", description: "No hints" },
];

export function DifficultySelector({ value, onChange, className }: DifficultySelectorProps) {
  return (
    <div className={cn("flex p-1 rounded-xl bg-secondary", className)}>
      {difficulties.map((difficulty) => (
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
          <span className="relative z-10">{difficulty.label}</span>
        </button>
      ))}
    </div>
  );
}
