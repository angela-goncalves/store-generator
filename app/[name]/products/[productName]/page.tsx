import React from "react";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { capitalizeFirstLetter } from "@/lib/uppercase";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import Product from "@/components/store/product";

export default async function pageProduct({
  params,
}: {
  params: { name: string; productName: string };
}) {
  const urlNameProduct = params.productName;

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: productData, error: productError } = await supabase
    .from("products")
    .select()
    .eq("url", urlNameProduct);

  if (productError !== null) {
    redirect(`${params.name}&message=product-error`);
  }

  return (
    <div className="w-full flex flex-col p-20 max-h-[800px]">
      <BackButton href={`/${params.name}`} />
      <Product productData={productData ? productData[0] : []} />
    </div>
  );
}
