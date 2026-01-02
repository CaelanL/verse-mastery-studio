import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Info, Cross, Trophy, Sparkles, ArrowDown } from "lucide-react";

interface ProgressInfoModalProps {
  children?: React.ReactNode;
}

export function ProgressInfoModal({ children }: ProgressInfoModalProps) {
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
          <DialogTitle>Understanding Your Progress</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 pt-2">
          {/* Mastered Section */}
          <div className="flex gap-3 items-start">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
              <Trophy className="w-5 h-5 text-purple-500" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-foreground">Mastered</h3>
              <p className="text-sm text-muted-foreground">
                Score <span className="text-purple-500 font-medium">90%+</span> on Hard difficulty
              </p>
              <p className="text-xs text-muted-foreground/70">
                Hard mode tests recall without hints
              </p>
            </div>
          </div>

          {/* Arrow connector */}
          <div className="flex justify-center">
            <div className="flex flex-col items-center gap-0.5 text-muted-foreground/40">
              <div className="w-px h-3 bg-current" />
              <ArrowDown className="w-3 h-3" />
            </div>
          </div>

          {/* Engraved Section */}
          <div className="flex gap-3 items-start">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0 relative">
              <Cross className="w-5 h-5 text-amber-500" />
              <Sparkles className="absolute -top-0.5 -right-0.5 w-3 h-3 text-amber-400" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-semibold text-foreground">Engraved</h3>
              <p className="text-sm text-muted-foreground">
                Master the verse <span className="text-amber-500 font-medium">once per month</span> for <span className="text-amber-500 font-medium">4 consecutive months</span>
              </p>
              {/* Mini progress indicator */}
              <div className="flex items-center gap-1.5 pt-1">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-4 h-4 rounded-full border-2 border-amber-500/30 bg-amber-500/10"
                  />
                ))}
                <span className="text-xs text-muted-foreground/60 ml-1">→ Forever in your heart</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
