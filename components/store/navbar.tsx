import Link from "next/link";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import { capitalizeFirstLetter } from "@/lib/uppercase";

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
  return (
    <div className="p-4 w-full grid grid-cols-3 justify-between items-center">
      <div className="flex items-center">
        <div>
          {dataCollections.length > 0 ? (
            <NavigationMenu>
              <NavigationMenuList>
                <ul className="flex gap-4">
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-transparent" />
                    <NavigationMenuContent className="min-w-[200px] px-6 pt-4 pb-5 bg-white">
                      <NavigationMenuLink>
                        {dataCollections.map((item) => (
                          <Link href="#" key={item.id} className="text-sm">
                            <p className=" w-32">
                              {capitalizeFirstLetter(item.name || "")}
                            </p>
                          </Link>
                        ))}
                      </NavigationMenuLink>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </ul>
              </NavigationMenuList>
            </NavigationMenu>
          ) : (
            <h3>Navbar</h3>
          )}
        </div>
        <div className="relative">
          <Input type="text" className="w-full max-w-xs h-8 rounded-full" />
          <SearchIcon className="absolute top-1 right-2 w-5" />
        </div>
      </div>
      <Link href={`/${nameStore}`} className="justify-self-center text-lg">
        {nameStore || "Name of your store"}
      </Link>
    </div>
  );
}
