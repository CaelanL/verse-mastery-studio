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

// Detect if a missing word followed by an added word is a substitution
function processWords(words: AlignmentWord[]): (AlignmentWord | { type: "substitution"; expected: string; actual: string })[] {
  const result: (AlignmentWord | { type: "substitution"; expected: string; actual: string })[] = [];
  let i = 0;

  while (i < words.length) {
    const current = words[i];
    const next = words[i + 1];

    // Check for substitution pattern: missing followed by added
    if (current.status === "missing" && next?.status === "added") {
      result.push({
        type: "substitution",
        expected: current.word,
        actual: next.word,
      });
      i += 2;
    } else {
      result.push(current);
      i++;
    }
  }

  return result;
}

function CorrectWord({ word }: { word: string }) {
  return (
    <span className="text-foreground">{word}</span>
  );
}

function MissingWord({ word }: { word: string }) {
  return (
    <span className="relative inline-block">
      <span className="text-destructive line-through decoration-destructive/60 opacity-70">
        {word}
      </span>
    </span>
  );
}

function AddedWord({ word }: { word: string }) {
  return (
    <span className="text-warning underline decoration-wavy decoration-warning/60 underline-offset-4">
      {word}
    </span>
  );
}

function SubstitutionWord({ expected, actual }: { expected: string; actual: string }) {
  return (
    <span className="inline-flex items-baseline gap-0.5">
      <span className="text-destructive/60 line-through text-sm">{expected}</span>
      <span className="text-warning font-medium">{actual}</span>
    </span>
  );
}

function CloseWord({ word, expected }: { word: string; expected?: string }) {
  return (
    <span 
      className="bg-warning/20 text-warning-foreground rounded px-0.5"
      title={expected ? `Expected: ${expected}` : undefined}
    >
      {word}
    </span>
  );
}

export function AlignmentText({ words, className }: AlignmentTextProps) {
  const processedWords = processWords(words);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className={cn("leading-relaxed text-base sm:text-lg", className)}
    >
      {processedWords.map((item, index) => (
        <span key={index}>
          {"type" in item ? (
            <SubstitutionWord expected={item.expected} actual={item.actual} />
          ) : item.status === "correct" ? (
            <CorrectWord word={item.word} />
          ) : item.status === "missing" ? (
            <MissingWord word={item.word} />
          ) : item.status === "added" ? (
            <AddedWord word={item.word} />
          ) : (
            <CloseWord word={item.word} expected={item.expected} />
          )}
          {index < processedWords.length - 1 && " "}
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
