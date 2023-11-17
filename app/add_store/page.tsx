"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { handleInsertStore } from "@/lib/insertsupabase";

const FormAddProducts: React.FC = () => {
  const [addCollection, setAddCollection] = useState(false);

  return (
    <form action={(formData) => handleInsertStore(formData)}>
      <label htmlFor="pageName">Name of your store</label>
      <Input
        type="text"
        name="pageName"
        id="pageName"
        placeholder="Name of the product"
      />
      <label htmlFor="pageDescription">Description of your Store</label>
      <Input
        type="text"
        name="pageDescription"
        id="pageDescription"
        placeholder="Description of the product"
      />
      <label htmlFor="collectionName">Name of collection</label>
      <Input
        type="text"
        name="collectionName"
        id="collectionName"
        placeholder="Name of the product"
      />
      <label htmlFor="collectionDescription">Description of collection</label>
      <Input
        type="text"
        name="collectionDescription"
        id="collectionDescription"
        placeholder="Name of the product"
      />
      {addCollection && (
        <>
          <label htmlFor="collectionName">Name of collection</label>
          <Input
            type="text"
            name="collectionName"
            id="collectionName"
            placeholder="Name of the product"
          />
          <label htmlFor="collectionDescription">
            Description of collection
          </label>
          <Input
            type="text"
            name="collectionDescription"
            id="collectionDescription"
            placeholder="Name of the product"
          />
        </>
      )}
      {/* <button
        className="px-6 py-4 border border-red-500 rounded-lg mr-4"
        onClick={() => setAddCollection(true)}>
        +
      </button> */}

      <button
        className="px-6 py-4 border border-blue-500 rounded-lg"
        type="submit">
        submit
      </button>
    </form>
  );
};

export default FormAddProducts;
