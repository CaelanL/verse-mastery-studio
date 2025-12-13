import { motion } from "framer-motion";
import { Square, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface RecordingBarProps {
  isRecording: boolean;
  isProcessing: boolean;
  onStop: () => void;
  className?: string;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function Waveform() {
  const bars = 12;
  return (
    <div className="flex items-center gap-0.5 h-8">
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-destructive-foreground/80 rounded-full"
          animate={{
            height: ["20%", "100%", "60%", "80%", "20%"],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function RecordingBar({ isRecording, isProcessing, onStop, className }: RecordingBarProps) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isRecording) {
      setSeconds(0);
      return;
    }

    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRecording]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "w-full max-w-md mx-auto px-4 py-3 rounded-2xl shadow-elevation-3 flex items-center gap-4",
        isProcessing ? "bg-muted" : "bg-destructive",
        className
      )}
    >
      {isProcessing ? (
        <>
          <Loader2 className="w-5 h-5 text-muted-foreground animate-spin" />
          <span className="flex-1 text-sm text-muted-foreground font-medium">
            Analyzing your recitation...
          </span>
        </>
      ) : (
        <>
          {/* Waveform */}
          <div className="flex-1">
            <Waveform />
          </div>

          {/* Timer */}
          <div className="text-destructive-foreground font-mono text-sm font-medium min-w-[3rem]">
            {formatTime(seconds)}
          </div>

          {/* Stop button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onStop}
            className="w-10 h-10 rounded-full bg-destructive-foreground/20 hover:bg-destructive-foreground/30 flex items-center justify-center transition-colors"
          >
            <Square className="w-4 h-4 text-destructive-foreground fill-current" />
          </motion.button>
        </>
      )}
    </motion.div>
  );
}
