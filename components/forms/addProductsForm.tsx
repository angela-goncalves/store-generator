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
import { handleInsertProduct } from "@/lib/insertSupabase";
import { DialogVariants } from "../DialogVariants";
import { v4 as uuidv4 } from "uuid";
import AddInventoryForm from "./addInventoryForm";
import { updateProduct } from "@/lib/action/updateSupabase";
import { Textarea } from "../ui/textarea";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { capitalizeFirstLetter } from "@/lib/uppercase";

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
  childrenValue: string[];
}
interface IProductsForm {
  dataCollections: ICollections[] | null;
  productToEdit: IProducts;
  storeId: string;
  inventory: IInventory[];
  attributesDefault: IAttributeschildren[];
}

export default function AddProductsForm({
  dataCollections,
  productToEdit,
  storeId,
  inventory,
  attributesDefault,
}: IProductsForm) {
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
    collectionName: "",
  });

  const [attributesChildren, setAttributesChildren] = useState<
    IAttributeschildren[]
  >(attributesDefault.length > 0 ? attributesDefault : []);

  const [inventoryList, setInventoryList] = useState<IInventory[]>(
    inventory.length > 0 ? inventory : []
  );

  const [attributeParent, setAttributeParent] = useState<string>("");
  const [stock, setStock] = useState<string>("");
  const [priceToAll, setPriceToAll] = useState<string>("");
  const [addNewCollection, setAddNewCollection] = useState<boolean>(false);

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
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

  const handleStockChange = (value: string) => {
    setStock(value);
    const changeStockOfAllList = inventoryList.map((list) => {
      return { ...list, stock: value };
    });
    setInventoryList(changeStockOfAllList);
  };

  const handlePriceChange = (value: string) => {
    setPriceToAll(value);
    const changePriceOfAllList = inventoryList.map((list) => {
      return { ...list, price: value };
    });
    setInventoryList(changePriceOfAllList);
  };

  const generateVariants = () => {
    const combinations = attributesChildren.reduce((acc, attribute) => {
      if (acc.length === 0)
        return attribute.childrenValue.map((value) => [value]);
      return acc.flatMap((combination) =>
        attribute.childrenValue.map((value) => [...combination, value])
      );
    }, [] as string[][]);

    const inventoryTolist = combinations.map((combination) => ({
      id: uuidv4(),
      combination: combination.join(", "),
      price: formData.price ? formData.price : "",
      stock: stock,
    }));

    setInventoryList(inventoryTolist);
  };

  return (
    <div className="w-full max-w-[800px] dark:text-gray-800">
      <form
        action={() =>
          productId
            ? updateProduct(
                formData,
                storeId,
                inventoryList,
                attributesChildren
              )
            : handleInsertProduct(
                formData,
                storeId,
                inventoryList,
                attributesChildren
              )
        }
        className="flex flex-col gap-2">
        <section className="bg-white p-6 pb-8 rounded-lg flex flex-col my-4 gap-6">
          <h2 className="self-center">
            You can add a new collection{" "}
            {formData.collectionId ? "or select" : " "} the one you want to be
            related to your product
          </h2>
          <div className="flex items-center justify-between">
            {addNewCollection ? (
              <Input
                type="text"
                name="collectionName"
                className="max-w-[300px]"
                value={formData.collectionName}
                onChange={handleInputChange}
                placeholder="Name of the collection"
              />
            ) : (
              <div className="w-full">
                {dataCollections &&
                  dataCollections.length > 0 &&
                  !addNewCollection && (
                    <div className="w-full">
                      <Select
                        name="collectionId"
                        defaultValue={formData.collectionId}
                        onValueChange={handleSelectChange}>
                        <SelectTrigger className="w-full max-w-[300px] dark:bg-secondary bg-neutral-light dark:text-black">
                          <SelectValue placeholder="Select a collection to this product" />
                        </SelectTrigger>
                        <SelectContent className="max-w-[300px] text-secondary dark:text-gray-800">
                          <SelectGroup>
                            {dataCollections?.map((item) => {
                              return (
                                <SelectItem key={item.id} value={item.id}>
                                  {capitalizeFirstLetter(item.name || "")}
                                </SelectItem>
                              );
                            })}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
              </div>
            )}

            <Button
              type="button"
              variant="outline"
              className="dark:text-black dark:bg-secondary self-end border-none"
              onClick={() => {
                setAddNewCollection(!addNewCollection);
              }}>
              <Plus className="mr-2 h-4 w-4 " />
              <p>Add a collection</p>
            </Button>
          </div>
        </section>

        <section className="bg-white p-6 pb-8 rounded-lg flex flex-col my-4 gap-6">
          <h3 className="text-xl font-semibold">Name and Description</h3>
          <label htmlFor="name">
            <p>Name</p>
            <Input
              type="text"
              name="name"
              className="mt-2"
              required
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name of the product"
            />
          </label>
          <label htmlFor="description">
            <p>Description</p>
            <Textarea
              name="description"
              className="mt-2 bg-white"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Description of the product"
            />
          </label>
        </section>

        <section className="bg-white p-6 pb-8 rounded-lg flex flex-col my-4 gap-6">
          <h3 className="text-xl font-semibold">Prices</h3>
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
        </section>
        <section className="bg-white p-6 pb-8 rounded-lg flex flex-col my-4 gap-6">
          <h3 className="text-xl font-semibold">Images</h3>
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
        </section>
        <section className="bg-white my-4 p-6 pb-8 w-full flex-col flex gap-4 rounded-lg">
          <DialogVariants
            title="Add variant"
            description="Here you can add the variants for your product"
            generateVariants={generateVariants}
            inventoryList={inventoryList.length > 0}>
            <AddInventoryForm
              attributesChildren={attributesChildren}
              setAttributesChildren={setAttributesChildren}
              attributeParent={attributeParent}
              setAttributeParent={setAttributeParent}
            />
          </DialogVariants>
          <h3>Combine attibutes to have a price per item</h3>
          {inventoryList.length > 0 && (
            <div className="flex-col flex gap-6">
              <div className="flex gap-4 items-baseline self-end">
                <label
                  htmlFor="stockToAll"
                  className="flex text-sm items-center max-w-[300px] gap-4">
                  Apply to all stock values
                  <Input
                    type="number"
                    name="stockToAll"
                    placeholder="stock"
                    value={stock}
                    className="w-20"
                    onChange={(e) => handleStockChange(e.target.value)}
                  />
                </label>
                <label
                  htmlFor="priceToAll"
                  className="flex text-sm items-center max-w-[300px] gap-4 mb-6">
                  Apply to all price values
                  <Input
                    type="number"
                    name="priceToAll"
                    value={priceToAll}
                    placeholder="price"
                    className="w-20"
                    onChange={(e) => handlePriceChange(e.target.value)}
                  />
                </label>
              </div>
              <div className="flex gap-6">
                <p className="w-[20%]">Variant</p>
                <p className="w-[30%]">Stock</p>
                <p className="w-[30%]">Price</p>
              </div>
              {inventoryList.map((variant: any) => (
                <div key={variant.id} className="flex gap-6">
                  <p className="w-[20%]">{variant.combination}</p>
                  <label htmlFor="stock" className="w-[30%]">
                    <Input
                      type="number"
                      name="stock"
                      value={variant.stock}
                      className=""
                      onChange={(e) =>
                        handleVariantChange(variant.id, "stock", e.target.value)
                      }
                    />
                  </label>
                  <label htmlFor="price" className="w-[30%]">
                    <Input
                      type="number"
                      name="price"
                      value={variant.price}
                      className=""
                      onChange={(e) =>
                        handleVariantChange(variant.id, "price", e.target.value)
                      }
                    />
                  </label>
                </div>
              ))}
            </div>
          )}
        </section>

        <Button
          type="submit"
          className="bg-primary text-primary-foreground rounded-lg px-6 py-4 my-6 self-end">
          Save
        </Button>
      </form>
    </div>
  );
}
