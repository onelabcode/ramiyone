"use client";
import { useTypewriter } from "../components/typeWriter";

export const TextTypeAnime = () => {
  const typedText = useTypewriter(
    "advanced scouting platform.",
    60,
    100,
    4000,
    4000
  );
  return <>{typedText}</>;
};
