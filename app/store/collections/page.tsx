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
      <div className="w-full max-w-[800px] flex flex-col">
        <Link
          href={{
            pathname: "/store/collections/add-collections",
            query: { id: storeId },
          }}
          className="text-blue-400 self-end">
          Add collections
        </Link>
        {dataCollections.length > 0 ? (
          <ul className="flex flex-col gap-4">
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
          <div className="">
            <h3>Don't have collection yet</h3>
          </div>
        )}
      </div>
    </div>
  );
}
