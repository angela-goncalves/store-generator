"use client";
import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function SideBar({ dataStore }: { dataStore: any[] }) {
  const searchParams = useSearchParams();
  const storeID = searchParams.get("id");
  const selectedStore = dataStore.filter((item) => item.id === storeID);

  return (
    <nav className="bg-white dark:bg-black border border-gray-300 rounded-tr-lg p-4 min-h-screen w-[180px] flex flex-col text-neutral-foreground items-center">
      {selectedStore.length > 0 ? (
        <ul className="flex flex-col gap-8">
          <div>
            <h3 className="text-lg ml-2">My Stores:</h3>
            <li className="border border-primary p-2 rounded-lg">
              <Link
                href={`/${selectedStore[0]?.name}`}
                target="_blank"
                rel="noopener noreferrer">
                {selectedStore[0]?.name}
              </Link>
            </li>
          </div>
          <li>
            <Link
              href={{
                pathname: `/store/collections`,
                query: { id: storeID },
              }}
              className="text-lg underline underline-offset-4 hover:no-underline">
              Collections
            </Link>
          </li>
          <li>
            <Link
              href={{
                pathname: `/store/products`,
                query: { id: storeID },
              }}
              className="text-lg underline underline-offset-4 hover:no-underline">
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
