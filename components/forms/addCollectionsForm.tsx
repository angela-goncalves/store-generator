"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { handleInsertCollections } from "@/lib/insertSupabase";
import { Button } from "../ui/button";
import { v4 as uuidv4 } from "uuid";
import { PencilLineIcon, Plus, XIcon } from "lucide-react";
import { capitalizeFirstLetter } from "@/lib/uppercase";
import Link from "next/link";
import { Separator } from "../ui/separator";
import DeleteDialog from "../DeleteDialog";
import { handleDeleteCollection } from "../../lib/deleteSupabase";

type FormDataType = {
  name: string;
  id: string;
};
interface IDataCollections {
  created_at: string;
  description: string | null;
  id: string;
  image: string | null;
  name: string | null;
  store_id: string | null;
}

export default function AddCollectionsForm({
  storeId,
  dataCollections,
}: {
  storeId: string;
  dataCollections: IDataCollections[];
}) {
  const [collectionslist, setCollectionslist] = useState<FormDataType[]>([
    { name: "", id: uuidv4() },
  ]);

  const [addCollection, setAddCollection] = useState(
    dataCollections.length === 0 ? true : false
  );

  const handleInputChange = (index: number, field: "name", value: string) => {
    const updatedCollection = [...collectionslist];
    updatedCollection[index][field] = value;
    setCollectionslist(updatedCollection);
  };

  const addNewCollection = () => {
    setCollectionslist([...collectionslist, { name: "", id: uuidv4() }]);
  };

  const deleteCollectionAdded = (idcollectionAdded: string) => {
    const deletedCollections = collectionslist.filter(
      (item) => item.id !== idcollectionAdded
    );
    setCollectionslist(deletedCollections);
  };

  return (
    <div className="w-full flex flex-col mb-10">
      <Button
        variant="ghost"
        onClick={() => {
          setAddCollection(!addCollection);
          if (collectionslist.length === 0) addNewCollection();
        }}
        className="flex border self-end items-center border-secondary rounded-lg text-sm p-2 mb-4 text-center gap-2">
        <Plus className="w-4 " />
        <p className="text-primary-foreground">Add new collection</p>
      </Button>
      {dataCollections.length > 0 && (
        <div className="flex-col flex gap-6">
          <h3 className="mt-8 text-2xl">Title</h3>
          <ul className="flex flex-col gap-4 mt-">
            {dataCollections.map((item) => (
              <div key={item.id}>
                <li className="flex justify-between gap-4">
                  <h3>{capitalizeFirstLetter(item.name || "")}</h3>
                  <div className="flex gap-2 items-center">
                    <Link
                      href={{
                        pathname: `/store/collections/edit-collection`,
                        query: {
                          id: storeId,
                          collectionId: `${item.id}`,
                        },
                      }}>
                      <PencilLineIcon className="mr-2 h-4 w-4" />
                    </Link>
                    <DeleteDialog
                      id={item.id}
                      storeId={storeId}
                      deleteFunction={handleDeleteCollection}
                    />
                  </div>
                </li>
                <Separator className="bg-neutral-dark" />
              </div>
            ))}
          </ul>
        </div>
      )}
      {addCollection && (
        <form
          action={() => {
            handleInsertCollections(collectionslist, storeId);
            setCollectionslist([]);
            setAddCollection(false);
          }}
          className="flex flex-col mt-2"
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
                onChange={(e) =>
                  handleInputChange(index, "name", e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.code === "Enter") return addNewCollection();
                }}
                placeholder="Name of the collection"
              />
              <Button
                variant="ghost"
                type="button"
                className="bg-transparent hover:bg-transparent"
                onClick={() =>
                  collectionslist.length > 1
                    ? deleteCollectionAdded(item.id)
                    : setAddCollection(false)
                }>
                <XIcon className="mr-2 h-4 w-4" />
              </Button>
            </div>
          ))}
          <div className="flex justify-between">
            <Button
              type="button"
              className="my-6 px-6 rounded-lg py-4 self-start bg-transparent border-primary"
              onClick={addNewCollection}
              variant="outline">
              <Plus className="w-4 " />
            </Button>
            <Button
              className="border max-w-[200px] self-end rounded-lg px-6 py-4 my-6"
              type="submit">
              Save
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
