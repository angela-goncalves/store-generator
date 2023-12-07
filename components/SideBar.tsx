"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { UUID } from "crypto";
import { getCollections, getStore } from "@/lib/getSupabase";

export default function SideBar() {
  const [dataStore, setDataStore] = useState<any[]>([]);
  const [collections, setCollections] = useState<any[]>([]);
  const searchParams = useSearchParams();
  const storeID = searchParams.get("id");

  // console.log("storeID in store", storeID);
  const fetch = async () => {
    const response = await getStore(storeID as UUID);
    setDataStore(response);
  };
  const getCollectionsToshowProducts = async () => {
    const response = await getCollections(storeID as UUID);
    setCollections(response);
  };

  useEffect(() => {
    fetch();
    getCollectionsToshowProducts();
  }, []);

  return (
    <nav className="bg-white dark:bg-black border border-gray-300 rounded-tr-lg p-4 min-h-screen w-[15%] flex flex-col text-neutral-foreground items-center">
      {dataStore.length > 0 ? (
        <ul>
          <div>
            <h3 className="text-lg">My Stores:</h3>
            <li>
              <Link
                href={`/store?id=${dataStore[0].id}`}
                className="underline underline-offset-4">
                {dataStore[0]?.name}
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
          {collections.length > 0 && (
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
          )}
        </ul>
      ) : (
        <Link href="/add_store" className="bg-gray-400 rounded-lg ">
          Create new store
        </Link>
      )}
    </nav>
  );
}
