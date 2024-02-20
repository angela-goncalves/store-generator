"use client";
import React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ExternalLinkIcon, PencilIcon, Plus } from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";

export default function SideBar({ dataStore }: { dataStore: any[] }) {
  const searchParams = useSearchParams();
  const storeID = searchParams.get("id");

  const pathname = usePathname();
  const product = pathname.includes("products");
  const collections = pathname.includes("collections");

  const selectedStore = dataStore.filter((item) => item.id === storeID);

  return (
    <Menubar className="bg-secondary-foreground border border-r-neutral-dark px-2 pt-10 min-h-screen w-[180px] flex flex-col text-neutral-foreground items-center">
      <MenubarMenu>
        <MenubarTrigger
          className={`text-lg px-4 cursor-pointer rounded-lg ${
            !collections && !product
              ? "rounded-lg bg-neutral-medium"
              : "hover:bg-accent"
          }`}>
          Your stores
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <Link
              href={`/${selectedStore[0]?.name}`}
              className="text-lg w-full"
              target="_blank"
              rel="noopener noreferrer">
              <div className="flex items-center justify-between">
                {selectedStore[0]?.name}
                <ExternalLinkIcon className="w-4" />
              </div>
            </Link>
          </MenubarItem>
          <MenubarItem>
            <Link
              href={{
                pathname: "/store",
                query: { id: storeID },
              }}>
              <p>Home</p>
            </Link>
          </MenubarItem>
          <MenubarItem>
            <PencilIcon className="mr-2 w-3" />
            <Link
              href={{
                pathname: "/store/edit-store",
                query: { id: storeID },
              }}>
              Edit store
            </Link>
          </MenubarItem>
          <MenubarItem>
            <Plus className="mr-2 h-4 w-4" />
            <Link
              href={{
                pathname: "/add-store",
                query: { id: storeID },
              }}>
              New store
            </Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarSeparator className="text-neutral-dark w-full" />

      <Link
        href={{
          pathname: `/store/products`,
          query: { id: storeID },
        }}
        className={`text-lg my-2 p-2 rounded-lg ${
          product ? "bg-neutral-medium" : "hover:bg-accent bg-transparent"
        }`}>
        Products
      </Link>

      <Link
        href={{
          pathname: `/store/collections`,
          query: { id: storeID },
        }}
        className={`text-lg my-2 p-2 rounded-lg ${
          collections ? "bg-neutral-medium" : "hover:bg-accent bg-transparent"
        }`}>
        Collections
      </Link>
    </Menubar>
  );
}
