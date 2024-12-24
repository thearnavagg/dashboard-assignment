import { useState } from "react";
import { Search, HelpCircle, MessageSquare, Bell, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header({ toggleSidebar }) {
  return (
    <header className="bg-gray-100 px-4 py-3 md:px-6 md:py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          onClick={toggleSidebar}
        >
          <Menu className="h-6 w-6" />
        </button>
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search your course"
            className="pl-10 bg-white border-0 w-64 lg:w-80"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <HelpCircle className="w-6 h-6 text-gray-400" onClick={toggleSidebar} />
        <MessageSquare className="w-6 h-6 text-gray-400" onClick={toggleSidebar} />
        <div className="relative hidden lg:block">
          <Bell className="w-6 h-6 text-gray-400" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>
        <div className="flex items-center gap-3 ml-4">
          <Avatar>
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div className="hidden md:block">
            <div className="font-medium">Adeline H. Dancy</div>
          </div>
        </div>
      </div>
    </header>
  );
}
