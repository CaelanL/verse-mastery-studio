import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface AddVerseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (verse: { reference: string; text: string }) => void;
  collectionName?: string;
}

const AddVerseDialog = ({
  open,
  onOpenChange,
  onAdd,
  collectionName,
}: AddVerseDialogProps) => {
  const [reference, setReference] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reference.trim() && text.trim()) {
      onAdd({ reference: reference.trim(), text: text.trim() });
      setReference("");
      setText("");
      onOpenChange(false);
    }
  };

  const handleClose = () => {
    setReference("");
    setText("");
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
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 px-4"
          >
            <div className="bg-card rounded-2xl shadow-elevation-4 border border-border overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-card-foreground">
                      Add Verse
                    </h2>
                    {collectionName && (
                      <p className="text-sm text-muted-foreground">
                        to {collectionName}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="px-6 pb-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="verse-reference">Reference</Label>
                    <Input
                      id="verse-reference"
                      placeholder="e.g., John 3:16"
                      value={reference}
                      onChange={(e) => setReference(e.target.value)}
                      autoFocus
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="verse-text">Verse Text</Label>
                    <Textarea
                      id="verse-text"
                      placeholder="Enter the verse text..."
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      className="min-h-[120px] resize-none"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={!reference.trim() || !text.trim()}
                    className="flex-1"
                  >
                    Add Verse
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AddVerseDialog;
