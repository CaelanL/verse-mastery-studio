import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Plus, MoreVertical, BookOpen } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AddVerseDialog from "@/components/library/AddVerseDialog";
import { toast } from "@/hooks/use-toast";
import { DEFAULT_TRANSLATION } from "@/lib/translations";
import { MasteryBadge } from "@/components/study/MasteryBadge";
import { getHighestMastery } from "@/lib/progress-data";
import { VerseListSkeleton } from "@/components/library/VerseCardSkeleton";
import { ConnectionError } from "@/components/library/ConnectionError";

interface Verse {
  id: string;
  reference: string;
  preview: string;
  translation: string;
}

interface CollectionData {
  name: string;
  verses: Verse[];
}

// Mock data - will be replaced with real data later
const collectionsDatabase: Record<string, CollectionData> = {
  "my-verses": {
    name: "My Verses",
    verses: [
      { id: "1", reference: "John 3:16", preview: "For God so loved the world that he gave his one and only Son...", translation: "ESV" },
      { id: "2", reference: "Psalm 23:1", preview: "The Lord is my shepherd, I lack nothing...", translation: "NIV" },
      { id: "3", reference: "Philippians 4:13", preview: "I can do all this through him who gives me strength...", translation: "ESV" },
      { id: "4", reference: "Romans 8:28", preview: "And we know that in all things God works for the good...", translation: "NLT" },
    ],
  },
  "psalms": {
    name: "Psalms of Comfort",
    verses: [
      { id: "5", reference: "Psalm 46:1", preview: "God is our refuge and strength, an ever-present help in trouble...", translation: "ESV" },
      { id: "6", reference: "Psalm 91:1-2", preview: "Whoever dwells in the shelter of the Most High...", translation: "ESV" },
    ],
  },
  "proverbs": {
    name: "Wisdom from Proverbs",
    verses: [
      { id: "7", reference: "Proverbs 3:5-6", preview: "Trust in the Lord with all your heart and lean not...", translation: "KJV" },
    ],
  },
};

// Simulate API call - replace with real API later
const fetchCollectionData = async (collectionId: string): Promise<CollectionData> => {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const data = collectionsDatabase[collectionId];
  if (!data) {
    return { name: "Collection", verses: [] };
  }
  return data;
};

const VerseCard = ({
  verse,
  index,
}: {
  verse: Verse;
  index: number;
}) => {
  const navigate = useNavigate();
  const masteryLevel = getHighestMastery(verse.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.3 }}
    >
      <div
        onClick={() => navigate(`/setup/${verse.id}`)}
        className="w-full text-left group relative bg-card rounded-xl p-4 shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-200 border border-border/50 hover:border-primary/30 cursor-pointer"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-5 h-5 text-accent-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
              {verse.reference}
              <span className="text-muted-foreground font-normal"> • {verse.translation}</span>
              {masteryLevel && (
                <MasteryBadge level={masteryLevel} size="sm" className="ml-1" />
              )}
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
      </div>
    </motion.div>
  );
};

type LoadState = "loading" | "success" | "error";

const Collection = () => {
  const { collectionId } = useParams<{ collectionId: string }>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [collectionName, setCollectionName] = useState("Collection");
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [retryCount, setRetryCount] = useState(0);
  
  const globalTranslation = DEFAULT_TRANSLATION;

  // Load collection data
  useEffect(() => {
    if (!collectionId) return;

    let cancelled = false;
    setLoadState("loading");

    const loadData = async () => {
      try {
        const data = await fetchCollectionData(collectionId);
        if (!cancelled) {
          setCollectionName(data.name);
          setVerses(data.verses);
          setLoadState("success");
        }
      } catch {
        if (!cancelled) {
          setLoadState("error");
        }
      }
    };

    loadData();

    return () => {
      cancelled = true;
    };
  }, [collectionId, retryCount]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  const handleAddVerse = (verse: { reference: string; text: string; translation: string }) => {
    if (!collectionId) return;
    
    const newVerse: Verse = {
      id: Date.now().toString(),
      reference: verse.reference,
      preview: verse.text.length > 80 ? verse.text.slice(0, 80) + "..." : verse.text,
      translation: verse.translation,
    };
    
    setVerses(prev => [...prev, newVerse]);
    
    toast({
      title: "Verse added",
      description: `${verse.reference} (${verse.translation}) has been added to ${collectionName}.`,
    });
  };

  const renderContent = () => {
    if (loadState === "loading") {
      return <VerseListSkeleton count={4} />;
    }

    if (loadState === "error") {
      return (
        <ConnectionError 
          onRetry={handleRetry}
          message="Unable to load verses. Please check your connection and try again."
          type="connection"
        />
      );
    }

    if (verses.length > 0) {
      return (
        <div className="space-y-3">
          {verses.map((verse, index) => (
            <VerseCard key={verse.id} verse={verse} index={index} />
          ))}
        </div>
      );
    }

    return (
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
        <Button className="gap-2" onClick={() => setDialogOpen(true)}>
          <Plus className="w-4 h-4" />
          Add Verse
        </Button>
      </motion.div>
    );
  };

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
              <h1 className="text-xl font-bold text-foreground">{collectionName}</h1>
            </div>
            <Button 
              size="sm" 
              className="gap-2" 
              onClick={() => setDialogOpen(true)}
              disabled={loadState === "loading"}
            >
              <Plus className="w-4 h-4" />
              Add Verse
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-4 py-6">
        {renderContent()}
      </main>

      {/* Add Verse Dialog */}
      <AddVerseDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onAdd={handleAddVerse}
        collectionName={collectionName}
        defaultTranslation={globalTranslation}
      />
    </div>
  );
};

export default Collection;
