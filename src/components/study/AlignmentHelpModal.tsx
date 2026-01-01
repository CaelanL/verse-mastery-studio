import { motion, AnimatePresence } from "framer-motion";
import { X, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AlignmentText, type AlignmentWord } from "./AlignmentText";
import { cn } from "@/lib/utils";

interface AlignmentHelpModalProps {
  open: boolean;
  onClose: () => void;
}

// Example showing all 4 statuses with John 3:16
const EXAMPLE_ALIGNMENT: AlignmentWord[] = [
  { word: "For", status: "correct" },
  { word: "God", status: "correct" },
  { word: "so", status: "correct" },
  { word: "loved", status: "correct" },
  { word: "the", status: "correct" },
  { word: "world", status: "missing" },
  { word: "earth", status: "added" },
  { word: "that", status: "correct" },
  { word: "he", status: "correct" },
  { word: "gave", status: "correct" },
  { word: "his", status: "correct" },
  { word: "one", status: "correct" },
  { word: "and", status: "correct" },
  { word: "only", status: "missing" },
  { word: "Son", status: "close", expected: "Son," },
];

interface LegendItemProps {
  status: AlignmentWord["status"];
  title: string;
  description: string;
  example: string;
}

function LegendItem({ status, title, description, example }: LegendItemProps) {
  const getStatusStyles = () => {
    switch (status) {
      case "correct":
        return "bg-primary/10 border-primary/20";
      case "missing":
        return "bg-destructive/10 border-destructive/20";
      case "added":
        return "bg-warning/10 border-warning/20";
      case "close":
        return "bg-warning/10 border-warning/20";
    }
  };

  const getExampleElement = () => {
    switch (status) {
      case "correct":
        return <span className="text-foreground font-medium">{example}</span>;
      case "missing":
        return (
          <span className="text-destructive line-through decoration-destructive/60 opacity-70 font-medium">
            {example}
          </span>
        );
      case "added":
        return (
          <span className="text-warning underline decoration-wavy decoration-warning/60 underline-offset-4 font-medium">
            {example}
          </span>
        );
      case "close":
        return (
          <span className="bg-warning/20 text-warning-foreground rounded px-1 font-medium">
            {example}
          </span>
        );
    }
  };

  return (
    <div className={cn("rounded-lg border p-3 space-y-1.5", getStatusStyles())}>
      <div className="flex items-center gap-2">
        {getExampleElement()}
        <span className="text-sm font-semibold text-foreground">{title}</span>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

export function AlignmentHelpModal({ open, onClose }: AlignmentHelpModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 top-[10%] z-50 mx-auto max-w-md rounded-2xl bg-card border border-border shadow-xl max-h-[80vh] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">Understanding Your Results</h2>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground -mr-2"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5">
              {/* Example section */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Example: John 3:16</p>
                <div className="rounded-lg bg-muted/50 border border-border p-3">
                  <AlignmentText words={EXAMPLE_ALIGNMENT} className="text-base" />
                </div>
                <p className="text-xs text-muted-foreground italic">
                  In this example, you said "earth" instead of "world", skipped "only", and said "Son" without the comma.
                </p>
              </div>

              {/* Legend cards */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground">Legend</p>
                
                <LegendItem
                  status="correct"
                  title="Correct"
                  example="loved"
                  description="You said this word correctly — nice work!"
                />
                
                <LegendItem
                  status="missing"
                  title="Missed"
                  example="world"
                  description="This word was in the verse, but you skipped it or said something different."
                />
                
                <LegendItem
                  status="added"
                  title="Extra"
                  example="earth"
                  description="You said this word, but it wasn't in the original verse."
                />
                
                <LegendItem
                  status="close"
                  title="Almost"
                  example="Son"
                  description="Very close! You said something similar but not exact (e.g., missed punctuation)."
                />
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border">
              <Button onClick={onClose} className="w-full">
                Got it
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
