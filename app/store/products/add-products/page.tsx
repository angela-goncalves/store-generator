import React from "react";
import AddProductsForm from "@/components/forms/addProductsForm";
import BackButton from "@/components/BackButton";
import {
  getAttributesByProductId,
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
    message?: string;
  };
}) {
  const collections = await getCollectionsOfStore(searchParams.id);

  const productToEdit = searchParams.productId
    ? await getProductsToEdit(searchParams.productId)
    : [];

  const inventoryList: Inventory[] = searchParams.productId
    ? await getInventory(searchParams.productId, searchParams.id)
    : [];

  const inventoryDefault = inventoryList.map((item) => {
    return {
      id: item.id,
      created_at: item.created_at,
      attributeschildren: item.attributeschildren,
      price: item.price,
      product_id: item.product_id,
      stock_level: item.stock_level,
    };
  });
  const attributes: Attributes[] = searchParams.productId
    ? await getAttributesByProductId(searchParams.productId, searchParams.id)
    : [];

  const attributesDefault = attributes.map((item) => {
    return {
      id: item.id,
      name: item.name,
      created_at: item.created_at,
      product_id: item.product_id,
      children_values: item.children_values,
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
        message={searchParams.message || ""}
      />
    </div>
  );
}
