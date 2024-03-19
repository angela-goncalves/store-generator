import React from "react";
import AddCollections from "@/components/AddCollections";
import { getCollectionsOfStore } from "@/lib/action/getData";

export default async function Collections({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const collectionsData = await getCollectionsOfStore(searchParams.id);

  return (
    <div className="w-full flex flex-col items-center text-secondary">
      <div className="w-full max-w-[800px] flex flex-col h-full">
        <div className="flex justify-between">
          <h1 className="text-secondary font-bold text-3xl mt-10">
            Collections
          </h1>
        </div>
        <AddCollections
          dataCollections={collectionsData[0]}
          storeId={searchParams.id}
        />
      </div>
    </div>
  );
}
