import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronRight, Check } from "lucide-react";
import { translations, DEFAULT_TRANSLATION } from "@/lib/translations";
import { bibleBooks, getVersesForChapter, formatReference } from "@/lib/bible-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type Step = "book" | "chapter" | "verse";

interface BibleBrowserProps {
  onSelect: (verse: { reference: string; text: string; translation: string }) => void;
  onCancel: () => void;
  defaultTranslation?: string;
}

const BibleBrowser = ({
  onSelect,
  onCancel,
  defaultTranslation = DEFAULT_TRANSLATION,
}: BibleBrowserProps) => {
  const [step, setStep] = useState<Step>("book");
  const [translation, setTranslation] = useState(defaultTranslation);
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);

  const selectedBookData = bibleBooks.find((b) => b.name === selectedBook);
  const verses = selectedBook && selectedChapter 
    ? getVersesForChapter(selectedBook, selectedChapter) 
    : [];

  const handleBookSelect = (bookName: string) => {
    setSelectedBook(bookName);
    setStep("chapter");
  };

  const handleChapterSelect = (chapter: number) => {
    setSelectedChapter(chapter);
    setStep("verse");
  };

  const handleVerseSelect = (verseNum: number, text: string) => {
    if (!selectedBook || !selectedChapter) return;
    onSelect({
      reference: formatReference(selectedBook, selectedChapter, verseNum),
      text,
      translation: translation.toUpperCase(),
    });
  };

  const handleBack = () => {
    if (step === "verse") {
      setStep("chapter");
      setSelectedChapter(null);
    } else if (step === "chapter") {
      setStep("book");
      setSelectedBook(null);
    } else {
      onCancel();
    }
  };

  const getTitle = () => {
    if (step === "verse" && selectedBook && selectedChapter) {
      return `${selectedBook} ${selectedChapter}`;
    }
    if (step === "chapter" && selectedBook) {
      return selectedBook;
    }
    return "Select Book";
  };

  return (
    <div className="flex flex-col h-full bg-card rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-card">
        <div className="flex items-center gap-2">
          <button
            onClick={handleBack}
            className="p-2 -ml-2 rounded-lg hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h2 className="text-lg font-semibold text-card-foreground">{getTitle()}</h2>
        </div>
        <Select value={translation} onValueChange={setTranslation}>
          <SelectTrigger className="w-20 h-9">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {translations.map((t) => (
              <SelectItem key={t.value} value={t.value}>
                <span className="font-medium">{t.label}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {step === "book" && (
            <motion.div
              key="books"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="p-2"
            >
              {/* Old Testament */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide px-3 py-2">
                  Old Testament
                </p>
                <div className="space-y-1">
                  {bibleBooks
                    .filter((b) => b.testament === "old")
                    .map((book) => (
                      <BookItem
                        key={book.name}
                        name={book.name}
                        chapters={book.chapters}
                        onClick={() => handleBookSelect(book.name)}
                      />
                    ))}
                </div>
              </div>
              {/* New Testament */}
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide px-3 py-2">
                  New Testament
                </p>
                <div className="space-y-1">
                  {bibleBooks
                    .filter((b) => b.testament === "new")
                    .map((book) => (
                      <BookItem
                        key={book.name}
                        name={book.name}
                        chapters={book.chapters}
                        onClick={() => handleBookSelect(book.name)}
                      />
                    ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === "chapter" && selectedBookData && (
            <motion.div
              key="chapters"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="p-4"
            >
              <div className="grid grid-cols-5 gap-2">
                {Array.from({ length: selectedBookData.chapters }, (_, i) => i + 1).map(
                  (chapter) => (
                    <button
                      key={chapter}
                      onClick={() => handleChapterSelect(chapter)}
                      className="aspect-square rounded-xl bg-muted hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center font-medium text-card-foreground"
                    >
                      {chapter}
                    </button>
                  )
                )}
              </div>
            </motion.div>
          )}

          {step === "verse" && verses.length > 0 && (
            <motion.div
              key="verses"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="p-2"
            >
              <div className="space-y-2">
                {verses.map((v) => (
                  <button
                    key={v.verse}
                    onClick={() => handleVerseSelect(v.verse, v.text)}
                    className="w-full text-left p-4 rounded-xl bg-muted/50 hover:bg-primary/10 hover:border-primary/30 border border-transparent transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-sm font-bold text-primary bg-primary/10 rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0">
                        {v.verse}
                      </span>
                      <p className="text-card-foreground leading-relaxed">{v.text}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const BookItem = ({
  name,
  chapters,
  onClick,
}: {
  name: string;
  chapters: number;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors group"
  >
    <span className="font-medium text-card-foreground">{name}</span>
    <div className="flex items-center gap-2 text-muted-foreground">
      <span className="text-sm">{chapters} ch</span>
      <ChevronRight className="w-4 h-4 group-hover:text-primary transition-colors" />
    </div>
  </button>
);

export default BibleBrowser;
