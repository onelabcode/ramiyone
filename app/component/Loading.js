"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";


export default function Loading () {
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
  )
}
