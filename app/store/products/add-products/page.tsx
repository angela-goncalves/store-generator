import React from "react";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import AddProductsForm from "@/components/forms/addProductsForm";
import { redirect } from "next/navigation";

interface IProducts {
  created_at: string;
  description: string | null;
  id: string;
  image: string | null;
  name: string | null;
  store_id: string | null;
}

export default async function FormAddProducts({
  searchParams,
}: {
  searchParams: {
    id: string;
    productId: string;
    productName: string;
    productDescription: string;
    productPrice: string;
    productImage: string;
    collection_id: string;
  };
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.from("collections").select();

  const dataCollections: IProducts[] | null = data;
  if (dataCollections === null || error !== null) {
    redirect(`/store/products/add_products?id=${searchParams.id}`);
  }
  return (
    <div className="my-10 mx-2 w-full flex flex-col items-center gap-6">
      <h1 className="text-xl">Add or edit your products</h1>
      <h2>
        But first, select the collection you want to be related to your products
      </h2>
      <AddProductsForm
        dataCollections={dataCollections}
        storeid={searchParams.id}
        productId={searchParams.productId}
        productName={searchParams.productName}
        productDescription={searchParams.productDescription}
        productPrice={searchParams.productPrice}
        productImage={searchParams.productImage}
        collection_id={searchParams.collection_id}
      />
    </div>
  );
}

// export default FormAddProducts;
