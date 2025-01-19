"use client";

import Link from "next/link";
import React, { useState } from "react";
import { motion } from "framer-motion";
import useAuthStore from "../store/AuthState";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  User,
  LogOut,
  Mail,
  Shield,
  Menu,
  X,
  Home,
  Users,
  BookOpen,
  ShoppingBag,
  Search,
  Newspaper,
  GraduationCap,
  UserPlus2,
  Bell,
  Heart,
  LayoutDashboard,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PlayerSearchForm } from "./comp_dashboard/Dashboard_comp/NavbarForm";
import { PlayerSuggestionDialog } from "./Form/Form_dialog";
import { usePathname } from "next/navigation";
import { NotificationPanel } from "./Notification_bell/Notification_panel";
import { Favorite_bar } from "./favourite_page/favourite_bar";
import Image from "next/image";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Player", href: "/players", icon: Users },
  { name: "Blog", href: "/blogs", icon: BookOpen },
  { name: "Latest", href: "/latest", icon: Newspaper },
  { name: "Shop", href: "/shop", icon: ShoppingBag },
  { name: "Services", href: "/contactus", icon: GraduationCap },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [suggestion, setSuggestion] = useState(false);
  const { user, logout } = useAuthStore();
const logouts=()=>{
logout();
window.location.href = `/`;
};
  const FeatureMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <LayoutDashboard className="h-4 w-4" />
          <span className="hidden sm:inline">Features</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {user?.role === "scout" && (
          <DropdownMenuItem onClick={() => setSearchOpen(true)}>
            <Search className="mr-2 h-4 w-4" />
            <span>Find Player</span>
          </DropdownMenuItem>
        )}
        {user?.role === "coach" && (
          <DropdownMenuItem onClick={() => setSuggestion(true)}>
            <UserPlus2 className="mr-2 h-4 w-4" />
            <span>Suggest Player</span>
          </DropdownMenuItem>
        )}
        {user?.role === "admin" && (
          <Link href="/dashboard">
            <DropdownMenuItem>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </DropdownMenuItem>
          </Link>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuLabel>User Details</DropdownMenuLabel>
        <DropdownMenuItem className="flex items-center">
          <User className="mr-2 h-4 w-4" />
          <span>{user?.username || "Guest"}</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center">
          <Mail className="mr-2 h-4 w-4" />
          <span>{user?.email || "No Email"}</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center">
          <Shield className="mr-2 h-4 w-4" />
          <span className="capitalize">{user?.role || "User"}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center text-red-600"
          onClick={logouts}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <>
      <motion.header
        className="bg-white shadow-md sticky top-0 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden"
                aria-label="Toggle navigation menu"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
              <div className="relative w-32 h-9 bg-gray-800 rounded-lg flex items-center justify-center shadow-2xl">
  <Link href="/" className="flex items-center justify-center w-full h-full">
    <Image
      src="/ramiyone.png" 
      alt="RAMiYoNE Logo"
      width={160} 
      height={48}
      className="object-contain"
    />
  </Link>
</div>

            </div>

            <nav className="hidden lg:flex items-center space-x-6">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium flex items-center space-x-2 hover:text-primary transition",
                    pathname === item.href && "text-primary"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
            <div className="flex items-center space-x-3">
              {user ? (
                <div className="flex justify-center items-center">
                  <Favorite_bar /> <NotificationPanel />
                  <FeatureMenu />
                </div>
              ) : (
                <div className="flex items-center space-x-2 max-[280px]:flex-col">
                  <Link href="/auth/login">
                    <Button variant="outline" size="sm">
                      Login
                    </Button>
                  </Link>
                  <Link href="/auth/signup" className=" sm:inline-block">
                    <Button variant="ghost" size="sm">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.header>
      <motion.div
        className={cn(
          "fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity lg:hidden",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={() => setIsOpen(false)}
      />
      <motion.aside
        className={cn(
          "fixed inset-y-0 left-0 bg-white w-64 z-50 shadow-lg transform transition-transform lg:hidden overflow-y-auto",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-lg font-bold">
              RAMiYoNE
            </Link>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="space-y-1">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors",
                  pathname === item.href && "bg-primary/10 text-primary"
                )}
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </motion.aside>
      <PlayerSearchForm open={searchOpen} onOpenChange={setSearchOpen} />
      <PlayerSuggestionDialog
        open={suggestion}
        onOpenChange={() => setSuggestion(false)}
      />
    </>
  );
};

export default Navbar;
