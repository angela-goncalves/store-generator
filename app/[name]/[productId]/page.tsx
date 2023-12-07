import React from "react";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { capitalizeFirstLetter } from "@/lib/uppercase";
import Link from "next/link";

export default async function pageProduct({
  params,
}: {
  params: { name: string; productId: string };
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: dataProducts, error: productsError } = await supabase
    .from("products")
    .select()
    .eq("id", params.productId);
  if (dataProducts === null || productsError !== null) {
    redirect(`${params.name}/${params.productId}&message=products-error`);
  }

  return (
    <div className="w-full flex flex-col justify-center items-center h-screen">
      <div className="w-full max-w-[800px]">
        <Link href={`/${params.name}`} className="self-start">
          Back
        </Link>
        <div className="flex flex-col gap-6 bg-secondary p-4 text-neutral-light rounded-lg w-full mt-4">
          <h2 className="text-2xl">
            {capitalizeFirstLetter(dataProducts[0].name)}
          </h2>
          <div className=" border border-neutral-dark rounded-xl p-8">
            <p>{capitalizeFirstLetter(dataProducts[0].description)}</p>
            <p>${dataProducts[0].price}</p>
          </div>
        </div>
        {/* <Link href={`${params.name}/${params.productId}`}>
          Add to shopping bag
        </Link> */}
      </div>
    </div>
  );
}
