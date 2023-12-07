import React from "react";
import Product from "./product";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { capitalizeFirstLetter } from "@/lib/uppercase";

export default async function Collections({
  name,
  description,
  collectionId,
  storeId,
  nameStore,
}: {
  name: string;
  description: string;
  collectionId: string;
  storeId: string;
  nameStore: string;
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: dataProducts, error: productsError } = await supabase
    .from("products")
    .select()
    .eq("collection_id", collectionId);
  if (dataProducts === null || productsError !== null) {
    redirect(`/store?id=${storeId}&message=products-error`);
  }
  return (
    <div className="">
      <p className="text-xl">{capitalizeFirstLetter(name)}</p>
      {description !== "" ? (
        <p className="text-lg">{description}</p>
      ) : (
        <p className="h-7">{""}</p>
      )}
      {dataProducts.length > 0 ? (
        <div className="flex gap-8">
          {dataProducts.map((item) => (
            <div
              key={item.id}
              className="bg-secondary text-neutral-light rounded-lg p-6 hover:shadow-lg hover:shadow-neutral-dark w-[200px] h-[100px]">
              <Product
                id={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
                nameStore={nameStore}
              />
            </div>
          ))}
        </div>
      ) : (
        <h3>temporary list of prducts</h3>
      )}
    </div>
  );
}
