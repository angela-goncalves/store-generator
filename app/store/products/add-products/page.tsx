import React from "react";
import AddProductsForm from "@/components/forms/addProductsForm";
import BackButton from "@/components/BackButton";
import { getCollectionsOfStore, getProductsToEdit } from "@/lib/action/getData";

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

  return (
    <div className="my-10 mx-2 w-full flex flex-col items-center ">
      <BackButton
        query={{
          pathname: "/store/products",
          query: { id: searchParams.id },
        }}
      />
      <h1 className="text-2xl mb-12">Add or edit your products</h1>
      <h2>Select the collection you want to be related to your products</h2>
      <AddProductsForm
        dataCollections={collections || []}
        productToEdit={productToEdit.length > 0 ? productToEdit[0] : {}}
        storeId={searchParams.id}
      />
    </div>
  );
}
