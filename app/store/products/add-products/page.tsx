import React from "react";
import AddProductsForm from "@/components/forms/addProductsForm";
import BackButton from "@/components/BackButton";
import {
  getAttributes,
  getCollectionsOfStore,
  getInventory,
  getProductsToEdit,
} from "@/lib/action/getData";

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

  const inventoryList = searchParams.productId
    ? await getInventory(searchParams.productId, searchParams.id)
    : [];

  const inventoryDefault = inventoryList.map((item) => {
    return {
      id: item.id,
      combination: item.attributeschildren,
      price: item.price,
      stock: item.stock_level,
    };
  });
  const attributeParentTable = searchParams.productId
    ? await getAttributes(searchParams.productId, searchParams.id)
    : [];

  const attributesDefault = attributeParentTable.map((item) => {
    return {
      id: item.id,
      name: item.name,
      childrenValue: item.children_values,
    };
  });

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
        inventory={inventoryDefault ?? []}
        attributesDefault={attributesDefault ?? []}
      />
    </div>
  );
}
