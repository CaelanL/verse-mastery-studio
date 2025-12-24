export interface VerseOfMonth {
  id: string;
  reference: string;
  text: string;
  translation: string;
  masteryCount: number;
  backgroundImage: string;
}

export const verseOfMonth: VerseOfMonth = {
  id: "votm-dec-2024",
  reference: "Philippians 4:13",
  text: "I can do all things through Christ who strengthens me.",
  translation: "NKJV",
  masteryCount: 347,
  backgroundImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
};

export const getVerseOfMonth = (): VerseOfMonth => {
  return verseOfMonth;
};
