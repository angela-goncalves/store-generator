import React from "react";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Hero from "./hero";
import Collections from "./collections";

export default async function TemplateComponent({
  storeId,
}: {
  storeId: string;
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: dataStore, error: storeError } = await supabase
    .from("store")
    .select()
    .eq("id", storeId);

  const { data: dataCollections, error: collectionsError } = await supabase
    .from("collections")
    .select()
    .eq("store_id", storeId);

  if (dataStore === null || storeError !== null || dataStore === undefined) {
    redirect(`/store?id=${storeId}&message=Store-error`);
  }

  if (dataCollections === null || collectionsError !== null) {
    redirect(`/store?id=${storeId}&message=collections-error[id]`);
  }

  return (
    <div className="flex flex-col w-full">
      <Hero name={dataStore[0].name} description={dataStore[0].description} />
      {dataCollections.length > 0 ? (
        <div className="flex m-10 gap-8 items-center">
          {dataCollections.map((item) => (
            <div key={item.id} className="">
              <Collections
                nameStore={dataStore[0].name}
                name={item.name}
                description={item.description}
                collectionId={item.id}
                storeId={storeId}
              />
            </div>
          ))}
        </div>
      ) : (
        <h3>Temporary collections list</h3>
      )}
    </div>
  );
}
