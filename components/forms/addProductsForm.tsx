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
import ProductImages from "../ProductImages";
import { FileRejection } from "react-dropzone";

interface IImageFile {
  file: File;
  preview?: string;
  rejected: boolean;
  errors?: FileRejection["errors"];
}

interface IProductsForm {
  dataCollections: Collections[] | null;
  productToEdit: Products;
  storeId: string;
  inventory: Inventory[];
  attributesDefault: Attributes[];
  message?: string;
}

export default function AddProductsForm({
  dataCollections,
  productToEdit,
  storeId,
  inventory,
  attributesDefault,
  message,
}: IProductsForm) {
  const [formData, setFormData] = useState({
    id: productToEdit.id ? productToEdit.id : uuidv4(),
    name: productToEdit.name ?? "",
    description: productToEdit.description ?? "",
    price: productToEdit.price ?? 0,
    images: productToEdit.images ?? null,
    collection_id: productToEdit.collection_id ?? "",
    created_at: productToEdit.created_at ?? "",
    extrainfo: productToEdit.extrainfo ?? "",
    store_id: productToEdit.store_id ?? "",
    url: productToEdit.url ?? "",
    collectionName: "",
  });

  const [attributesChildren, setAttributesChildren] = useState<Attributes[]>(
    attributesDefault.length > 0 ? attributesDefault : []
  );

  const [inventoryList, setInventoryList] = useState<Inventory[]>(
    inventory ?? []
  );

  const [attributeParent, setAttributeParent] = useState<string>("");
  const [stock, setStock] = useState<number>(0);
  const [priceToAll, setPriceToAll] = useState<number>(0);
  const [addNewCollection, setAddNewCollection] = useState<boolean>(false);
  const [newImageFile, setNewImageFile] = useState<IImageFile[] | undefined>();

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (event: string) => {
    setFormData({
      ...formData,
      collection_id: event,
    });
  };

  const handleVariantChange = (id: string, field: string, value: string) => {
    const newInventories = inventoryList.map((inventory) => {
      if (inventory.id === id) {
        return {
          ...inventory,
          [field]: value,
        };
      }
      return inventory;
    });

    setInventoryList(newInventories);
  };

  const handleStockChange = (value: string) => {
    setStock(Number(value));
    const changeStockOfAllList = inventoryList.map((list) => {
      return {
        ...list,
        stock_level: Number(value),
      };
    });
    setInventoryList(changeStockOfAllList);
  };

  const handlePriceChange = (value: string) => {
    setPriceToAll(Number(value));
    const changePriceOfAllList = inventoryList.map((list) => {
      return {
        ...list,
        price: Number(value),
      };
    });
    setInventoryList(changePriceOfAllList);
  };

  const handleDeleteUpdatedImage = (imageName: string) => {
    const filterIamges = formData.images?.filter((item) => item !== imageName);
    setFormData((currentFormData) => ({
      ...currentFormData,
      images: filterIamges || null,
    }));
  };

  const generateVariants = () => {
    const combinations = attributesChildren.reduce((acc, attribute) => {
      const childrenValues = attribute.children_values;
      if (acc.length === 0) {
        return childrenValues.map((value) => [value]);
      }
      return acc.flatMap((combination) =>
        childrenValues.map((value) => [...combination, value])
      );
    }, [] as string[][]);

    const inventoryTolist = combinations.map((combination) => ({
      id: uuidv4(),
      attributeschildren: combination.join(", "),
      price: formData.price ? Number(formData.price) : 0,
      stock_level: Number(stock),
      product_id: formData.id,
      created_at: "",
    }));

    setInventoryList(inventoryTolist);
  };

  const handleSubmit = async () => {
    const formDataImage = new FormData();
    if (newImageFile && newImageFile.length > 0) {
      newImageFile.forEach((file) => {
        if (!file.rejected) {
          formDataImage.append("images", file.file);
        }
      });
    }

    productToEdit.id
      ? updateProduct(
          formData,
          storeId,
          inventoryList,
          attributesChildren,
          formDataImage
        )
      : handleInsertProduct(
          formData,
          storeId,
          inventoryList,
          attributesChildren,
          formDataImage
        );
  };

  return (
    <div className="w-full max-w-[800px] dark:text-gray-800">
      <form action={handleSubmit} className="flex flex-col gap-2">
        <section className="bg-white p-6 pb-8 rounded-lg flex flex-col my-4 gap-6">
          <h2 className="self-center">
            You can add a new collection{" "}
            {formData.collection_id ? "or select" : " "} the one you want to be
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
                        name="collection_id"
                        defaultValue={formData.collection_id}
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
          <h3 className="text-xl font-semibold">Name and Description </h3>
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
        {
          <ProductImages
            newImageFile={newImageFile}
            setNewImageFile={setNewImageFile}
            uploadedImage={formData.images}
            handleDeleteUpdatedImage={handleDeleteUpdatedImage}
          />
        }
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
                  <p className="w-[20%]">{variant.attributeschildren}</p>
                  <label htmlFor="stock_level" className="w-[30%]">
                    <Input
                      type="number"
                      name="stock_level"
                      value={variant.stock_level}
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
          disabled={message && message !== "" ? true : false}
          className="bg-primary text-primary-foreground rounded-lg px-6 py-4 my-6 self-end ">
          Save
        </Button>
      </form>
    </div>
  );
}
