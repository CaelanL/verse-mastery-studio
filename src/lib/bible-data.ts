// Mock Bible data structure
export const bibleBooks = [
  { name: "Genesis", abbr: "Gen", chapters: 50, testament: "old" },
  { name: "Exodus", abbr: "Ex", chapters: 40, testament: "old" },
  { name: "Leviticus", abbr: "Lev", chapters: 27, testament: "old" },
  { name: "Psalms", abbr: "Ps", chapters: 150, testament: "old" },
  { name: "Proverbs", abbr: "Prov", chapters: 31, testament: "old" },
  { name: "Isaiah", abbr: "Isa", chapters: 66, testament: "old" },
  { name: "Matthew", abbr: "Matt", chapters: 28, testament: "new" },
  { name: "Mark", abbr: "Mark", chapters: 16, testament: "new" },
  { name: "Luke", abbr: "Luke", chapters: 24, testament: "new" },
  { name: "John", abbr: "John", chapters: 21, testament: "new" },
  { name: "Acts", abbr: "Acts", chapters: 28, testament: "new" },
  { name: "Romans", abbr: "Rom", chapters: 16, testament: "new" },
  { name: "Philippians", abbr: "Phil", chapters: 4, testament: "new" },
  { name: "Revelation", abbr: "Rev", chapters: 22, testament: "new" },
] as const;

export type BibleBook = (typeof bibleBooks)[number];

// Mock verses - in real app these would come from API
const mockVerseTexts: Record<string, string> = {
  "Genesis 1:1": "In the beginning God created the heavens and the earth.",
  "Genesis 1:2": "Now the earth was formless and empty, darkness was over the surface of the deep.",
  "Genesis 1:3": "And God said, \"Let there be light,\" and there was light.",
  "John 3:16": "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
  "John 3:17": "For God did not send his Son into the world to condemn the world, but to save the world through him.",
  "Psalms 23:1": "The Lord is my shepherd, I lack nothing.",
  "Psalms 23:2": "He makes me lie down in green pastures, he leads me beside quiet waters.",
  "Psalms 23:3": "He refreshes my soul. He guides me along the right paths for his name's sake.",
  "Philippians 4:13": "I can do all this through him who gives me strength.",
  "Romans 8:28": "And we know that in all things God works for the good of those who love him.",
};

const defaultVerse = "The word of the Lord endures forever.";

export function getVersesForChapter(book: string, chapter: number): { verse: number; text: string }[] {
  // Return 2-3 mock verses per chapter
  const verseCount = (chapter % 3) + 2; // 2-4 verses
  return Array.from({ length: verseCount }, (_, i) => {
    const verseNum = i + 1;
    const ref = `${book} ${chapter}:${verseNum}`;
    return {
      verse: verseNum,
      text: mockVerseTexts[ref] || defaultVerse,
    };
  });
}

export function formatReference(book: string, chapter: number, verse: number): string {
  return `${book} ${chapter}:${verse}`;
}
