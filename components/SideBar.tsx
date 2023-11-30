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

  // console.log("storeID in store", storeID);
  const fetch = async () => {
    const response = await getStore(storeID as UUID);
    setDataStore(response);
  };
  useEffect(() => {
    fetch();
  }, []);
  console.log("storeID", storeID);

  return (
    <nav className="bg-gray-800 p-4 min-h-screen w-[15%] flex flex-col items-center">
      {/* {dataStore.length > 0 ? ( */}
      <ul>
        <li className="my-2">
          <Link href="/">Inicio</Link>
        </li>
        <li className="my-2">
          <Link href="/add_store" className="bg-gray-400 rounded-lg px-4 py-2">
            New store
          </Link>
        </li>
        <div>
          <h3 className="text-lg">My Stores:</h3>
          <li>
            <Link href={`/store`} className="underline underline-offset-4">
              {dataStore[0]?.name}
            </Link>
          </li>
        </div>
        <li>
          <Link
            href={{
              pathname: "/store/collections",
              query: { id: storeID },
            }}
            className="text-lg underline underline-offset-4 hover:no-underline">
            Collections
          </Link>
        </li>
        <li>
          <Link
            href={{
              pathname: "/store/products",
              query: { id: storeID },
            }}
            className="text-lg underline underline-offset-4 hover:no-underline">
            Products
          </Link>
        </li>
      </ul>
      {/* ) : (
        <Link href="/add_store" className="bg-gray-400 rounded-lg ">
          Create new store
        </Link>
      )} */}
    </nav>
  );
}
