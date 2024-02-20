import React from "react";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import BackButton from "@/components/BackButton";
import ProductDetails from "@/components/store/productDetails";
import { getAttributesByProductId } from "@/lib/action/getData";

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

  const attributes = productData[0]
    ? await getAttributesByProductId(productData[0].id, params.name)
    : [];

  return (
    <div className="w-full flex flex-col p-6 py-10 max-h-[800px]">
      <BackButton href={`/${params.name}`} />
      <ProductDetails
        productData={productData ? productData[0] : []}
        attributes={attributes}
        storeName={params.name}
      />
    </div>
  );
}
