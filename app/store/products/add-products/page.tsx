import React from "react";
import AddProductsForm from "@/components/forms/addProductsForm";
import BackButton from "@/components/BackButton";
import {
  getAttributeChildren,
  getAttributeParent,
  getCollectionsOfStore,
  getProductsToEdit,
} from "@/lib/action/getData";
import { v4 as uuidv4 } from "uuid";

export default async function FormAddProducts({
  searchParams,
}: {
  searchParams: {
    id: string;
    productId: string;
  };
}) {
  const collections = await getCollectionsOfStore(searchParams.id);

  const productToEdit = searchParams.productId
    ? await getProductsToEdit(searchParams.productId)
    : [];

  const attributeschildren = searchParams.productId
    ? await getAttributeChildren(searchParams.productId, searchParams.id)
    : [];

  const attributParent = searchParams.productId
    ? await getAttributeParent(searchParams.productId, searchParams.id)
    : [];

  const result = attributParent.map((variant) => ({
    name: variant.name,
    values: attributeschildren
      .filter((attr) => attr.attributeparent_id === variant.id)
      .map((attr) => attr.name),
  }));

  const combinations = result.reduce((acc, attribute) => {
    if (acc.length === 0) return attribute.values.map((value) => [value]);
    return acc.flatMap((combination) =>
      attribute.values.map((value) => [...combination, value])
    );
  }, [] as string[][]);

  const inventory = combinations.map((combination) => ({
    id: uuidv4(),
    combination: combination.join(", "),
    price: productToEdit[0].price,
    stock: "",
  }));

  return (
    <div className="my-10 mx-2 w-full flex flex-col items-center ">
      <BackButton
        query={{
          pathname: "/store/products",
          query: { id: searchParams.id },
        }}
      />
      <h1 className="text-2xl mb-12">
        {searchParams.productId ? "Edit" : "Add"} your products
      </h1>
      <AddProductsForm
        dataCollections={collections}
        productToEdit={productToEdit.length > 0 ? productToEdit[0] : {}}
        storeId={searchParams.id}
        inventory={inventory ?? []}
      />
    </div>
  );
}
