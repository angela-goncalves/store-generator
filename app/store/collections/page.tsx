import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import React from "react";
import BackButton from "@/components/BackButton";
import AddCollections from "@/components/AddCollections";

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
    <div className="w-full flex flex-col items-center text-secondary">
      <div className="w-full max-w-[800px] flex flex-col h-full">
        <div className="flex justify-between">
          <h1 className="text-secondary font-bold text-3xl mt-10">
            Collections
          </h1>
        </div>
        <AddCollections
          dataCollections={dataCollections}
          storeId={searchParams.id}
        />
      </div>
    </div>
  );
}
