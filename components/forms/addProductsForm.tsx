"use client";
import React, { useState } from "react";
import { handleInsertProduct } from "@/lib/insertsupabase";
import { updateProduct } from "@/lib/updateSupabase";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ICollections {
  created_at: string;
  description: string | null;
  id: string;
  image: string | null;
  name: string | null;
  store_id: string | null;
}
[];
interface IDataCollection {
  dataCollections: ICollections[] | null;
  storeid: string;
  productId: string;
  productName: string;
  productDescription: string;
  productPrice: string;
  productImage: string;
  collection_id: string;
}

export default function AddProductsForm({
  dataCollections,
  storeid,
  productId,
  productDescription,
  productName,
  productPrice,
  productImage,
  collection_id,
}: IDataCollection) {
  const [inputs, setInputs] = useState({
    id: productId ? productId : "",
    name: productName ? productName : "",
    description: productDescription ? productDescription : "",
    price: productPrice ? productPrice : "",
    collection_id: collection_id ? collection_id : "",
    image: productImage ? productImage : "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
  };
  const handleSelectChange = (event: string) => {
    setInputs({ ...inputs, collection_id: event });
  };
  return (
    <div className="w-1/2 max-w-[500px]">
      <form
        action={() =>
          productId
            ? updateProduct(inputs, storeid)
            : handleInsertProduct(inputs, storeid)
        }
        className="flex flex-col">
        <div className="self-center">
          <Select
            required
            name="collection_id"
            defaultValue={inputs.collection_id}
            onValueChange={handleSelectChange}>
            <SelectTrigger className="max-w-xs">
              <SelectValue placeholder="Select a collection" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {dataCollections?.map((item) => {
                  return (
                    <SelectItem
                      key={item.id}
                      value={item.id}
                      onChange={handleInputChange}>
                      {item.name}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="text-2xl">
          <label htmlFor="name">Name</label>
          <Input
            type="text"
            name="name"
            className="mt-2"
            value={inputs.name}
            onChange={handleInputChange}
            placeholder="Name of the product"
          />
        </div>
        <div className="text-2xl mt-6">
          <label htmlFor="description">Description</label>
          <Input
            type="text"
            name="description"
            className="mt-2"
            value={inputs.description}
            onChange={handleInputChange}
            placeholder="Description of the product"
          />
        </div>
        <div className="text-2xl mt-6">
          <label htmlFor="price">Price</label>
          <Input
            type="number"
            name="price"
            value={inputs.price}
            className="mt-2"
            onChange={handleInputChange}
            placeholder="Price"
          />
        </div>
        <div className="text-2xl mt-6">
          <label htmlFor="image">URL of the image</label>
          <Input
            type="file"
            name="image"
            value={inputs.image}
            className="mt-2"
            onChange={handleInputChange}
          />
        </div>
        <button
          type="submit"
          className="border border-emerald-300 rounded-lg px-6 py-4 my-6 self-end">
          submit
        </button>
      </form>
    </div>
  );
}
