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

export default function AddStoreForm() {
  const [addComment, setAddComment] = useState(false);
  const [formData, setFormData] = useState<IStore>({
    id: "",
    name: "",
    description: "",
    location: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="w-1/2 max-w-[500px]">
      <form
        action={() => handleInsertStore(formData)}
        className="h-full flex flex-col gap-6 mt-6">
        <section className="bg-white p-6 rounded-lg flex flex-col gap-6">
          <div className="text-3xl">
            <label htmlFor="name">
              <p>What is your store's name?</p>
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
            </label>
            {addComment ? (
              <h3 className="text-neutral-dark text-sm">
                Don't worry, you can change this info later
              </h3>
            ) : (
              <p className="h-5"></p>
            )}
          </div>
          <label htmlFor="description" className="text-3xl">
            <p>What is your site about? (optional)</p>
            <Input
              className="mt-2"
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Description of your store of some key word"
            />
          </label>
          <label htmlFor="location" className="text-3xl mt-5">
            <p>Where is your business located?</p>
            <Input
              className="mt-2"
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Location of the product"
            />
          </label>
        </section>

        <Button
          className="text-base px-6 py-4 rounded-lg mt-5 self-end"
          type="submit">
          Save store
        </Button>
      </form>
    </div>
  );
}
