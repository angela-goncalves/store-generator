"use client";
import Link from "next/link";
import React, { useState } from "react";
import { MenuIcon } from "lucide-react";
import { capitalizeFirstLetter } from "@/lib/uppercase";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
  nameStore: string;
}

export default function Navbar({ dataCollections, nameStore }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenuAndRedirect = (url: string) => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="m-4  flex items-center gap-6">
      <Sheet>
        <SheetTrigger>
          <MenuIcon
            className={`ml-1 h-6 w-6 transition duration-150 ${
              isMenuOpen ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          />
        </SheetTrigger>
        <SheetContent className="" side="left">
          {dataCollections.length > 0 ? (
            <div className="flex flex-col gap-6">
              <SheetHeader className="self-center mb-12">
                <SheetTitle className="text-4xl">{nameStore}</SheetTitle>
              </SheetHeader>
              <SheetClose asChild>
                <Link href={`/${nameStore}`} className="hover:font-semibold">
                  Home
                </Link>
              </SheetClose>
              {dataCollections.map((item) => (
                <SheetClose asChild key={item.id}>
                  <Link
                    href={`/${nameStore}/collections/${item.name}`}
                    scroll
                    className="hover:font-semibold"
                    key={item.id}>
                    <p className="w-32 text-xl">
                      {capitalizeFirstLetter(item.name || "")}
                    </p>
                  </Link>
                </SheetClose>
              ))}
              <SheetClose asChild>
                <Link
                  href={`/${nameStore}/products`}
                  className="hover:font-semibold">
                  All products
                </Link>
              </SheetClose>
            </div>
          ) : (
            <h3>Categories</h3>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
