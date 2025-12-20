import { motion } from "framer-motion";
import { WifiOff, RefreshCw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ConnectionErrorProps {
  onRetry: () => void;
  message?: string;
  type?: "connection" | "error";
}

export function ConnectionError({ 
  onRetry, 
  message = "Unable to load verses",
  type = "connection" 
}: ConnectionErrorProps) {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = async () => {
    setIsRetrying(true);
    // Small delay to show the spinning animation
    await new Promise(resolve => setTimeout(resolve, 500));
    onRetry();
    setIsRetrying(false);
  };

  const Icon = type === "connection" ? WifiOff : AlertCircle;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-12 px-4"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4"
      >
        <Icon className="w-8 h-8 text-destructive" />
      </motion.div>
      
      <h3 className="font-semibold text-foreground mb-2 text-center">
        {type === "connection" ? "Connection Lost" : "Something went wrong"}
      </h3>
      
      <p className="text-sm text-muted-foreground text-center mb-6 max-w-xs">
        {message}
      </p>

      <Button 
        onClick={handleRetry} 
        variant="outline" 
        className="gap-2"
        disabled={isRetrying}
      >
        <RefreshCw className={`w-4 h-4 ${isRetrying ? "animate-spin" : ""}`} />
        {isRetrying ? "Retrying..." : "Try Again"}
      </Button>

      {type === "connection" && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xs text-muted-foreground mt-4 text-center"
        >
          Check your internet connection and try again
        </motion.p>
      )}
    </motion.div>
  );
}
