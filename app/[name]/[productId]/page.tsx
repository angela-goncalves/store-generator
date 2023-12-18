import React from "react";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { capitalizeFirstLetter } from "@/lib/uppercase";
import Link from "next/link";
import Image from "next/image";
import BackButton from "@/components/BackButton";

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
    <div className="w-full flex flex-col p-20 max-h-[800px]">
      <BackButton href={`/${params.name}`} />
      <div className="flex w-full justify-around ">
        <div className="max-w-xs flex">
          <div className="flex flex-col self-end">
            <h3>Composition</h3>
            <p className="text-sm mt-3">
              We work with monitoring programs to guarantee compliance with the
              social, environmental, and health and safety standards of our
              products. To assess its compliance, we have developed an audit
              program and plans for continual improvement.
            </p>
          </div>
        </div>
        <div className="flex flex-col mt-10">
          <h2 className="text-3xl">
            {capitalizeFirstLetter(dataProducts[0].name)}
          </h2>
          <div className="flex gap-4 mt-14 bg-secondary p-4">
            <img
              className="max-w-[300px]"
              src={dataProducts[0].image}
              // width={200}
              // height={300}
              alt={`${dataProducts[0].name} image`}
            />
            <img
              className="max-w-[300px]"
              src={dataProducts[0].image}
              // width={200}
              // height={300}
              alt={`${dataProducts[0].name} image`}
            />
          </div>
        </div>
        <div className="flex flex-col justify-center gap-14">
          <div className="p-2 max-w-xs h-min">
            <p className="text-sm">
              {capitalizeFirstLetter(dataProducts[0].description)}
            </p>
          </div>
          <p className="text-2xl">${dataProducts[0].price}</p>
          <div className="border border-secondary mt-6">
            <Link href="#">
              <p className="p-4 text-center text-md">Add to shopping bag</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
