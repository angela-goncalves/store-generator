import Footer from "@/components/store/footer";
import Navbar from "@/components/store/navbar";
import ShoppingBag from "@/components/store/shoppingBag";
import { getCollectionsOfStore, getStoreByName } from "@/lib/action/getData";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { name: string };
}) {
  const storeData = params.name ? await getStoreByName(params.name) : [];

  if (storeData.length === 0 || storeData === null || storeData === undefined) {
    return <p>Sorry, this page is not available</p>;
  }

  const dataCollections = await getCollectionsOfStore(storeData[0].id);

  const getCookies = cookies().get("products");

  const productsFromCookies = getCookies ? JSON.parse(getCookies.value) : [];

  const nameStore = storeData.length > 0 ? storeData[0].name : "/add-store";

  return (
    <div className="flex flex-col flex-1 justify-between w-full min-h-screen">
      <div className="flex flex-1 flex-col justify-between bg-white">
        <div className="grid grid-cols-3 justify-between items-center">
          <Navbar dataCollections={dataCollections} />
          <Link href={`/${nameStore}`} className="justify-self-center text-lg">
            {storeData.length > 0 ? storeData[0].name : "Name of your store"}
          </Link>
          <div className="justify-self-end">
            {" "}
            <ShoppingBag
              productsData={productsFromCookies}
              storeName={params.name}
              storeWhatsapp={
                storeData[0] ? storeData[0].whatsapp : "5491100000000"
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
