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
  MenubarShortcut,
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
        <MenubarTrigger className="text-xl">Your stores</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <Link
              href={{
                pathname: "/store",
                query: { id: storeID },
              }}
              className={`text-lg ${
                !collections && !product
                  ? "p-4 rounded-lg bg-neutral-medium"
                  : "px-4"
              }`}>
              {selectedStore[0]?.name}
            </Link>
          </MenubarItem>
          <MenubarItem>
            <Link
              href={`/${selectedStore[0]?.name}`}
              target="_blank"
              rel="noopener noreferrer">
              <div className="flex gap-4 items-center">
                <p>Your store domain </p>
                <ExternalLinkIcon className="w-4" />
              </div>
            </Link>
          </MenubarItem>
          <MenubarItem>
            <PencilIcon className="mr-2 w-3" />
            <Link
              href={{
                pathname: "/add-store",
                query: { id: storeID },
              }}>
              Edit store
            </Link>
          </MenubarItem>
          <MenubarItem>
            <Plus className="mr-2 h-4 w-4" />
            <Link href="/add-store">New store</Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarSeparator className="text-neutral-dark w-full" />

      <Link
        href={{
          pathname: `/store/products`,
          query: { id: storeID },
        }}
        className={`text-lg underline underline-offset-4 ${
          product
            ? "hover:underline bg-neutral-medium p-4 rounded-lg"
            : "hover:no-underline bg-transparent p-4"
        }`}>
        Products
      </Link>

      <Link
        href={{
          pathname: `/store/collections`,
          query: { id: storeID },
        }}
        className={`text-lg underline underline-offset-4 ${
          collections
            ? "hover:underline bg-neutral-medium p-4 rounded-lg"
            : "hover:no-underline bg-transparent p-4"
        }`}>
        Collections
      </Link>
    </Menubar>
  );
}
