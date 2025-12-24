import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, BookOpen, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Collection {
  id: string;
  name: string;
  verseCount: number;
  isDefault: boolean;
}

interface CollectionPickerProps {
  open: boolean;
  onClose: () => void;
  verseReference: string;
}

// Mock collections - in a real app this would come from state/context
const collections: Collection[] = [
  { id: "my-verses", name: "My Verses", verseCount: 12, isDefault: true },
  { id: "psalms", name: "Psalms of Comfort", verseCount: 8, isDefault: false },
  { id: "proverbs", name: "Wisdom from Proverbs", verseCount: 5, isDefault: false },
];

export function CollectionPicker({ open, onClose, verseReference }: CollectionPickerProps) {
  const handleSelectCollection = (collection: Collection) => {
    toast({
      title: "Added to collection",
      description: `${verseReference} has been added to "${collection.name}".`,
    });
    onClose();
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
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-[60] max-h-[70vh] overflow-hidden rounded-t-3xl bg-card"
          >
            <div className="flex flex-col p-6 pb-safe">
              {/* Handle bar */}
              <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-muted" />

              {/* Header */}
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">Add to Collection</h2>
                <button
                  onClick={onClose}
                  className="rounded-full bg-muted p-2 transition-colors hover:bg-muted/80"
                >
                  <X className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>

              {/* Collection List */}
              <div className="space-y-2 overflow-y-auto">
                {collections.map((collection) => (
                  <motion.button
                    key={collection.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectCollection(collection)}
                    className="flex w-full items-center gap-4 rounded-xl border border-border/50 bg-background p-4 text-left transition-colors hover:bg-accent/50"
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-lg ${
                        collection.isDefault
                          ? "bg-primary/10 text-primary"
                          : "bg-accent text-accent-foreground"
                      }`}
                    >
                      {collection.isDefault ? (
                        <Heart className="h-6 w-6" />
                      ) : (
                        <BookOpen className="h-6 w-6" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{collection.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {collection.verseCount} verse{collection.verseCount !== 1 ? "s" : ""}
                      </p>
                    </div>
                    <Check className="h-5 w-5 text-muted-foreground/30" />
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
