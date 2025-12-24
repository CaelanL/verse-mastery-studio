import { motion, AnimatePresence } from "framer-motion";
import { X, Users, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { VerseOfMonth } from "@/lib/verse-of-month";

interface VerseOfMonthModalProps {
  open: boolean;
  onClose: () => void;
  verse: VerseOfMonth;
  onAddToCollection: () => void;
}

export function VerseOfMonthModal({
  open,
  onClose,
  verse,
  onAddToCollection,
}: VerseOfMonthModalProps) {
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
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Centered Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 400 }}
              className="relative w-full max-w-md overflow-hidden rounded-2xl shadow-xl pointer-events-auto"
            >
              {/* Background Image with Overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${verse.backgroundImage})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />

              {/* Content */}
              <div className="relative flex flex-col p-6">
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute right-3 top-3 rounded-full bg-white/10 p-2 backdrop-blur-sm transition-colors hover:bg-white/20"
                >
                  <X className="h-5 w-5 text-white" />
                </button>

                {/* Badge */}
                <div className="mb-5">
                  <span className="inline-flex items-center rounded-full bg-primary/20 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm">
                    Verse of the Month
                  </span>
                </div>

                {/* Verse Content */}
                <div className="mb-5">
                  <p className="mb-3 text-xl font-serif leading-relaxed text-white">
                    "{verse.text}"
                  </p>
                  <p className="text-base font-medium text-white/80">
                    {verse.reference}
                    <span className="ml-2 text-sm text-white/50">({verse.translation})</span>
                  </p>
                </div>

                {/* Stats */}
                <div className="mb-5 flex items-center gap-2 text-white/70">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">
                    <strong className="text-white">{verse.masteryCount}</strong> people have mastered this verse
                  </span>
                </div>

                {/* Add to Collection Button */}
                <Button
                  size="lg"
                  onClick={onAddToCollection}
                  className="w-full gap-2"
                >
                  <Plus className="h-5 w-5" />
                  Add to Collection
                </Button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
