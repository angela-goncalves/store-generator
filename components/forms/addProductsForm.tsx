"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateProduct } from "@/lib/updateSupabase";
import { handleInsertProduct } from "@/lib/insertSupabase";

interface ICollections {
  created_at: string;
  description: string | null;
  id: string;
  image: string | null;
  name: string | null;
  store_id: string | null;
}
[];
interface ISearchParams {
  id: string;
  productId: string;
  productName: string;
  productDescription: string;
  productPrice: string;
  productImage: string;
  collectionId: string;
}
interface IDataCollection {
  dataCollections: ICollections[] | null;
  searchParams: ISearchParams;
}

export default function AddProductsForm({
  dataCollections,
  searchParams,
}: IDataCollection) {
  const {
    id, // store's id
    productId,
    productDescription,
    productName,
    productPrice,
    productImage,
    collectionId,
  } = searchParams;

  const [formData, setFormData] = useState({
    id: productId ? productId : "",
    name: productName ? productName : "",
    description: productDescription ? productDescription : "",
    price: productPrice ? productPrice : "",
    image: productImage ? productImage : "",
    collectionId: collectionId ? collectionId : "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (event: string) => {
    setFormData({ ...formData, collectionId: event });
  };

  return (
    <div className="w-1/2 max-w-[500px]">
      <form
        action={() =>
          productId
            ? updateProduct(formData, id)
            : handleInsertProduct(formData, id)
        }
        className="flex flex-col">
        <div className="self-center">
          <Select
            required
            name="collectionId"
            defaultValue={formData.collectionId}
            onValueChange={handleSelectChange}>
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Select a collection" />
            </SelectTrigger>
            <SelectContent className="w-[300px]">
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
            value={formData.name}
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
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description of the product"
          />
        </div>
        <div className="text-2xl mt-6">
          <label htmlFor="price">Price</label>
          <Input
            type="number"
            name="price"
            value={formData.price}
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
            value={formData.image}
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
