"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { AuthCard } from "../comp/auth-card";
import { AuthHeader } from "../comp/auth-header";
import { AuthFooter } from "../comp/auth-footer";
import { UserPlus } from "lucide-react";
import useAuthStore from "@/app/store/AuthState";

import { Toaster } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function SignUpPage() {

  const {loading,signup,error}=useAuthStore();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  async function onSubmit(values) {
    try {
      await signup(values.email, values.password, values.name);
        form.reset();
        window.location.href= `/auth/profile`;
    } catch (error) {
        console.error("Unexpected error:", error);
    }
  }
  return (
    <div className="flex justify-center items-center sm:mt-16 mt-5">
    <AuthCard>
      <AuthHeader
        icon={UserPlus}
        title="Create account"
        description="Enter your details to get started"
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input 
                    placeholder="Full name" 
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input 
                    placeholder="Confirm password" 
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
    "Sign Up"
  )}
          </Button>
        </form>
      </Form>
      <AuthFooter
        text="Already have an account?"
        linkText="Sign in"
        linkHref="/auth/login"
      />
    </AuthCard>
    <Toaster position="bottom-right" theme="light" />
    </div>
  );
}