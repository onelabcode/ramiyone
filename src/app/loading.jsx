"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function loading() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
    >
      <div className="relative">
        {/* Outer rotating circle */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 2,
            ease: "linear",
            repeat: Infinity,
          }}
          className="w-16 h-16 rounded-full border-4 border-primary/20"
        />

        {/* Inner rotating circle */}
        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 1.5,
            ease: "linear",
            repeat: Infinity,
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-12 h-12 rounded-full border-4 border-t-primary border-r-primary border-b-transparent border-l-transparent" />
        </motion.div>

        {/* Center pulsing icon */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          className="absolute inset-0 flex items-center justify-center text-primary"
        >
          <Loader2 className="w-6 h-6" />
        </motion.div>
      </div>
    </motion.div>
  );
}

import { CircleIcon, Loader2Icon } from "lucide-react";

import { useEffect, useState } from "react";
import { cn } from "@lib/utils";
export function LoadingSpinner() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = Math.min(oldProgress + Math.random() * 20, 100);
        if (newProgress === 100) {
          setTimeout(() => setIsLoading(false), 500);
          clearInterval(timer);
        }
        return newProgress;
      });
    }, 400);

    return () => clearInterval(timer);
  }, []);

  if (!isLoading) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm">
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md space-y-8 px-4">
          <div className="flex flex-col items-center">
            <div className="relative">
              <Loader2Icon className="h-12 w-12 animate-spin text-primary" />
              <div className="absolute inset-0 flex items-center justify-center">
                <CircleIcon className="h-4 w-4 text-primary" />
              </div>
            </div>

            <div className="mt-8 w-full space-y-3">
              <div className="h-1 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full bg-primary transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-center text-sm text-muted-foreground">
                Loading... {Math.round(progress)}%
              </p>
            </div>

            <div className="mt-6 space-y-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={cn(
                    "h-2 w-24 animate-pulse rounded-full bg-secondary",
                    {
                      "w-32": i === 2,
                      "w-16": i === 3,
                    }
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
