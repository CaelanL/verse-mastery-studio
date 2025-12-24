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

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-hidden rounded-t-3xl"
          >
            {/* Background Image with Overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${verse.backgroundImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/50" />

            {/* Content */}
            <div className="relative flex flex-col p-6 pb-safe">
              {/* Handle bar */}
              <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-white/30" />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 rounded-full bg-white/10 p-2 backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                <X className="h-5 w-5 text-white" />
              </button>

              {/* Badge */}
              <div className="mb-6">
                <span className="inline-flex items-center rounded-full bg-primary/20 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm">
                  Verse of the Month
                </span>
              </div>

              {/* Verse Content */}
              <div className="mb-6">
                <p className="mb-4 text-2xl font-serif leading-relaxed text-white/95">
                  "{verse.text}"
                </p>
                <p className="text-lg font-medium text-white/80">
                  {verse.reference}
                  <span className="ml-2 text-sm text-white/50">({verse.translation})</span>
                </p>
              </div>

              {/* Stats */}
              <div className="mb-6 flex items-center gap-2 text-white/70">
                <Users className="h-4 w-4" />
                <span className="text-sm">
                  <strong className="text-white">{verse.masteryCount}</strong> people have mastered this verse
                </span>
              </div>

              {/* Add to Collection Button */}
              <Button
                size="lg"
                onClick={onAddToCollection}
                className="w-full gap-2 bg-primary hover:bg-primary/90"
              >
                <Plus className="h-5 w-5" />
                Add to Collection
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
