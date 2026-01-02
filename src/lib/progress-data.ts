export interface DifficultyProgress {
  bestScore: number;
  lastAttempt?: Date;
}

export interface EngravedProgress {
  masteredMonths: string[]; // Format: "YYYY-MM", e.g., ["2025-09", "2025-10"]
  isEngraved: boolean;
  engravedDate?: Date;
}

export interface VerseProgress {
  verseId: string;
  easy: DifficultyProgress | null;
  medium: DifficultyProgress | null;
  hard: DifficultyProgress | null;
  engraved: EngravedProgress | null;
}

// Mock progress data - will be replaced with real data later
export const progressData: Record<string, VerseProgress> = {
  "1": {
    verseId: "1",
    easy: { bestScore: 100, lastAttempt: new Date() },
    medium: { bestScore: 98, lastAttempt: new Date() },
    hard: { bestScore: 95, lastAttempt: new Date() },
    engraved: {
      masteredMonths: ["2025-09", "2025-10", "2025-11", "2025-12"],
      isEngraved: true,
      engravedDate: new Date("2025-12-15"),
    },
  },
  "2": {
    verseId: "2",
    easy: { bestScore: 100, lastAttempt: new Date() },
    medium: { bestScore: 88, lastAttempt: new Date() },
    hard: null,
    engraved: null,
  },
  "3": {
    verseId: "3",
    easy: { bestScore: 95, lastAttempt: new Date() },
    medium: null,
    hard: null,
    engraved: null,
  },
  "4": {
    verseId: "4",
    easy: null,
    medium: null,
    hard: null,
    engraved: null,
  },
  "5": {
    verseId: "5",
    easy: { bestScore: 100, lastAttempt: new Date() },
    medium: { bestScore: 94, lastAttempt: new Date() },
    hard: { bestScore: 85, lastAttempt: new Date() },
    engraved: null,
  },
  "6": {
    verseId: "6",
    easy: { bestScore: 100, lastAttempt: new Date() },
    medium: { bestScore: 92, lastAttempt: new Date() },
    hard: { bestScore: 96, lastAttempt: new Date() },
    engraved: {
      masteredMonths: ["2025-09", "2025-10", "2025-11"],
      isEngraved: false,
    },
  },
  "7": {
    verseId: "7",
    easy: null,
    medium: null,
    hard: null,
    engraved: null,
  },
};

export type MasteryLevel = "easy" | "medium" | "hard" | "engraved" | null;

const MASTERY_THRESHOLD = 90;
const ENGRAVED_MONTHS_REQUIRED = 4;

export function getHighestMastery(verseId: string): MasteryLevel {
  const progress = progressData[verseId];
  if (!progress) return null;

  // Check from highest to lowest
  if (progress.engraved?.isEngraved) {
    return "engraved";
  }
  if (progress.hard && progress.hard.bestScore >= MASTERY_THRESHOLD) {
    return "hard";
  }
  if (progress.medium && progress.medium.bestScore >= MASTERY_THRESHOLD) {
    return "medium";
  }
  if (progress.easy && progress.easy.bestScore >= MASTERY_THRESHOLD) {
    return "easy";
  }
  return null;
}

export function getEngravedStatus(verseId: string): {
  monthsCompleted: number;
  monthsRequired: number;
  completedMonths: string[];
  isEngraved: boolean;
} {
  const progress = progressData[verseId];
  const defaultStatus = {
    monthsCompleted: 0,
    monthsRequired: ENGRAVED_MONTHS_REQUIRED,
    completedMonths: [],
    isEngraved: false,
  };

  if (!progress?.engraved) return defaultStatus;

  return {
    monthsCompleted: progress.engraved.masteredMonths.length,
    monthsRequired: ENGRAVED_MONTHS_REQUIRED,
    completedMonths: progress.engraved.masteredMonths,
    isEngraved: progress.engraved.isEngraved,
  };
}

export function isMastered(verseId: string): boolean {
  const progress = progressData[verseId];
  if (!progress) return false;
  return progress.hard !== null && progress.hard.bestScore >= MASTERY_THRESHOLD;
}

export function getVerseProgress(verseId: string): VerseProgress | null {
  return progressData[verseId] || null;
}

export function resetVerseProgress(verseId: string): void {
  if (progressData[verseId]) {
    progressData[verseId] = {
      verseId,
      easy: null,
      medium: null,
      hard: null,
      engraved: null,
    };
  }
}

// Mock practice streak data
export const practiceStreak = {
  days: 6,
  message: "Keep it going!",
};

// Mock book data for verses (in real app, this would come from verse metadata)
const verseBooks: Record<string, string> = {
  "1": "Psalms",
  "2": "John",
  "3": "Romans",
  "4": "Genesis",
  "5": "Psalms",
  "6": "John",
  "7": "Proverbs",
};

export function getInsightsStats(): { versesMastered: number; inProgress: number } {
  let versesMastered = 0;
  let inProgress = 0;

  Object.values(progressData).forEach((progress) => {
    const hasHardMastery = progress.hard && progress.hard.bestScore >= MASTERY_THRESHOLD;
    const hasAnyProgress = progress.easy || progress.medium || progress.hard;

    if (hasHardMastery) {
      versesMastered++;
    } else if (hasAnyProgress) {
      inProgress++;
    }
  });

  return { versesMastered, inProgress };
}

export function getMostMemorizedBooks(): { name: string; count: number }[] {
  const bookCounts: Record<string, number> = {};

  Object.entries(progressData).forEach(([verseId, progress]) => {
    const hasAnyMastery =
      (progress.easy && progress.easy.bestScore >= MASTERY_THRESHOLD) ||
      (progress.medium && progress.medium.bestScore >= MASTERY_THRESHOLD) ||
      (progress.hard && progress.hard.bestScore >= MASTERY_THRESHOLD);

    if (hasAnyMastery) {
      const book = verseBooks[verseId] || "Unknown";
      bookCounts[book] = (bookCounts[book] || 0) + 1;
    }
  });

  return Object.entries(bookCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}
