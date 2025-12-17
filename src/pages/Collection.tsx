import { motion } from "framer-motion";
import { ArrowLeft, Plus, MoreVertical, BookOpen } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Mock data - will be replaced with real data later
const collectionsData: Record<string, { name: string; verses: Array<{ id: string; reference: string; preview: string }> }> = {
  "my-verses": {
    name: "My Verses",
    verses: [
      { id: "1", reference: "John 3:16", preview: "For God so loved the world that he gave his one and only Son..." },
      { id: "2", reference: "Psalm 23:1", preview: "The Lord is my shepherd, I lack nothing..." },
      { id: "3", reference: "Philippians 4:13", preview: "I can do all this through him who gives me strength..." },
      { id: "4", reference: "Romans 8:28", preview: "And we know that in all things God works for the good..." },
    ],
  },
  "psalms": {
    name: "Psalms of Comfort",
    verses: [
      { id: "5", reference: "Psalm 46:1", preview: "God is our refuge and strength, an ever-present help in trouble..." },
      { id: "6", reference: "Psalm 91:1-2", preview: "Whoever dwells in the shelter of the Most High..." },
    ],
  },
  "proverbs": {
    name: "Wisdom from Proverbs",
    verses: [
      { id: "7", reference: "Proverbs 3:5-6", preview: "Trust in the Lord with all your heart and lean not..." },
    ],
  },
};

const VerseCard = ({
  verse,
  index,
}: {
  verse: { id: string; reference: string; preview: string };
  index: number;
}) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.3 }}
    >
      <button
        onClick={() => navigate(`/setup/${verse.id}`)}
        className="w-full text-left group relative bg-card rounded-xl p-4 shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-200 border border-border/50 hover:border-primary/30"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-5 h-5 text-accent-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors">
              {verse.reference}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {verse.preview}
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              // TODO: Open options menu
            }}
            className="p-1 rounded-lg hover:bg-muted transition-colors opacity-0 group-hover:opacity-100"
          >
            <MoreVertical className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </button>
    </motion.div>
  );
};

const Collection = () => {
  const { collectionId } = useParams<{ collectionId: string }>();
  const collection = collectionsData[collectionId || ""] || { name: "Collection", verses: [] };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="p-2 -ml-2 rounded-lg hover:bg-muted transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-foreground" />
              </Link>
              <h1 className="text-xl font-bold text-foreground">{collection.name}</h1>
            </div>
            <Button size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Verse
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-4 py-6">
        {collection.verses.length > 0 ? (
          <div className="space-y-3">
            {collection.verses.map((verse, index) => (
              <VerseCard key={verse.id} verse={verse} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">No verses yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Add your first verse to start memorizing
            </p>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Verse
            </Button>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Collection;
