"use client";

import React, { useState } from "react";
import AddCollectionsForm from "./forms/addCollectionsForm";
import Image from "next/image";
import collectionImage from "@/app/public/categories.png";
import { Button } from "./ui/button";

interface IDataCollections {
  created_at: string;
  description: string | null;
  id: string;
  image: string | null;
  name: string | null;
  store_id: string | null;
}

export default function AddCollections({
  dataCollections,
  storeId,
}: {
  dataCollections: IDataCollections[];
  storeId: string;
}) {
  const [addCollection, setAddCollection] = useState(false);
  return (
    <div>
      {addCollection || dataCollections.length > 0 ? (
        <AddCollectionsForm
          storeId={storeId}
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
            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-lg">Start Your Collections!</h3>
              <h3 className="text-sm">
                You haven't created any collections yet. Begin by crafting your
                first collection to categorize and showcase your products in a
                unique way.
              </h3>
              <Button
                onClick={() => setAddCollection(true)}
                className="w-40 font-semibold mt-4">
                <p>Add collections</p>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
