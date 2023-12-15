import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import React from "react";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import Image from "next/image";
import collectionImage from "@/app/public/categories.png";
import AddCollectionsForm from "@/components/forms/addCollectionsForm";

export default async function Collections({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const storeId = searchParams.id;

  const { data: dataCollections, error } = await supabase
    .from("collections")
    .select()
    .eq("store_id", storeId);

  if (dataCollections === null || error !== null) {
    redirect(`/store/collections?id=${storeId}&message=collections errors`);
  }

  return (
    <div className="w-full flex flex-col items-center mt-10 text-secondary">
      <BackButton
        query={{
          pathname: "/store",
          query: { id: searchParams.id },
        }}
      />
      <div className="w-full max-w-[800px] flex flex-col h-full">
        <div className="flex justify-between">
          <h1 className="text-secondary font-bold text-3xl mt-10">
            Collections
          </h1>
        </div>
        {dataCollections.length > 0 ? (
          <AddCollectionsForm
            storeId={searchParams.id}
            dataCollections={dataCollections}
          />
        ) : (
          <div className="h-full mt-20">
            <div className="flex justify-center self-center bg-white p-6 rounded-lg gap-10">
              <Image
                src={collectionImage}
                width={400}
                height={400}
                alt="image relate to edit products"
              />
              <div className="flex flex-col gap-2">
                <h3 className="font-bold text-lg">Start Your Collections!</h3>
                <h3 className="text-sm">
                  You haven't created any collections yet. Begin by crafting
                  your first collection to categorize and showcase your products
                  in a unique way.
                </h3>
                <Link
                  href={{
                    pathname: "/store/collections/add-collections",
                    query: { id: storeId },
                  }}>
                  <p className="p-4 bg-primary text-primary-foreground rounded-lg font-semibold my-4 w-40 text-center">
                    Add collections
                  </p>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
