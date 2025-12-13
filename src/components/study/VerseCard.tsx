import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Difficulty = "easy" | "medium" | "hard";

interface VerseCardProps {
  reference: string;
  text: string;
  difficulty: Difficulty;
  className?: string;
}

const BlankWord = ({ word, index }: { word: string; index: number }) => (
  <motion.span
    initial={{ opacity: 0, y: 5 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.03 }}
    className="inline-flex items-center mx-0.5"
  >
    <span className="border-b-2 border-dashed border-primary/40 px-1 min-w-[3ch] text-transparent select-none">
      {word}
    </span>
  </motion.span>
);

const VisibleWord = ({ word, index }: { word: string; index: number }) => (
  <motion.span
    initial={{ opacity: 0, y: 5 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.02 }}
    className="inline mx-0.5"
  >
    {word}
  </motion.span>
);

export function VerseCard({ reference, text, difficulty, className }: VerseCardProps) {
  const words = text.split(" ");
  
  // For medium difficulty, hide every 3rd and 4th word
  const renderMediumText = () => {
    return words.map((word, index) => {
      const shouldHide = index % 4 === 2 || index % 4 === 3;
      return shouldHide ? (
        <BlankWord key={index} word={word} index={index} />
      ) : (
        <VisibleWord key={index} word={word} index={index} />
      );
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn("w-full", className)}
    >
      <Card className="overflow-hidden border-0 shadow-elevation-3 bg-card">
        <CardContent className="p-6 sm:p-8">
          {/* Reference Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            {reference}
          </motion.div>

          {/* Verse Content */}
          <div className="text-lg sm:text-xl leading-relaxed text-card-foreground">
            {difficulty === "easy" && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {words.map((word, index) => (
                  <VisibleWord key={index} word={word} index={index} />
                ))}
              </motion.p>
            )}

            {difficulty === "medium" && (
              <p className="leading-loose">{renderMediumText()}</p>
            )}

            {difficulty === "hard" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-center justify-center py-8 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <p className="text-muted-foreground text-base">
                  Recite the verse from memory
                </p>
              </motion.div>
            )}
          </div>

          {/* Difficulty Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 flex items-center gap-2"
          >
            <span className="text-xs text-muted-foreground uppercase tracking-wider">Difficulty</span>
            <div className="flex gap-1">
              {["easy", "medium", "hard"].map((level, i) => (
                <div
                  key={level}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors",
                    i <= ["easy", "medium", "hard"].indexOf(difficulty)
                      ? "bg-primary"
                      : "bg-muted"
                  )}
                />
              ))}
            </div>
            <span className="text-xs font-medium text-primary capitalize">{difficulty}</span>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
