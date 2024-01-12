"use client";
import React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ExternalLinkIcon } from "lucide-react";

export default function SideBar({ dataStore }: { dataStore: any[] }) {
  const searchParams = useSearchParams();
  const storeID = searchParams.get("id");

  const pathname = usePathname();
  const product = pathname.includes("products");
  const collections = pathname.includes("collections");

  const selectedStore = dataStore.filter((item) => item.id === storeID);

  return (
    <nav className="bg-secondary-foreground border border-r-neutral-dark p-4 pt-10 min-h-screen w-[180px] flex flex-col text-neutral-foreground items-center">
      {selectedStore.length > 0 ? (
        <ul className="flex flex-col gap-8">
          <li>
            <Link
              href={`/${selectedStore[0]?.name}`}
              target="_blank"
              rel="noopener noreferrer">
              <div className="flex gap-4 items-center">
                <p className="text-xl"> {selectedStore[0]?.name}</p>
                <ExternalLinkIcon className="w-4" />
              </div>
            </Link>
          </li>
          <li>
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
              Your store
            </Link>
          </li>
          <li>
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
          </li>
          <li>
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
          </li>
        </ul>
      ) : (
        <Link href="/add_store" className="bg-gray-400 rounded-lg ">
          Create new store
        </Link>
      )}
    </nav>
  );
}
