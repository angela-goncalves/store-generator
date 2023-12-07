import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import React from "react";
import Link from "next/link";
import { PencilLineIcon } from "lucide-react";

export default async function Products({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: dataProducts, error } = await supabase
    .from("products")
    .select();

  if (dataProducts === null || error !== null) {
    redirect(`store/products?id=${searchParams.id}&message=products-errors`);
  }

  return (
    <div className="w-full flex flex-col items-center mt-10">
      <div className=" w-full max-w-[800px] flex flex-col gap-6">
        <Link
          href={{
            pathname: `/store/products/add-products`,
            query: { id: `${searchParams.id}` },
          }}
          className="text-blue-400 self-end">
          Add Products
        </Link>
        {dataProducts.length > 0 ? (
          <ul className="flex flex-col justify-center w-full gap-6">
            <div className="flex justify-between text-xl">
              <li>Title</li>
              <li>Description</li>
              <li>Price</li>
            </div>
            {dataProducts.map((item) => (
              <li key={item.id} className="flex justify-between">
                <p>{item.name}</p>
                <p>{item.description}</p>
                <p>$ {item.price}</p>
                <Link
                  href={{
                    pathname: "/store/products/add-products",
                    query: {
                      id: searchParams.id,
                      productId: item.id,
                      productName: item.name,
                      productDescription: item.description,
                      productPrice: item.price,
                      image: item.image,
                      collectionId: item.collectionId,
                    },
                  }}>
                  <PencilLineIcon className="mr-2 h-4 w-4" />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <h3>Don't have products yet</h3>
        )}
      </div>
    </div>
  );
}
