'use client'
import { useState } from "react";
import { ModeToggle } from "./mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import useStore from '../store/useStore';
import { LogIn, LogOut } from "lucide-react";

const mockData = [
  { id: 1, label: "Metadata" },
  { id: 2, label: "Preview" },
  { id: 3, label: "Chat" },
];

const Header = () => {
  const { selectedTabs, toggleItem, user, setUser, clearUser, selectedDocumentId } = useStore();

  const handleSelectItem = (e, category, item) => {
    e.preventDefault();
    toggleItem(category, item);
  };

  const handleLogin = () => {
    setUser({ name: 'John Doe', avatar: 'https://github.com/shadcn.png' });
  };

  const handleLogout = () => {
    clearUser();
  };

  return (
    <div className="w-full flex justify-between items-center px-2 pt-2">
      <div>
        <h1 className="text-md rounded-2xl bg-black text-slate-100 font-bold px-3 py-1 dark:bg-gray-50 dark:text-gray-900">
          DXF
        </h1>
        {/* <h1 className="text-2xl font-bold"></h1> */}
      </div>
      <div className={"flex justify-start items-center gap-2"}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" disabled={!selectedDocumentId} >
              Options
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className={'bg-background dark:bg-primary space-y-1 p-2'} align="end">
            {mockData.map((item) => (
              <DropdownMenuItem
                key={item.id}
                onClick={(e) => handleSelectItem(e, 'options', item)}
                className={`${
                  selectedTabs.options?.some((tab) => tab.id === item.id) ? 
                  "bg-indigo-100 dark:text-slate-800 dark:hover:text-slate-700" : ""
                } dark:hover:border-none`}
              >
                {item.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <ModeToggle />
        {user ? (
          <div className="flex items-center gap-1">
            <Avatar className={'cursor-pointer rounded-sm hover:scale-105'}>
              <AvatarImage src={user.avatar} alt="profile" />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <Button variant="outline" onClick={handleLogout} >Logout <LogOut size={16} /></Button>
          </div>
        ) : (
          <Button variant="outline" onClick={handleLogin} >Login <LogIn size={16} /> </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
