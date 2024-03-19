"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { updateCollections } from "@/lib/action/updateSupabase";

interface IUpdateCollections {
  collection: Collections;
  storeId: string;
}

export default function UpdateCollections({
  collection,
  storeId,
}: IUpdateCollections) {
  const [updateCollection, setUpdateCollection] = useState<Collections>({
    created_at: collection.created_at,
    description: collection.description,
    id: collection.id,
    image: collection.image,
    name: collection.name,
    store_id: collection.store_id,
    user_id: collection.user_id,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateCollection({
      ...updateCollection,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-1/2 max-w-[500px]">
      <form
        action={() => updateCollections(updateCollection, storeId)}
        className="flex flex-col">
        <div className="text-2xl mt-6">
          <label htmlFor="name">Name</label>
          <Input
            type="text"
            name="name"
            className="mt-2"
            value={updateCollection.name || ""}
            onChange={handleChange}
            placeholder="Name of the collection"
            required
          />
        </div>
        <div className="text-2xl mt-6">
          <label htmlFor="descriptionCollection">Description</label>
          <Input
            type="text"
            name="descriptionCollection"
            className="mt-2"
            value={updateCollection.description || ""}
            onChange={handleChange}
            placeholder="Description of the collection"
          />
        </div>
        <Button
          type="submit"
          variant="outline"
          className="border max-w-[200px] self-end rounded-lg px-6 py-4 my-6">
          Update collection
        </Button>
      </form>
    </div>
  );
}
