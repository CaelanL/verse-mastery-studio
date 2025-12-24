import { motion } from "framer-motion";
import { ArrowLeft, Flame, CheckCircle2, Clock, Target, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getInsightsStats, getMostMemorizedBooks, practiceStreak } from "@/lib/progress-data";

const MEDALS = ["🥇", "🥈", "🥉"];

interface StatItemProps {
  value: number;
  label: string;
  icon: React.ElementType;
  colorClass: string;
  delay?: number;
}

const StatItem = ({ value, label, icon: Icon, colorClass, delay = 0 }: StatItemProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.3 }}
    className="bg-card rounded-xl border border-border/50 p-4 flex flex-col items-center text-center"
  >
    <div className={`w-10 h-10 rounded-full ${colorClass} flex items-center justify-center mb-2`}>
      <Icon className="w-5 h-5 text-white" />
    </div>
    <p className="text-2xl font-bold text-card-foreground">{value}</p>
    <p className="text-xs text-muted-foreground uppercase tracking-wide">{label}</p>
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
        {/* Hero Streak Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 via-orange-400 to-amber-400 p-6 text-center shadow-lg"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.2),transparent_60%)]" />
          <div className="relative z-10">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-3"
            >
              <Flame className="w-9 h-9 text-white drop-shadow-md" />
            </motion.div>
            <p className="text-5xl font-extrabold text-white drop-shadow-sm">
              {practiceStreak.days}
            </p>
            <p className="text-white/90 text-lg font-medium">day streak</p>
            <p className="mt-2 text-white/80 text-sm">{practiceStreak.message}</p>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <StatItem
            value={stats.versesMastered}
            label="Mastered"
            icon={CheckCircle2}
            colorClass="bg-emerald-500"
            delay={0.15}
          />
          <StatItem
            value={stats.inProgress}
            label="In Progress"
            icon={Clock}
            colorClass="bg-blue-500"
            delay={0.2}
          />
        </div>

        {/* Most Memorized Books */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Most Memorized Books
          </h2>
          <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
            {topBooks.length > 0 ? (
              topBooks.map((book, index) => (
                <div
                  key={book.name}
                  className="flex items-center justify-between px-4 py-3 border-b border-border/30 last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg w-6 text-center">
                      {index < 3 ? MEDALS[index] : (
                        <span className="text-xs font-medium text-muted-foreground">{index + 1}</span>
                      )}
                    </span>
                    <span className="font-medium text-card-foreground">{book.name}</span>
                  </div>
                  <span className="text-xs font-medium bg-muted px-2 py-0.5 rounded-full text-muted-foreground">
                    {book.count} {book.count === 1 ? "verse" : "verses"}
                  </span>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                <p className="font-medium">No verses memorized yet</p>
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
