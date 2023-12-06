"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { UUID } from "crypto";
import { updateCollections } from "@/lib/updateSupabase";

interface IUpdateCollections {
  collectionid: UUID;
  collectiontitle: string;
  collectiondescription: string;
}
type FormDataType = {
  collectionID: UUID;
  nameCollection: string;
  descriptionCollection: string;
};
export default function UpdateCollections({
  collectionid,
  collectiontitle,
  collectiondescription,
}: IUpdateCollections) {
  const [newInputs, setNewInputs] = useState<FormDataType>({
    nameCollection: collectiontitle,
    descriptionCollection: collectiondescription,
    collectionID: collectionid as UUID,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewInputs({ ...newInputs, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-1/2 max-w-[500px]">
      <form
        action={() => updateCollections(newInputs)}
        className="flex flex-col">
        <div className="text-2xl mt-6">
          <label htmlFor="nameCollection">Name</label>
          <Input
            type="text"
            name="nameCollection"
            className="mt-2"
            value={newInputs.nameCollection}
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
            value={newInputs.descriptionCollection}
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
