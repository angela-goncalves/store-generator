import React from "react";
import Hero from "./hero";
import {
  getAllProductsOfStore,
  getCollectionsOfStore,
  getStore,
} from "@/lib/action/getData";
import { capitalizeFirstLetter } from "@/lib/uppercase";
import Product from "./product";
import Collections from "./collections";

export default async function TemplateComponent({
  storeId,
  storeForUser,
}: {
  storeId: string;
  storeForUser: boolean;
}) {
  const storeData = await getStore(storeId);
  const collectionsData = await getCollectionsOfStore(storeId);
  const productsData = await getAllProductsOfStore(storeId);

  return (
    <div className="flex flex-col">
      <Hero
        name={storeData.length > 0 ? storeData[0].name : ""}
        description={storeData.length > 0 ? storeData[0].description : ""}
      />
      <div className="flex flex-col p-10">
        {collectionsData.length > 0 ? (
          <div className="flex m-10 gap-8 items-center">
            {collectionsData.map((item) => (
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
          <h3>Temporary collections list</h3>
        )}
        {productsData.length > 0 ? (
          <div className="flex flex-col gap-8">
            {productsData.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-secondary text-secondary dark:text-neutral-light shadow-md hover:shadow-2xl hover:shadow-neutral-dark w-60">
                <Product
                  id={item.id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                  storeId={storeId}
                  storeForUser={storeForUser}
                  nameStore={storeData.length > 0 ? storeData[0].name : ""}
                />
              </div>
            ))}
          </div>
        ) : (
          <h3>your product</h3>
        )}
      </div>
    </div>
  );
}
