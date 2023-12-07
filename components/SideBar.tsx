"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getStore } from "@/lib/getsupabase";
import { UUID } from "crypto";

export default function SideBar() {
  const [dataStore, setDataStore] = useState<any[]>([]);
  const searchParams = useSearchParams();
  const storeID = searchParams.get("id");

  const fetch = async () => {
    const response = await getStore(storeID as UUID);
    setDataStore(response);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <nav className="bg-white dark:bg-black border border-gray-300 rounded-tr-lg p-4 min-h-screen w-[15%] flex flex-col text-neutral-foreground items-center">
      {dataStore.length > 0 ? (
        <ul className="flex flex-col gap-8">
          <div>
            <h3 className="text-lg ml-2">My Stores:</h3>
            <li className="border border-primary p-2 rounded-lg">
              <Link href={`/${dataStore[0]?.name}`}>{dataStore[0]?.name}</Link>
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
