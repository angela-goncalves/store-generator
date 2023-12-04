"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { handleInsertCollections } from "@/lib/insertsupabase";
import { Button } from "../ui/button";
import { UUID } from "crypto";

export default function AddCollectionsForm({ storeId }: { storeId: string }) {
  const [add, setAdd] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    additionalName: "",
    additionalDescription: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSubmit = () => {
    handleInsertCollections(formData, storeId as UUID);
    setFormData({
      name: "",
      description: "",
      additionalName: "",
      additionalDescription: "",
    });
  };
  return (
    <div className="w-1/2 max-w-[500px]">
      <form action={handleSubmit} className="flex flex-col">
        <div className="text-2xl mt-6">
          <label htmlFor="collectionName">Name</label>
          <Input
            type="text"
            name="name"
            className="mt-2"
            id="collectionName"
            value={formData.name}
            onChange={(e) => handleChange(e)}
            placeholder="Name of the collection"
            required
          />
        </div>
        <div className="text-2xl mt-6">
          <label htmlFor="collectionDescription">Description</label>
          <Input
            type="text"
            name="description"
            className="mt-2"
            id="collectionDescription"
            required
            value={formData.description}
            onChange={(e) => handleChange(e)}
            placeholder="Description of the collection"
          />
        </div>
        {add && (
          <div>
            <div className="text-2xl mt-6">
              <label htmlFor="additionalName">Aditional Name</label>
              <Input
                type="text"
                name="additionalName"
                id="additionalName"
                className="mt-2"
                value={formData.additionalName}
                onChange={(e) => handleChange(e)}
                placeholder="Name of the collection"
                required
              />
            </div>
            <div className="text-2xl mt-6">
              <label htmlFor="additionalDescription">
                Aditional Description
              </label>
              <Input
                type="text"
                name="additionalDescription"
                id="additionalDescription"
                className="mt-2"
                value={formData.additionalDescription}
                onChange={(e) => handleChange(e)}
                placeholder="Description of the collection"
              />
            </div>
          </div>
        )}
        {!add ? (
          <Button
            type="button"
            className="my-6 px-6 rounded-lg py-4 self-start bg-transparent border-primary"
            onClick={() => setAdd(true)}
            variant="outline">
            add one more
          </Button>
        ) : (
          <></>
        )}
        <Button
          className="border max-w-[200px] self-end rounded-lg px-6 py-4 my-6"
          type="submit">
          submit
        </Button>
      </form>
    </div>
  );
}
