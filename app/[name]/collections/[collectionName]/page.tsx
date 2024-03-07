import React from "react";
import {
  getAllProductsOfCollection,
  getCollectionByName,
  getStoreByName,
} from "@/lib/action/getData";
import ProductsList from "@/components/store/productsList";

export default async function CollectionPageWithProducts({
  params,
}: {
  params: { name: string; collectionName: string };
}) {
  const nameStore = params.name ? await getStoreByName(params.name) : [];

  const collections = nameStore[0].id
    ? await getCollectionByName(params.collectionName, nameStore[0].id)
    : [];

  const allProductsOfThisCollection =
    collections[0].id && nameStore[0].id
      ? await getAllProductsOfCollection(collections[0].id, nameStore[0].id)
      : [];

  return (
    <div>
      <h1>{collections[0].name}</h1>
      <ProductsList
        storeData={nameStore[0] ? nameStore[0] : {}}
        collection
        allProducts={
          allProductsOfThisCollection[0] ? allProductsOfThisCollection : []
        }
      />
    </div>
  );
}
