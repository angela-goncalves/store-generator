"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { handleInsertStore } from "@/lib/insertSupabase";
import { Button } from "../ui/button";

export default function AddStoreForm() {
  const [addComment, setAddComment] = useState(false);
  return (
    <div className="w-1/2 max-w-[500px]">
      <form
        action={(formData) => handleInsertStore(formData)}
        className="h-full flex flex-col">
        <div className="text-3xl mt-6">
          <label htmlFor="siteName">What is your store's name?</label>
          <Input
            type="text"
            className="mt-2"
            name="siteName"
            required
            onFocus={() => setAddComment(true)}
            onBlur={() => setAddComment(false)}
            placeholder="Name of your store"
          />
          {addComment ? (
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
            name="siteDescription"
            placeholder="Description of your store of some key word"
          />
        </div>
        <div className="text-3xl mt-6">
          <label htmlFor="siteLocation">Where is your business located?</label>
          <Input
            className="mt-2"
            type="text"
            name="siteLocation"
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
