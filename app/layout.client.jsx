"use client";

import localFont from "next/font/local";
import "./globals.css";
import useAuthStore from "./store/AuthState";
import { useEffect } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  const { getProfile, user,refreshToken } = useAuthStore();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        await getProfile();
      } catch (error) {
        console.error("Failed to authenticate:", error);
      }
    };
    checkAuthentication();
  }, [getProfile]);
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        await refreshToken();
      } catch (error) {
        console.error("Token refresh failed:", error);
      }
    }, 13 * 60 * 1000);
  
    return () => clearInterval(interval);
  }, [refreshToken]); 
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
