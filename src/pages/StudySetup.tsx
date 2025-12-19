import { motion } from "framer-motion";
import { ArrowLeft, Play } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DifficultySelector } from "@/components/study/DifficultySelector";
import { MasteryLegend } from "@/components/study/MasteryBadge";
import { getVerseProgress } from "@/lib/progress-data";

// Mock data - will be replaced with real data later
const versesData: Record<string, { reference: string; text: string }> = {
  "1": {
    reference: "John 3:16",
    text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
  },
  "2": {
    reference: "Psalm 23:1",
    text: "The Lord is my shepherd, I lack nothing.",
  },
  "3": {
    reference: "Philippians 4:13",
    text: "I can do all this through him who gives me strength.",
  },
  "4": {
    reference: "Romans 8:28",
    text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
  },
  "5": {
    reference: "Psalm 46:1",
    text: "God is our refuge and strength, an ever-present help in trouble.",
  },
  "6": {
    reference: "Psalm 91:1-2",
    text: "Whoever dwells in the shelter of the Most High will rest in the shadow of the Almighty. I will say of the Lord, 'He is my refuge and my fortress, my God, in whom I trust.'",
  },
  "7": {
    reference: "Proverbs 3:5-6",
    text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
  },
};

type Difficulty = "easy" | "medium" | "hard";

const StudySetup = () => {
  const { verseId } = useParams<{ verseId: string }>();
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");

  const verse = versesData[verseId || ""] || { reference: "Unknown", text: "" };
  const progress = getVerseProgress(verseId || "");

  const handleStartStudy = () => {
    navigate(`/study/${verseId}?difficulty=${difficulty}`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 rounded-lg hover:bg-muted transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <h1 className="text-xl font-bold text-foreground">Study Setup</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-2xl mx-auto px-4 py-8 w-full">
        <div className="space-y-8">
          {/* Verse Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl p-6 shadow-elevation-2 border border-border/50"
          >
            <p className="text-sm font-medium text-primary mb-2">{verse.reference}</p>
            <p className="text-lg text-card-foreground leading-relaxed">{verse.text}</p>
          </motion.div>

          {/* Difficulty Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Choose Difficulty</h2>
              <MasteryLegend />
            </div>
            <DifficultySelector
              value={difficulty}
              onChange={setDifficulty}
              progress={progress}
            />
          </motion.div>

          {/* Difficulty descriptions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-muted/50 rounded-xl p-4"
          >
            {difficulty === "easy" && (
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Easy:</span> All words are visible. 
                Practice reading aloud to build familiarity.
              </p>
            )}
            {difficulty === "medium" && (
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Medium:</span> Some words are hidden. 
                Fill in the blanks from memory.
              </p>
            )}
            {difficulty === "hard" && (
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Hard:</span> Only the reference is shown. 
                Recite the entire verse from memory.
              </p>
            )}
          </motion.div>
        </div>
      </main>

      {/* Footer with Start Button */}
      <footer className="sticky bottom-0 bg-background/80 backdrop-blur-lg border-t border-border">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <Button
            onClick={handleStartStudy}
            size="lg"
            className="w-full gap-2 h-14 text-lg font-semibold"
          >
            <Play className="w-5 h-5" />
            Start Practice
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default StudySetup;
