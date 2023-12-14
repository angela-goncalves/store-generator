import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import React from "react";
import Link from "next/link";
import { PencilLineIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { capitalizeFirstLetter } from "@/lib/uppercase";
import DeleteCollection from "@/components/forms/deleteCollection";
import BackButton from "@/components/BackButton";
import Image from "next/image";
import collectionImage from "@/app/public/categories.png";

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
      <div className="w-full max-w-[800px] flex flex-col h-full gap-6">
        <h1 className="text-secondary font-bold text-3xl">Collections</h1>
        {dataCollections.length > 0 ? (
          <ul className="flex flex-col gap-4 mt-14">
            <h3 className="text-2xl">Title</h3>
            {dataCollections.map((item) => (
              <div key={item.id}>
                <li className="flex justify-between gap-4">
                  <h3>{capitalizeFirstLetter(item.name)}</h3>
                  <div className="flex gap-2 items-center">
                    <Link
                      href={{
                        pathname: `/store/collections/edit-collection`,
                        query: {
                          id: storeId,
                          collectionId: `${item.id}`,
                          collectionTitle: `${item.name}`,
                          collectionDescription: `${item.description}`,
                        },
                      }}>
                      <PencilLineIcon className="mr-2 h-4 w-4" />
                    </Link>
                    <DeleteCollection
                      collectionId={item.id}
                      storeId={storeId}
                    />
                  </div>
                </li>
                <Separator className="bg-neutral-dark" />
              </div>
            ))}
          </ul>
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
