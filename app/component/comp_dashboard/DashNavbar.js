"use client"
import { FiBell } from "react-icons/fi";
import { FaUserAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Mail, Shield } from "lucide-react";
import useAuthStore from "@/app/store/AuthState";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
const DashNavbar = () => {
  const { user, logout } = useAuthStore();
  const router = useRouter(); 
  const logoutButton = () => {
    logout(); 
    router.push("/"); 
  };
  return (
 <>
 {user&&(

<div className="flex items-center justify-between pt-4 px-8 mb-6">
<div className="flex items-center space-x-2">
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
<div className="flex items-center space-x-6">
  {/* <div className="relative">
    {/* <div className="bg-white border border-gray-300 rounded-full hover:bg-gray-100 p-3">
      <FiBell className="text-gray-600 text-2xl cursor-pointer  " />
    </div>

    <span className="absolute -top-1 -right-2 bg-blue-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
      2
    </span>
  </div> */} 

  <div className="">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-14 w-14 rounded-full"
        >
          <Avatar>
            <AvatarFallback className="bg-primary/10">
              {user.username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center">
          <User className="mr-2 h-4 w-4" />
          <span>{user.username}</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center">
          <Mail className="mr-2 h-4 w-4" />
          <span>{user.email}</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center">
          <Shield className="mr-2 h-4 w-4" />
          <span className="capitalize">{user.role}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center text-red-600"
          onClick={logoutButton}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</div>
</div>
 )}
 </>
  );
};

export default DashNavbar;
