import React from "react";
import { handleInsertProduct } from "@/lib/insertsupabase";
import { Input } from "@/components/ui/input";

export default function Add_products_form() {
  return (
    <div className="w-1/2 max-w-[500px]">
      <form action={handleInsertProduct}>
        <div className="text-2xl">
          <label htmlFor="productName">Name</label>
          <Input
            type="text"
            name="name"
            className="mt-2"
            id="productName"
            placeholder="Name of the product"
          />
        </div>
        <div className="text-2xl mt-6">
          <label htmlFor="productDescription">Description</label>
          <Input
            type="text"
            name="description"
            className="mt-2"
            id="productDescription"
            placeholder="Description of the product"
          />
        </div>
        <div className="text-2xl mt-6">
          <label htmlFor="productPrice">Price</label>
          <Input
            type="number"
            id="productPrice"
            name="price"
            className="mt-2"
            placeholder="Price"
          />
        </div>
        <div className="text-2xl mt-6">
          <label htmlFor="productImage">URL of the image</label>
          <Input type="file" id="productImage" name="image" className="mt-2" />
        </div>
        <button
          type="submit"
          className="border border-emerald-300 rounded-lg px-6 py-4 my-6">
          submit
        </button>
      </form>
    </div>
  );
}
