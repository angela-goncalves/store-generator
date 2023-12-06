import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import React from "react";
import Link from "next/link";
import { PencilLineIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { capitalizeFirstLetter } from "@/lib/uppercase";
import { UUID } from "crypto";
import DeleteCollection from "@/components/forms/deleteCollection";

export default async function Collections({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: dataCollections, error } = await supabase
    .from("collections")
    .select();
  const storeId = searchParams.id;

  if (dataCollections === null || error !== null) {
    redirect(`/store/collections?id=${storeId}&message=collections errors`);
  }

  return (
    <div className="w-full flex flex-col items-center mt-10 text-secondary">
      <div className="w-full max-w-[800px] flex flex-col">
        <Link
          href={{
            pathname: "/store/collections/add_collections",
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
                          collectionid: `${item.id}`,
                          collectiontitle: `${item.name}`,
                          collectiondescription: `${item.description}`,
                        },
                      }}>
                      <PencilLineIcon className="mr-2 h-4 w-4" />
                    </Link>
                    <DeleteCollection
                      collectionId={item.id}
                      storeId={storeId as UUID}
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
