import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { DEFAULT_TRANSLATION } from "@/lib/translations";
import BibleBrowser from "./BibleBrowser";

interface AddVerseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (verse: { reference: string; text: string; translation: string }) => void;
  collectionName?: string;
  defaultTranslation?: string;
}

const AddVerseDialog = ({
  open,
  onOpenChange,
  onAdd,
  collectionName,
  defaultTranslation = DEFAULT_TRANSLATION,
}: AddVerseDialogProps) => {
  const handleSelect = (verse: { reference: string; text: string; translation: string }) => {
    onAdd(verse);
    onOpenChange(false);
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-50 h-[85vh] px-2 pb-2"
          >
            <div className="h-full bg-card rounded-t-3xl shadow-elevation-4 border border-border overflow-hidden flex flex-col">
              {/* Drag Handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
              </div>
              
              {/* Close button - mobile friendly */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-muted/80 hover:bg-muted transition-colors z-10"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>

              {/* Collection name badge */}
              {collectionName && (
                <div className="px-4 pb-2">
                  <span className="text-xs text-muted-foreground">
                    Adding to <span className="font-medium text-foreground">{collectionName}</span>
                  </span>
                </div>
              )}

              {/* Bible Browser */}
              <div className="flex-1 overflow-hidden">
                <BibleBrowser
                  onSelect={handleSelect}
                  onCancel={handleClose}
                  defaultTranslation={defaultTranslation}
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AddVerseDialog;
