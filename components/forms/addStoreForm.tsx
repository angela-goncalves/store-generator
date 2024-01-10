"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { handleInsertStore } from "@/lib/insertSupabase";
import { Button } from "../ui/button";

interface IStore {
  id: string;
  name: string;
  description: string;
  location: string;
}
interface IAddStoreForm {
  storeData?: IStore;
}

export default function AddStoreForm({ storeData }: IAddStoreForm) {
  const [addComment, setAddComment] = useState(false);
  const [formData, setFormData] = useState<IStore>({
    id: storeData ? storeData.id : "",
    name: storeData ? storeData.name : "",
    description: storeData ? storeData.description : "",
    location: storeData ? storeData.location : "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="w-1/2 max-w-[500px]">
      <form
        action={() => handleInsertStore(formData)}
        className="h-full flex flex-col">
        <div className="text-3xl mt-6">
          <label htmlFor="siteName">What is your store's name?</label>
          <Input
            type="text"
            className="mt-2"
            name="name"
            required
            value={formData.name}
            onChange={handleInputChange}
            onFocus={() => setAddComment(true)}
            onBlur={() => setAddComment(false)}
            placeholder="Name of your store"
          />
          {addComment && !storeData?.id ? (
            <h3 className="text-neutral-dark text-sm">
              Don't worry, you can change this info later
            </h3>
          ) : (
            <p className="h-5"></p>
          )}
        </div>
        <div className="text-3xl mt-6">
          <label htmlFor="siteDescription">
            What is your site about? (optional)
          </label>
          <Input
            className="mt-2"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description of your store of some key word"
          />
        </div>
        <div className="text-3xl mt-6">
          <label htmlFor="siteLocation">Where is your business located?</label>
          <Input
            className="mt-2"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="Location of the product"
          />
        </div>
        <Button
          className="text-base px-6 py-4 rounded-lg mt-6 self-end"
          type="submit">
          Save store
        </Button>
      </form>
    </div>
  );
}
