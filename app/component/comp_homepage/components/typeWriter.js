"use client";

import { useState, useEffect } from 'react';

export function useTypewriter(
  text,
  typingSpeed = 60,
  deletingSpeed = 100,
  delayBeforeDelete =4000,
  delayBeforeRestart = 4000
) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;

    if (isTyping && !isDeleting) {
      if (displayText.length < text.length) {
        timeout = setTimeout(() => {
          setDisplayText(text.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, delayBeforeDelete);
      }
    } else if (isDeleting) {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(text.slice(0, displayText.length - 1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        timeout = setTimeout(() => {
          setIsTyping(true);
        }, delayBeforeRestart);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isTyping, isDeleting, text, typingSpeed, deletingSpeed, delayBeforeDelete, delayBeforeRestart]);

  return displayText;
}