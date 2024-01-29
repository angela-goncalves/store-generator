"use client";
import Link from "next/link";
import React, { useState } from "react";
import { MenuIcon, SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import { capitalizeFirstLetter } from "@/lib/uppercase";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "../ui/menubar";

interface ICollections {
  created_at: string;
  description: string | null;
  id: string;
  image: string | null;
  name: string | null;
  store_id: string | null;
}

interface NavbarProps {
  dataCollections: ICollections[];
}

export default function Navbar({ dataCollections }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="p-4 w-full flex items-center">
      <Menubar className="mr-6 bg-transparent border-none">
        <MenubarMenu>
          <MenubarTrigger
            className="data-[state=open]:bg-transparent focus:bg-transparent"
            onClick={toggleMenu}>
            <MenuIcon
              className={`ml-1 h-6 w-6 transition duration-150 ${
                isMenuOpen ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          </MenubarTrigger>
          <MenubarContent className="">
            {dataCollections.length > 0 ? (
              <div>
                {dataCollections.map((item) => (
                  <MenubarItem key={item.id}>
                    <Link href="#" className="text-sm">
                      <p className=" w-32">
                        {capitalizeFirstLetter(item.name || "")}
                      </p>
                    </Link>
                  </MenubarItem>
                ))}
              </div>
            ) : (
              <MenubarItem>
                <h3>Categories</h3>
              </MenubarItem>
            )}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <div className="relative w-full max-w-xs">
        <Input type="text" className="h-8 rounded-full" />
        <SearchIcon className="absolute top-1 right-2 w-5" />
      </div>
    </div>
  );
}
