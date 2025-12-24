import { motion } from "framer-motion";
import { ArrowLeft, Flame, BookOpen, CheckCircle2, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getInsightsStats, getMostMemorizedBooks, practiceStreak } from "@/lib/progress-data";

const StatCard = ({
  value,
  label,
  icon: Icon,
  colorClass,
  delay = 0,
}: {
  value: number;
  label: string;
  icon: React.ElementType;
  colorClass: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.3 }}
    className="flex-1 bg-card rounded-xl border border-border/50 shadow-elevation-1 p-5"
  >
    <div className={`w-10 h-10 rounded-lg ${colorClass} flex items-center justify-center mb-3`}>
      <Icon className="w-5 h-5 text-white" />
    </div>
    <p className="text-3xl font-bold text-card-foreground">{value}</p>
    <p className="text-sm text-muted-foreground">{label}</p>
  </motion.div>
);

const Insights = () => {
  const navigate = useNavigate();
  const stats = getInsightsStats();
  const topBooks = getMostMemorizedBooks();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 hover:bg-muted rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <h1 className="text-2xl font-bold text-foreground">Insights</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Hero Stats */}
        <div className="flex gap-4">
          <StatCard
            value={stats.versesMastered}
            label="Verses Mastered"
            icon={CheckCircle2}
            colorClass="bg-green-500"
            delay={0}
          />
          <StatCard
            value={stats.inProgress}
            label="In Progress"
            icon={Clock}
            colorClass="bg-blue-500"
            delay={0.1}
          />
        </div>

        {/* Practice Streak */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="bg-card rounded-xl border border-border/50 shadow-elevation-1 p-5"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-orange-500/10 flex items-center justify-center">
              <Flame className="w-8 h-8 text-orange-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Practice Streak</p>
              <p className="text-3xl font-bold text-card-foreground">
                {practiceStreak.days} days
              </p>
              <p className="text-sm text-muted-foreground">{practiceStreak.message}</p>
            </div>
          </div>
        </motion.div>

        {/* Most Memorized Books */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Most Memorized Books
          </h2>
          <div className="bg-card rounded-xl border border-border/50 shadow-elevation-1 overflow-hidden">
            {topBooks.length > 0 ? (
              topBooks.map((book, index) => (
                <div
                  key={book.name}
                  className="flex items-center justify-between p-4 border-b border-border/50 last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center text-accent-foreground">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-card-foreground">{book.name}</span>
                  </div>
                  <span className="text-muted-foreground">({book.count})</span>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-muted-foreground">
                <p>No verses memorized yet</p>
                <p className="text-sm mt-1">Start practicing to see your progress!</p>
              </div>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Insights;
