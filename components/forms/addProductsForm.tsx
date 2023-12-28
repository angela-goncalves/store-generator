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
import {
  handleInsertInventory,
  handleInsertProduct,
} from "@/lib/insertSupabase";
import { DialogVariants } from "../DialogVariants";
import { v4 as uuidv4 } from "uuid";
import AddInventoryForm from "./addInventoryForm";

interface IVariantChild {
  id: string;
  name: string;
}
interface IVariants {
  id: string;
  variantParent: string;
  variantChildren: IVariantChild[];
}
interface ICollections {
  created_at: string;
  description: string | null;
  id: string;
  image: string | null;
  name: string | null;
  store_id: string | null;
}
[];
interface IProducts {
  collection_id: string | null;
  created_at: string;
  description: string | null;
  id: string;
  image: string | null;
  name: string | null;
  price: string | null;
}
interface IDataCollection {
  dataCollections: ICollections[] | null;
  productToEdit: IProducts;
  storeId: string;
}

export default function AddProductsForm({
  dataCollections,
  productToEdit,
  storeId,
}: IDataCollection) {
  const {
    collection_id,
    description,
    id: productId,
    image,
    name,
    price,
  } = productToEdit;

  const newProductId = uuidv4();

  const [formData, setFormData] = useState({
    id: productId ? productId : newProductId,
    name: name ?? "",
    description: description ?? "",
    price: price ?? "",
    image: image ?? "",
    collectionId: collection_id ?? "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const [variants, setVariants] = useState<any>([]);
  const [attributes, setAttributes] = useState<any[]>([]);

  const handleSelectChange = (event: string) => {
    setFormData({ ...formData, collectionId: event });
  };

  const handleVariantChange = (index: number, field: any, value: string) => {
    const newVariants = [...variants];
    newVariants[index][field] = field === "combination" ? value : Number(value);
    setVariants(newVariants);
  };

  const handleAddAttribute = () => {
    setAttributes([...attributes, { name: "", values: [""] }]);
  };

  return (
    <div className="w-full max-w-[800px]">
      <form
        action={() =>
          productId
            ? updateProduct(formData, storeId)
            : handleInsertInventory(variants, formData, storeId, [])
        }
        className="flex flex-col gap-2">
        <div className="flex justify-center mb-10 w-full">
          <Select
            name="collectionId"
            defaultValue={formData.collectionId}
            onValueChange={handleSelectChange}>
            <SelectTrigger className="w-full max-w-[300px]">
              <SelectValue placeholder="Select a collection" />
            </SelectTrigger>
            <SelectContent className="max-w-[300px]">
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
        <div className="bg-white p-6 rounded-lg flex flex-col my-4 gap-6">
          <label htmlFor="name">
            <p>Name</p>
            <Input
              type="text"
              name="name"
              className="mt-2"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name of the product"
            />
          </label>
          <label htmlFor="description">
            <p>Description</p>
            <Input
              type="text"
              name="description"
              className="mt-2"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Description of the product"
            />
          </label>
          <label htmlFor="price">
            <p>Price</p>
            <Input
              type="number"
              name="price"
              value={formData.price}
              className="mt-2"
              onChange={handleInputChange}
              placeholder="Price"
            />
          </label>

          <label htmlFor="image">
            <p>URL of the image</p>
            <Input
              type="text"
              name="image"
              value={formData.image}
              className="mt-2"
              placeholder="Image url"
              onChange={handleInputChange}
            />
          </label>
        </div>

        <div className="bg-white p-6 w-full flex-col flex gap-4 rounded-lg">
          <h3 className="text-lg font-semibold">Variants</h3>
          <h3>Combine attibutes to have a price per item</h3>
          {productId && (
            <DialogVariants
              title="Add variant"
              description="Here you can add the variants for your product"
              onClick={handleAddAttribute}>
              <AddInventoryForm
                setVariants={setVariants}
                variants={variants}
                attributes={attributes}
                setAttributes={setAttributes}
              />
            </DialogVariants>
          )}
          {variants.length !== 0 && (
            <div>
              <div className="flex gap-6">
                <p className="w-[40%]">Variant</p>
                <p className="w-[20%]">Stock</p>
                <p className="w-[20%]">Price</p>
              </div>
              {variants.map((variant: any, index: number) => (
                <div key={index} className="flex gap-6">
                  <span className="w-[80%]">{variant.combination}</span>
                  <Input
                    type="number"
                    value={variant.price}
                    onChange={(e) =>
                      handleVariantChange(index, "price", e.target.value)
                    }
                  />
                  <Input
                    type="number"
                    value={variant.stock}
                    onChange={(e) =>
                      handleVariantChange(index, "stock", e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-primary text-primary-foreground rounded-lg px-6 py-4 my-6 self-end">
          Save
        </button>
      </form>
    </div>
  );
}
