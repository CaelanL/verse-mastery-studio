import { useState } from "react";
import { motion } from "framer-motion";
import { Users, ChevronRight, Flame, TrendingUp, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { getVerseOfMonth } from "@/lib/verse-of-month";
import { VerseOfMonthModal } from "@/components/home/VerseOfMonthModal";
import { CollectionPicker } from "@/components/home/CollectionPicker";
import { getInsightsStats, practiceStreak } from "@/lib/progress-data";

const Home = () => {
  const [verseModalOpen, setVerseModalOpen] = useState(false);
  const [collectionPickerOpen, setCollectionPickerOpen] = useState(false);

  const verse = getVerseOfMonth();
  const stats = getInsightsStats();
  const streak = practiceStreak.days;

  const handleVerseCardClick = () => {
    setVerseModalOpen(true);
  };

  const handleAddToCollection = () => {
    setVerseModalOpen(false);
    setCollectionPickerOpen(true);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-foreground">Home</h1>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Verse of the Month Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <button
            onClick={handleVerseCardClick}
            className="group relative w-full overflow-hidden rounded-2xl text-left shadow-elevation-3 transition-transform hover:scale-[1.01] active:scale-[0.99]"
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url(${verse.backgroundImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />

            {/* Content */}
            <div className="relative p-6 min-h-[240px] flex flex-col justify-end">
              {/* Badge */}
              <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary backdrop-blur-sm">
                Verse of the Month
              </span>

              {/* Verse Text */}
              <p className="mb-3 text-xl font-serif leading-relaxed text-white/95">
                "{verse.text}"
              </p>

              {/* Reference */}
              <p className="mb-4 text-base font-medium text-white/80">
                {verse.reference}
                <span className="ml-2 text-sm text-white/50">({verse.translation})</span>
              </p>

              {/* Stats Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-white/70">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">
                    <strong className="text-white">{verse.masteryCount}</strong> mastered
                  </span>
                </div>
                <ChevronRight className="h-5 w-5 text-white/50 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </button>
        </motion.div>

        {/* Insights Quick Access */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <Link to="/insights">
            <div className="group relative overflow-hidden rounded-xl bg-card p-5 shadow-elevation-2 border border-border/50 hover:border-primary/30 hover:shadow-elevation-3 transition-all duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Streak Icon */}
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20">
                    <Flame className="h-7 w-7 text-orange-500" />
                  </div>

                  {/* Stats */}
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-2xl font-bold text-foreground">{streak}</span>
                      <span className="text-sm text-muted-foreground">day streak</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="h-4 w-4" />
                        <span>{stats.versesMastered} mastered</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <TrendingUp className="h-4 w-4" />
                        <span>{stats.inProgress} in progress</span>
                      </div>
                    </div>
                  </div>
                </div>

                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </Link>
        </motion.div>
      </main>

      {/* Verse of the Month Modal */}
      <VerseOfMonthModal
        open={verseModalOpen}
        onClose={() => setVerseModalOpen(false)}
        verse={verse}
        onAddToCollection={handleAddToCollection}
      />

      {/* Collection Picker Modal */}
      <CollectionPicker
        open={collectionPickerOpen}
        onClose={() => setCollectionPickerOpen(false)}
        verseReference={verse.reference}
      />
    </div>
  );
};

export default Home;
