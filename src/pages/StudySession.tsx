import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, HelpCircle, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VerseCard } from "@/components/study/VerseCard";
import { AttemptCard } from "@/components/study/AttemptCard";
import { type AlignmentWord } from "@/components/study/AlignmentText";
import { RecordingButton } from "@/components/study/RecordingButton";
import { RecordingBar } from "@/components/study/RecordingBar";
import { ProgressIndicator } from "@/components/study/ProgressIndicator";
import { DifficultySelector } from "@/components/study/DifficultySelector";
import { AlignmentHelpModal } from "@/components/study/AlignmentHelpModal";

type Difficulty = "easy" | "medium" | "hard";

// Demo verse data
const DEMO_VERSE = {
  reference: "John 3:16",
  text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
};

// Mock alignment data for demo
const MOCK_ALIGNMENT: AlignmentWord[] = [
  { word: "For", status: "correct" },
  { word: "God", status: "correct" },
  { word: "so", status: "correct" },
  { word: "loved", status: "correct" },
  { word: "the", status: "correct" },
  { word: "world", status: "missing", expected: "world" },
  { word: "earth", status: "added" },
  { word: "that", status: "correct" },
  { word: "he", status: "correct" },
  { word: "gave", status: "correct" },
  { word: "his", status: "correct" },
  { word: "one", status: "correct" },
  { word: "and", status: "correct" },
  { word: "only", status: "missing", expected: "only" },
  { word: "Son,", status: "correct" },
  { word: "that", status: "correct" },
  { word: "whoever", status: "correct" },
  { word: "believes", status: "correct" },
  { word: "in", status: "correct" },
  { word: "him", status: "correct" },
  { word: "shall", status: "correct" },
  { word: "not", status: "correct" },
  { word: "perish", status: "correct" },
  { word: "but", status: "correct" },
  { word: "have", status: "correct" },
  { word: "eternal", status: "correct" },
  { word: "life.", status: "correct" },
];

interface Attempt {
  alignment: AlignmentWord[];
  accuracy: number;
  status: "success" | "partial" | "retry";
}

export default function StudySession() {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [showLegendHelp, setShowLegendHelp] = useState(false);

  const handleStartRecording = () => {
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setIsProcessing(true);

    // Simulate processing and add attempt with alignment
    setTimeout(() => {
      setIsProcessing(false);
      const accuracy = Math.floor(Math.random() * 30) + 70; // 70-100%
      
      setAttempts((prev) => [
        ...prev,
        {
          alignment: MOCK_ALIGNMENT,
          accuracy,
          status: accuracy >= 90 ? "success" : accuracy >= 70 ? "partial" : "retry",
        },
      ]);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <h1 className="text-lg font-semibold text-foreground">Study Session</h1>
          
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setShowLegendHelp(true)}
              className="text-muted-foreground hover:text-foreground"
            >
              <HelpCircle className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container max-w-2xl mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Progress */}
        <ProgressIndicator current={2} total={4} />

        {/* Difficulty selector */}
        <DifficultySelector value={difficulty} onChange={setDifficulty} />

        {/* Verse Card */}
        <VerseCard
          reference={DEMO_VERSE.reference}
          text={DEMO_VERSE.text}
          difficulty={difficulty}
        />

        {/* Attempts stack */}
        <AnimatePresence mode="popLayout">
          {attempts.map((attempt, index) => (
            <AttemptCard
              key={index}
              alignment={attempt.alignment}
              accuracy={attempt.accuracy}
              status={attempt.status}
            />
          ))}
        </AnimatePresence>
      </main>

      {/* Recording area - fixed at bottom */}
      <div className="sticky bottom-0 bg-gradient-to-t from-background via-background to-transparent pt-8 pb-8">
        <div className="container max-w-2xl mx-auto px-4">
          <AnimatePresence mode="wait">
            {isRecording || isProcessing ? (
              <RecordingBar
                key="recording-bar"
                isRecording={isRecording}
                isProcessing={isProcessing}
                onStop={handleStopRecording}
              />
            ) : (
              <motion.div
                key="recording-button"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="flex flex-col items-center gap-3"
              >
                <RecordingButton
                  isRecording={isRecording}
                  isProcessing={isProcessing}
                  onStartRecording={handleStartRecording}
                  onStopRecording={handleStopRecording}
                />
                <span className="text-sm text-muted-foreground">
                  Tap to start reciting
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Legend Help Modal */}
      <AlignmentHelpModal open={showLegendHelp} onClose={() => setShowLegendHelp(false)} />
    </div>
  );
}
