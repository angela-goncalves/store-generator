"use client";

import React, { useState } from "react";
import AddCollectionsForm from "./forms/addCollectionsForm";
import Image from "next/image";
import collectionImage from "@/app/public/categories.png";
import { Button } from "./ui/button";

export default function AddCollections({
  dataCollections,
  storeId,
}: {
  dataCollections: Collections[];
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
          <div className="flex justify-center self-center h-[300px] bg-white p-6 rounded-lg gap-10">
            <div className="lg:w-[850px] relative">
              <Image
                src={collectionImage}
                fill
                style={{ objectFit: "cover" }}
                alt="image relate to edit products"
              />
            </div>
            <div className="flex flex-col gap-4 w-[500px]">
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
