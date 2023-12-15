"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { handleInsertCollections } from "@/lib/insertSupabase";
import { Button } from "../ui/button";
import { v4 as uuidv4 } from "uuid";

type FormDataType = {
  name: string;
  id: string;
};

export default function AddCollectionsForm({ storeId }: { storeId: string }) {
  const myUUID = uuidv4();
  const [collectionslist, setCollectionslist] = useState<FormDataType[]>([
    { name: "", id: myUUID },
  ]);

  const handleInputChange = (index: number, field: "name", value: string) => {
    const updatedCollection = [...collectionslist];
    updatedCollection[index][field] = value;
    setCollectionslist(updatedCollection);
  };

  const addNewCollection = () => {
    setCollectionslist([...collectionslist, { name: "", id: myUUID }]);
  };
  const deleteCollectionAdded = (idcollectionAdded: string) => {
    const collectionslistCopy = [...collectionslist];
    const deletedCollections = collectionslistCopy.filter(
      (item) => item.id === idcollectionAdded
    );
    setCollectionslist(deletedCollections);
  };
  return (
    <div className="w-1/2 max-w-[500px]">
      <form
        action={() => handleInsertCollections(collectionslist, storeId)}
        className="flex flex-col"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}>
        {collectionslist.map((item, index) => (
          <div
            key={item.id}
            className="flex justify-between mt-6 items-center gap-4">
            <Input
              type="text"
              name={item.name}
              className=" w-full"
              value={item.name}
              onChange={(e) => handleInputChange(index, "name", e.target.value)}
              onKeyDown={(e) => {
                if (e.code === "Enter") return addNewCollection();
              }}
              placeholder="Name of the collection"
            />
            {collectionslist.length > 1 && (
              <Button
                variant="outline"
                type="button"
                className="w-max px-6 rounded-lg py-4 self-start bg-transparent border-primary"
                onClick={() => deleteCollectionAdded(item.id)}>
                x
              </Button>
            )}
          </div>
        ))}
        <Button
          type="button"
          className="my-6 px-6 rounded-lg py-4 self-start bg-transparent border-primary"
          onClick={addNewCollection}
          variant="outline">
          add one more
        </Button>
        <Button
          className="border max-w-[200px] self-end rounded-lg px-6 py-4 my-6"
          type="submit">
          submit
        </Button>
      </form>
    </div>
  );
}
