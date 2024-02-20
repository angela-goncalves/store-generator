import ProductsList from "@/components/store/productsList";
import { Button } from "@/components/ui/button";
import { getAllProductsOfStore, getStoreByName } from "@/lib/action/getData";

import React from "react";

export default async function AllProductsPage({
  params,
}: {
  params: { name: string };
}) {
  const storeData =
    params.name.length > 0 ? await getStoreByName(params.name) : [];

  const allProductsOfStore = storeData[0]
    ? await getAllProductsOfStore(storeData[0].id)
    : [];

  return (
    <div>
      <ProductsList
        storeData={storeData[0] ? storeData[0] : {}}
        allProducts={allProductsOfStore[0] ? allProductsOfStore : []}
      />
    </div>
  );
}
