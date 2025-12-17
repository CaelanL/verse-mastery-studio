import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface AlignmentWord {
  word: string;
  status: "correct" | "missing" | "added" | "close";
  expected?: string;
}

interface AlignmentTextProps {
  words: AlignmentWord[];
  className?: string;
}

function Word({ word, status, expected }: AlignmentWord) {
  switch (status) {
    case "correct":
      return <span className="text-foreground">{word}</span>;
    case "missing":
      return (
        <span className="text-destructive line-through decoration-destructive/60 opacity-70">
          {word}
        </span>
      );
    case "added":
      return (
        <span className="text-warning underline decoration-wavy decoration-warning/60 underline-offset-4">
          {word}
        </span>
      );
    case "close":
      return (
        <span 
          className="bg-warning/20 text-warning-foreground rounded px-0.5"
          title={expected ? `Expected: ${expected}` : undefined}
        >
          {word}
        </span>
      );
  }
}

export function AlignmentText({ words, className }: AlignmentTextProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className={cn("leading-relaxed text-base sm:text-lg", className)}
    >
      {words.map((word, index) => (
        <span key={index}>
          <Word {...word} />
          {index < words.length - 1 && " "}
        </span>
      ))}
    </motion.div>
  );
}

// Legend component for explaining the colors
export function AlignmentLegend({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground", className)}>
      <span className="flex items-center gap-1">
        <span className="w-2 h-2 rounded-full bg-foreground/60" />
        Correct
      </span>
      <span className="flex items-center gap-1">
        <span className="w-2 h-2 rounded-full bg-destructive" />
        Missed
      </span>
      <span className="flex items-center gap-1">
        <span className="w-2 h-2 rounded-full bg-warning" />
        Extra
      </span>
    </div>
  );
}
