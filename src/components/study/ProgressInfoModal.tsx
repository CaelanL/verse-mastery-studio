import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Info, Cross, Trophy, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressInfoModalProps {
  type: "mastered" | "engraved";
  children?: React.ReactNode;
}

export function ProgressInfoModal({ type, children }: ProgressInfoModalProps) {
  const content = {
    mastered: {
      title: "What is Mastered?",
      icon: <Trophy className="w-6 h-6 text-purple-500" />,
      description: "A verse is considered Mastered when you achieve a score of 90% or higher on Hard difficulty.",
      details: [
        "Hard mode tests your recall without any hints",
        "You need to recite at least 90% of the verse correctly",
        "Mastering a verse shows strong memorization"
      ],
      accent: "purple"
    },
    engraved: {
      title: "What is Engraved?",
      icon: (
        <div className="relative">
          <Cross className="w-6 h-6 text-amber-500" />
          <Sparkles className="absolute -top-1 -right-2 w-3 h-3 text-amber-400" />
        </div>
      ),
      description: "A verse becomes Engraved when you Master it at least once each month for 4 consecutive months.",
      details: [
        "Master the verse (90%+ on Hard) at least once per month",
        "Continue this for 4 consecutive months",
        "This ensures the verse is truly committed to long-term memory",
        "Engraved verses are \"forever in your heart\""
      ],
      accent: "amber"
    }
  };

  const info = content[type];

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || (
          <button className="p-0.5 rounded-full hover:bg-muted/50 transition-colors">
            <Info className="w-3.5 h-3.5 text-muted-foreground/70 hover:text-muted-foreground" />
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {info.icon}
            <span>{info.title}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">{info.description}</p>
          <ul className="space-y-2">
            {info.details.map((detail, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className={cn(
                  "w-1.5 h-1.5 rounded-full mt-1.5 shrink-0",
                  type === "mastered" ? "bg-purple-500" : "bg-amber-500"
                )} />
                <span className="text-foreground/80">{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
