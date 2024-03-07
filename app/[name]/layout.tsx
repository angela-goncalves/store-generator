import Footer from "@/components/store/footer";
import Navbar from "@/components/store/navbar";
import ShoppingBag from "@/components/store/shoppingBag";
import { Input } from "@/components/ui/input";
import { getCollectionsOfStore, getStoreByName } from "@/lib/action/getData";
import { MenuIcon, SearchIcon } from "lucide-react";

import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

export default async function layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { name: string };
}) {
  const storeData = params.name ? await getStoreByName(params.name) : [];

  if (storeData.length === 0) {
    return <p>Sorry, this page is not available</p>;
  }

  const dataCollections = await getCollectionsOfStore(storeData[0].id);

  const getCookies = cookies().get("products");

  const productsFromCookies = getCookies ? JSON.parse(getCookies.value) : [];

  const nameUrlStore = storeData.length > 0 ? storeData[0].name : "/add-store";

  return (
    <div className="flex flex-col flex-1 justify-between w-full min-h-screen">
      <div className="flex flex-1 flex-col justify-between bg-white">
        <div className="flex justify-between items-center w-full p-4">
          <div className="flex items-center w-[25%]">
            <Navbar
              dataCollections={dataCollections}
              nameStore={storeData[0].name}
            />
            <div className="relative w-full max-w-xs">
              <Input type="text" className="h-8 rounded-full" />
              <SearchIcon className="absolute top-1 right-2 w-5" />
            </div>
          </div>
          <Link
            href={`/${nameUrlStore}`}
            className="text-lg w-[25%] text-center">
            {storeData.length > 0 ? storeData[0].name : "Name of your store"}
          </Link>
          <div className="w-[25%] text-end">
            <ShoppingBag
              productsData={productsFromCookies}
              storeName={params.name}
              storeWhatsapp={
                storeData[0] && storeData[0].whatsapp
                  ? storeData[0].whatsapp
                  : storeData[0] && storeData[0].phone
                  ? storeData[0].phone
                  : "0000000"
              }
            />
          </div>
        </div>
        <div>{children}</div>
        <Footer storeData={storeData.length > 0 ? storeData[0] : []} />
      </div>
    </div>
  );
}
