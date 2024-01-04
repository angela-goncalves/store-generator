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
import {
  handleInsertInventory,
  handleInsertProduct,
  handleInsertAttributes,
} from "@/lib/insertSupabase";
import { DialogVariants } from "../DialogVariants";
import { v4 as uuidv4 } from "uuid";
import AddInventoryForm from "./addInventoryForm";
import Link from "next/link";

interface IInventory {
  id: string;
  combination: string;
  price: string;
  stock: string;
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
interface IAttributeschildren {
  id: string;
  name: string;
  values: string[];
}
interface IDataCollection {
  dataCollections: ICollections[] | null;
  productToEdit: IProducts;
  storeId: string;
  inventory: IInventory[];
}

export default function AddProductsForm({
  dataCollections,
  productToEdit,
  storeId,
  inventory,
}: IDataCollection) {
  const {
    collection_id,
    description,
    id: productId,
    image,
    name,
    price,
  } = productToEdit;

  const [formData, setFormData] = useState({
    id: productId ? productId : uuidv4(),
    name: name ?? "",
    description: description ?? "",
    price: price ?? "",
    image: image ?? "",
    collectionId: collection_id ?? "",
  });

  const [attributesChildren, setAttributesChildren] = useState<
    IAttributeschildren[]
  >([]);

  const [inventoryList, setInventoryList] = useState<IInventory[]>(
    inventory.length > 0 ? inventory : []
  );

  const [attributeParent, setAttributeParent] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (event: string) => {
    setFormData({ ...formData, collectionId: event });
  };

  const handleVariantChange = (id: string, field: string, value: string) => {
    const newInventories = inventoryList.map((inventory) => {
      if (inventory.id === id) {
        return { ...inventory, [field]: value };
      }
      return inventory;
    });

    setInventoryList(newInventories);
  };

  const handleAddAttribute = () => {
    setAttributesChildren([{ id: uuidv4(), name: "", values: [""] }]);
  };

  const generateVariants = () => {
    const combinations = attributesChildren.reduce((acc, attribute) => {
      if (acc.length === 0) return attribute.values.map((value) => [value]);
      return acc.flatMap((combination) =>
        attribute.values.map((value) => [...combination, value])
      );
    }, [] as string[][]);

    const inventory = combinations.map((combination) => ({
      id: uuidv4(),
      combination: combination.join(", "),
      price: "",
      stock: "",
    }));
    setInventoryList(inventory);
  };

  return (
    <div className="w-full max-w-[800px]">
      <form
        action={() =>
          productId
            ? handleInsertInventory(formData, inventoryList, storeId, productId)
            : handleInsertProduct(formData, storeId)
        }
        className="flex flex-col gap-2">
        {formData.collectionId ? (
          <div className="flex justify-center mb-10 w-full">
            <h2>
              Select the collection you want to be related to your products
            </h2>
            <Select
              name="collectionId"
              defaultValue={formData.collectionId}
              onValueChange={handleSelectChange}>
              <SelectTrigger className="w-full max-w-[300px]">
                <SelectValue placeholder="Select a collection to this product" />
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
        ) : (
          <div className="flex gap-1">
            <Link
              href={{
                pathname: "/store/collections",
                query: { id: storeId },
              }}
              className="text-blue-500">
              Add collections
            </Link>
            <h4>to relate them with this product</h4>
          </div>
        )}

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
        {productId && (
          <div className="bg-white p-6 w-full flex-col flex gap-4 rounded-lg">
            <h3 className="text-lg font-semibold">Variants</h3>
            <h3>Combine attibutes to have a price per item</h3>

            <DialogVariants
              title="Add variant"
              description="Here you can add the variants for your product"
              onClick={handleAddAttribute}
              handleSubmitAttributes={generateVariants}>
              <AddInventoryForm
                attributesChildren={attributesChildren}
                setAttributesChildren={setAttributesChildren}
                attributeParent={attributeParent}
                setAttributeParent={setAttributeParent}
              />
            </DialogVariants>

            {inventoryList.length !== 0 && (
              <div className="flex-col flex gap-6">
                <div className="flex gap-6">
                  <p className="w-[60%]">Variant</p>
                  <p className="w-[20%]">Stock</p>
                  <p className="w-[20%]">Price</p>
                </div>
                {inventoryList.map((variant: any) => (
                  <div key={variant.id} className="flex gap-6">
                    <span className="w-[60%]">{variant.combination}</span>
                    <Input
                      type="number"
                      value={variant.stock}
                      onChange={(e) =>
                        handleVariantChange(variant.id, "stock", e.target.value)
                      }
                    />
                    <Input
                      type="number"
                      value={variant.price}
                      onChange={(e) =>
                        handleVariantChange(variant.id, "price", e.target.value)
                      }
                    />
                    {/* <p className="w-[20%]">
                      {variant.stock ? variant.stock : 0}
                    </p>
                    <p className="w-[20%]">
                      {variant.price ? variant.price : 0}
                    </p> */}
                    {/* <DeleteDialog
                      id={variant.id}
                      storeId={storeId}
                      deleteFunction={handleDeleteInventory}
                    /> */}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <button
          type="submit"
          className="bg-primary text-primary-foreground rounded-lg px-6 py-4 my-6 self-end">
          Save
        </button>
      </form>
    </div>
  );
}
