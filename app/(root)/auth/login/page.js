"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { LogIn } from "lucide-react";
import { AuthCard } from "../comp/auth-card";
import { AuthHeader } from "../comp/auth-header";
import { AuthFooter } from "../comp/auth-footer";
import useAuthStore from "@/app/store/AuthState";
import { Toaster } from "sonner";
const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function LoginPage() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const {loading,login,error}=useAuthStore();
 async function onSubmit(values) {
    try {
      await login(values.email, values.password);
      window.location.href = `/`;
      if (!error) {
        form.reset();
      }
    } catch (error) {
        console.error("Unexpected error:", error);
    }
  }

  return (
    <div className="flex justify-center items-center sm:mt-16 mt-5">
    <AuthCard>
      <AuthHeader
        icon={LogIn}
        title="Welcome back"
        description="Enter your credentials to sign in"
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input 
                    placeholder="Email" 
                    type="email" 
                    className="bg-background"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input 
                    placeholder="Password" 
                    type="password" 
                    className="bg-background"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
    <span className="flex items-center">
      <svg
        className="animate-spin h-5 w-5 mr-2 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        ></path>
      </svg>
      Loading...
    </span>
  ) : (
    "Login"
  )}
          </Button>
        </form>
      </Form>
      <AuthFooter
        text="Don't have an account?"
        linkText="Sign up"
        linkHref="/auth/signup"
      />
    </AuthCard>
    <Toaster position="bottom-right" theme="light" />
    </div>
  );
}