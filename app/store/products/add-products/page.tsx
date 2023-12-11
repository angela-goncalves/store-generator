import React from "react";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import AddProductsForm from "@/components/forms/addProductsForm";
import { redirect } from "next/navigation";
import BackButton from "@/components/BackButton";

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
    collectionId: string;
  };
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("collections")
    .select()
    .eq("store_id", searchParams.id);

  if (data === null || error !== null) {
    redirect(`/store/products/add-products?id=${searchParams.id}`);
  }

  return (
    <div className="my-10 mx-2 w-full flex flex-col items-center gap-6">
      <BackButton
        query={{
          pathname: "/store/products",
          query: { id: searchParams.id },
        }}
      />
      <h1 className="text-xl">Add or edit your products</h1>
      <h2>
        But first, select the collection you want to be related to your products
      </h2>
      <AddProductsForm dataCollections={data} searchParams={searchParams} />
    </div>
  );
}

// export default FormAddProducts;
