import React from "react";
import {
  getAllProductsOfStore,
  getCollectionsOfStore,
  getStore,
} from "@/lib/action/getData";
import Products from "./products";
import Collections from "./collections";
import Link from "next/link";
interface ICollections {
  created_at: string;
  description: string | null;
  id: string;
  image: string | null;
  name: string | null;
  store_id: string | null;
}

export default async function TemplateComponent({
  storeId,
  storeForUser,
}: {
  storeId: string;
  storeForUser: boolean;
}) {
  const storeData = await getStore(storeId);
  const dataCollections: ICollections[] = await getCollectionsOfStore(storeId);
  const productsData = await getAllProductsOfStore(storeId);

  return (
    <div className="flex flex-col p-10 pt-0 items-center ">
      <div className="self-center">
        {dataCollections.length > 0 ? (
          <div className="my-10 gap-4 grid grid-cols-2 grid-rows-2">
            {dataCollections.slice(0, 4).map((item) => (
              <Collections
                key={item.id}
                collectionId={item.id}
                storeId={storeId}
                storeForUser={storeForUser}
                nameStore={storeData.length > 0 ? storeData[0].name : ""}
              />
            ))}
          </div>
        ) : (
          <Link
            href={
              storeForUser
                ? "#"
                : { pathname: "/store/collections", query: { id: storeId } }
            }>
            <div className="grid grid-cols-3 gap-8 my-10">
              <div className="flex-col flex justify-center w-full min-w-[200px] border border-gray-400 h-96 rounded-lg">
                <div className="self-center">
                  <p>Category name</p>
                </div>
              </div>
              <div className="flex-col flex justify-center w-full min-w-[200px] border border-gray-400 h-96 rounded-lg">
                <div className="self-center">
                  <p>Category name</p>
                </div>
              </div>
              <div className="flex-col flex justify-center w-full min-w-[200px] border border-gray-400 h-96 rounded-lg">
                <div className="self-center">
                  <p>Category name</p>
                </div>
              </div>
            </div>
          </Link>
        )}
      </div>
      <div className="">
        {productsData.length > 0 ? (
          <div className="flex flex-col gap-8 my-10 ">
            {productsData.slice(0, 12).map((item) => (
              <div
                key={item.id}
                className="bg-background rounded-lg dark:bg-secondary text-secondary dark:text-neutral-light shadow-sm w-72">
                <Products
                  productData={item}
                  storeId={storeId}
                  storeForUser={storeForUser}
                  nameStore={storeData.length > 0 ? storeData[0].name : ""}
                />
              </div>
            ))}
          </div>
        ) : (
          <Link
            href={
              storeForUser
                ? "#"
                : {
                    pathname: "/store/products/add-products",
                    query: { id: storeId },
                  }
            }>
            <div className="grid grid-cols-3 gap-8 my-10">
              <div className="flex-col flex w-72 border border-gray-400 h-72 rounded-lg">
                <div className="h-48 p-2">Product image</div>
                <div className="p-4">
                  <p>Product name</p>
                  <p>$ 000</p>
                </div>
              </div>
              <div className="flex-col flex w-72 border border-gray-400 h-72 rounded-lg">
                <div className="h-48 p-2">Product image</div>
                <div className="p-4">
                  <p>Product name</p>
                  <p>$ 000</p>
                </div>
              </div>
              <div className="flex-col flex w-72 border border-gray-400 h-72 rounded-lg">
                <div className="h-48 p-2">Product image</div>
                <div className="p-4">
                  <p>Product name</p>
                  <p>$ 000</p>
                </div>
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
