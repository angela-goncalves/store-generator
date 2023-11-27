"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { handleInsertCollections } from "@/lib/insertsupabase";

export default function AddCollections() {
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
    handleInsertCollections(formData);
    setFormData({
      name: "",
      description: "",
      additionalName: "",
      additionalDescription: "",
    });
  };
  // check if with a policy in service_key evething is ok
  return (
    <div className="my-10 mx-2 max-w-[500px]">
      <h3 className="">
        Now, let's add some categories or collections to your store
      </h3>
      <h3>Dont worry, you can edit them later</h3>
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
          <button
            type="button"
            className="my-6 px-6 border border-gray-500 rounded-lg py-4 self-start"
            onClick={() => setAdd(true)}>
            add one more
          </button>
        ) : (
          <></>
        )}
        <button
          className="border border-emerald-300 rounded-lg px-6 py-4 my-6"
          type="submit">
          submit
        </button>
      </form>
    </div>
  );
}
