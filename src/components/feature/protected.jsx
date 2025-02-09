"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/feature/Loading"; // Assuming this is a spinner/loading component
import useAuthStore from "services/AuthState";

export const withAuth = (Component, allowedRoles) => {
  return function AuthenticatedComponent(props) {
    const { user } = useAuthStore(); // Fetch the user from the state
    const router = useRouter();

    useEffect(() => {
      if (user && !allowedRoles.includes(user.role)) {
        router.replace("/404"); // Client-side routing
      }
    }, [user, router, allowedRoles]);

    // Handle loading state or unauthorized access
    if (!user) {
      // Optionally, display a loading spinner or placeholder
      return <Loading />;
    }

    if (user && !allowedRoles.includes(user.role)) {
      return null;
    }

    return <Component {...props} />;
  };
};
