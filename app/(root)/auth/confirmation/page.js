"use client";

import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "user";

  const messages = {
    scout: {
      title: "Scout Application Submitted",
      description: "Thank you for your interest in joining our scouting network. Our team will review your application and credentials carefully.",
    },
    coach: {
      title: "Coach Application Received",
      description: "Thank you for applying to join our coaching team. We'll review your experience and qualifications thoroughly.",
    },
    user: {
      title: "Registration Successful",
      description: "Thank you for joining our platform. You are now registered a user. Now you can vote for players.",
    },
  };

  const currentMessage = messages[role];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-card p-8 rounded-xl shadow-lg">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <CheckCircle2 className="h-20 w-20 text-green-500" />
          </div>
          
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {currentMessage.title}
          </h1>
          
          <div className="space-y-4">
            <p className="text-muted-foreground">
              {currentMessage.description}
            </p>
            
            <div className="bg-secondary/50 p-4 rounded-lg">
              <p className="text-sm text-foreground">
               {role=="user"?
               "Thank you."
               :
               "We'll review your application within 24-48 hours and you will be registered soon."}
              </p>
            </div>
          </div>

          <div className="pt-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}