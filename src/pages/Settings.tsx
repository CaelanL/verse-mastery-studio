import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, BookOpen, Moon, Sun, Info } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const translations = [
  { value: "esv", label: "ESV", full: "English Standard Version" },
  { value: "niv", label: "NIV", full: "New International Version" },
  { value: "nlt", label: "NLT", full: "New Living Translation" },
  { value: "kjv", label: "KJV", full: "King James Version" },
  { value: "nasb", label: "NASB", full: "New American Standard Bible" },
  { value: "nkjv", label: "NKJV", full: "New King James Version" },
];

const SettingsSection = ({
  title,
  children,
  delay = 0,
}: {
  title: string;
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.3 }}
  >
    <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
      {title}
    </h2>
    <div className="bg-card rounded-xl border border-border/50 shadow-elevation-1 overflow-hidden">
      {children}
    </div>
  </motion.div>
);

const SettingsRow = ({
  icon: Icon,
  label,
  description,
  children,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  description?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}) => (
  <div
    className={`flex items-center justify-between p-4 border-b border-border/50 last:border-b-0 ${
      onClick ? "cursor-pointer hover:bg-muted/50 transition-colors" : ""
    }`}
    onClick={onClick}
  >
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center text-accent-foreground">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="font-medium text-card-foreground">{label}</p>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
    {children || (onClick && <ChevronRight className="w-5 h-5 text-muted-foreground" />)}
  </div>
);

const Settings = () => {
  const [translation, setTranslation] = useState("esv");
  const [darkMode, setDarkMode] = useState(false);

  const selectedTranslation = translations.find((t) => t.value === translation);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Bible Settings */}
        <SettingsSection title="Bible" delay={0}>
          <SettingsRow
            icon={BookOpen}
            label="Translation"
            description={selectedTranslation?.full}
          >
            <Select value={translation} onValueChange={setTranslation}>
              <SelectTrigger className="w-24 h-9">
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
          </SettingsRow>
        </SettingsSection>

        {/* Appearance */}
        <SettingsSection title="Appearance" delay={0.1}>
          <SettingsRow
            icon={darkMode ? Moon : Sun}
            label="Dark Mode"
            description="Switch between light and dark themes"
          >
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </SettingsRow>
        </SettingsSection>

        {/* About */}
        <SettingsSection title="About" delay={0.2}>
          <SettingsRow
            icon={Info}
            label="Version"
            description="1.0.0"
          />
        </SettingsSection>
      </main>
    </div>
  );
};

export default Settings;
