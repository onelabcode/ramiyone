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
import { Separator } from "@/components/ui/separator";
import { Toaster } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function LoginPage() {
   const router = useRouter();
  const { loading, login, signInWithGoogle, error } = useAuthStore();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    try {
      await login(values.email, values.password);
      router.push(`/`);
      if (!error) {
        form.reset();
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      router.push(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`);

    } catch (error) {
      console.error("Google sign in error:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-background to-secondary/20 p-4">
      <AuthCard className="w-full max-w-md">
        <AuthHeader
          icon={LogIn}
          title="Welcome back"
          description="Enter your credentials to sign in"
        />

        <Button 
          variant="outline" 
          className="w-full mt-6 h-12"
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          <img 
            src="https://www.google.com/favicon.ico" 
            alt="Google" 
            className="w-5 h-5 mr-2"
          />
          Continue with Google
        </Button>

        <div className="relative my-6">
          <Separator />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-sm text-muted-foreground">
            or
          </span>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input 
                      placeholder="Email" 
                      type="email" 
                      className="h-12 bg-background"
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
                      className="h-12 bg-background"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full h-12" 
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2"
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
                  Signing in...
                </span>
              ) : (
                "Sign in"
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