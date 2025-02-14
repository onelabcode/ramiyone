"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ListStart, Newspaper } from "lucide-react";
import { useRouter } from "next/navigation";

const tabs = [
  {
    id: "latest",
    label: "Latest",
    icon: <Newspaper size={18} />,
  },
  {
    id: "featured",
    label: "Featured",
    icon: <ListStart size={18} />,
  },
];

export default function FluidTabs({ onTabChange }) {
  const [activeTab, setActiveTab] = useState("latest");
  const [touchedTab, setTouchedTab] = useState();
  const [prevActiveTab, setPrevActiveTab] = useState("latest");
  const timeoutRef = useRef();
  const router = useRouter();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleTabClick = (tabId) => {
    router.push(`/?tab=${tabId}`, { scroll: false });
    setPrevActiveTab(activeTab);
    setActiveTab(tabId);
    setTouchedTab(tabId);

    if (onTabChange) {
      onTabChange(tabId);
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setTouchedTab(null);
    }, 300);
  };

  const getTabIndex = (tabId) => tabs.findIndex((tab) => tab.id === tabId);

  return (
    <div className="flex md:hidden items-center justify-center py-4">
      <div className="relative flex w-full max-w-md space-x-2 overflow-hidden rounded-full bg-[hsl(200,50%,95%)] p-1 shadow-lg">
        <AnimatePresence initial={false}>
          <motion.div
            key={activeTab}
            className="absolute inset-y-0 my-1 rounded-full bg-[radial-gradient(circle,_hsl(220,100%,60%)_41%,_hsl(0,0%,20%)_100%)] bg-[size:200%_200%] animate-radialGradient"
            initial={{ x: `${getTabIndex(prevActiveTab) * 100}%` }}
            animate={{ x: `${getTabIndex(activeTab) * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ width: `${100 / tabs.length}%` }}
          />
        </AnimatePresence>
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            className={`relative z-10 flex w-full items-center justify-center gap-1.5 px-5 py-3 text-sm font-bold transition-colors duration-300 ${
              activeTab === tab.id
                ? "font-bold text-[hsl(230,60%,90%)]"
                : "text-[hsl(0,0%,50%)]"
            } ${touchedTab === tab.id ? "blur-sm" : ""}`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.icon}
            {tab.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
