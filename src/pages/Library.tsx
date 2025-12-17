import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Heart, ChevronRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AddCollectionDialog from "@/components/library/AddCollectionDialog";
import { toast } from "@/hooks/use-toast";

interface Collection {
  id: string;
  name: string;
  verseCount: number;
  isDefault: boolean;
}

const initialCollections: Collection[] = [
  {
    id: "my-verses",
    name: "My Verses",
    verseCount: 12,
    isDefault: true,
  },
  {
    id: "psalms",
    name: "Psalms of Comfort",
    verseCount: 8,
    isDefault: false,
  },
  {
    id: "proverbs",
    name: "Wisdom from Proverbs",
    verseCount: 5,
    isDefault: false,
  },
];

const CollectionCard = ({
  collection,
  index,
}: {
  collection: Collection;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
    >
      <Link to={`/collection/${collection.id}`}>
        <div className="group relative bg-card rounded-xl p-5 shadow-elevation-2 hover:shadow-elevation-3 transition-all duration-200 border border-border/50 hover:border-primary/30">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  collection.isDefault
                    ? "bg-primary/10 text-primary"
                    : "bg-accent text-accent-foreground"
                }`}
              >
                {collection.isDefault ? (
                  <Heart className="w-6 h-6" />
                ) : (
                  <BookOpen className="w-6 h-6" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors">
                  {collection.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {collection.verseCount} verse{collection.verseCount !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const Library = () => {
  const [collections, setCollections] = useState<Collection[]>(initialCollections);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAddCollection = (name: string) => {
    const newCollection: Collection = {
      id: name.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now(),
      name,
      verseCount: 0,
      isDefault: false,
    };
    setCollections((prev) => [...prev, newCollection]);
    toast({
      title: "Collection created",
      description: `"${name}" has been added to your library.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">Library</h1>
            <Button size="sm" className="gap-2" onClick={() => setDialogOpen(true)}>
              <Plus className="w-4 h-4" />
              New Collection
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-4 py-6">
        <div className="space-y-3">
          {collections.map((collection, index) => (
            <CollectionCard key={collection.id} collection={collection} index={index} />
          ))}
        </div>

        {/* Empty state hint */}
        {collections.length === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center text-muted-foreground"
          >
            <p className="text-sm">
              Create collections to organize your verses by theme, book, or study plan.
            </p>
          </motion.div>
        )}
      </main>

      {/* Add Collection Dialog */}
      <AddCollectionDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onAdd={handleAddCollection}
      />
    </div>
  );
};

export default Library;
