"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { handleInsertStore } from "@/lib/insertsupabase";

export default function Form_add_store() {
  const [addComment, setAddComment] = useState(false);
  return (
    <div className="w-1/2 max-w-[500px]">
      <form
        action={(formData) => handleInsertStore(formData)}
        className="h-full">
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
          {addComment && (
            <h3 className="text-gray-400 text-sm">
              Don't worry, you can change this info later
            </h3>
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
        <button
          className="px-6 py-4 border border-emerald-300 rounded-lg mt-6"
          type="submit">
          submit
        </button>
      </form>
    </div>
  );
}
