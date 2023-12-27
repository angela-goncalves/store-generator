"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import { Input } from "@/components/ui/input";
import { Plus, XIcon } from "lucide-react";

interface IVariantChild {
  id: string;
  name: string;
}
interface IVariants {
  id: string;
  variantParent: string;
  variantChildren: IVariantChild[];
}
export default function AddInventory({
  setVariants,
  variants,
}: {
  setVariants: (variants: IVariants[]) => void;
  variants: IVariants[];
}) {
  const variantsobj = [
    { id: uuidv4(), name: "color" },
    { id: uuidv4(), name: "size" },
    { id: uuidv4(), name: "otro..." },
  ];

  const [variantChildrenList, setVariantChildrenList] = useState<
    IVariantChild[]
  >([
    {
      id: uuidv4(),
      name: "",
    },
  ]);

  const [variantParent, setVariantParent] = useState<IVariantChild>({
    id: uuidv4(),
    name: "",
  });

  const [variantParentSelected, setvariantParentSelected] =
    useState<IVariantChild>({
      id: uuidv4(),
      name: "",
    });

  const handleInputChange = (index: number, field: "name", value: string) => {
    const updatedVariantsList = [...variantChildrenList];
    updatedVariantsList[index][field] = value;
    setVariantChildrenList(updatedVariantsList);
  };

  const addNewVariantChild = () => {
    setVariantChildrenList([
      ...variantChildrenList,
      { id: uuidv4(), name: "" },
    ]);
  };

  const handleSelectChange = (event: string) => {
    setvariantParentSelected({
      ...variantParentSelected,
      name: event,
    });
  };

  const handleChangeVariantCustom = (event: string) => {
    setVariantParent({
      ...variantParent,
      name: event,
    });
  };

  const variantParentToSave =
    variantParentSelected.name === "otro..."
      ? variantParent
      : variantParentSelected;

  const deleteVariantAdded = (idVariantAdded: string) => {
    const deletedVariant = variantChildrenList.filter(
      (item) => item.id !== idVariantAdded
    );
    setVariantChildrenList(deletedVariant);
  };
  //   console.log("newProductId", newProductId);
  return (
    <div className="flex flex-col">
      <h3>Choose an attribute to create variants for your product</h3>
      <Select name="variantParent" onValueChange={handleSelectChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a variant" />
        </SelectTrigger>
        <SelectContent className="">
          <SelectGroup>
            {variantsobj?.map((item) => {
              return (
                <SelectItem key={item.id} value={item.name}>
                  {item.name}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
      {variantParentSelected.name === "otro..." && (
        <div>
          <Input
            name="variantParentAnother"
            placeholder="create your own variant"
            className="mt-6"
            value={variantParent.name}
            onChange={(e) => handleChangeVariantCustom(e.target.value)}
          />
        </div>
      )}
      {variantChildrenList.map((item, index) => (
        <div key={item.id} className="flex items-center w-full my-6">
          <Input
            type="text"
            name={item.name}
            className=""
            value={item.name}
            placeholder="variant"
            onChange={(e) => handleInputChange(index, "name", e.target.value)}
            onKeyDown={(e) => {
              if (e.code === "Enter") return addNewVariantChild();
            }}
          />
          <Button
            type="button"
            onClick={() => deleteVariantAdded(item.id)}
            variant="ghost">
            <XIcon className="w-4" />
          </Button>
        </div>
      ))}
      <Button type="button" onClick={addNewVariantChild} className="w-max">
        <Plus />
      </Button>
      <Button
        type="button"
        onClick={() => {
          const groups = {
            id: variantParentToSave.id,
            variantParent: variantParentToSave.name,
            variantChildren: variantChildrenList,
          };
          setVariants([...variants, groups]);
        }}
        className="self-end hover:shadow-md hover:shadow-secondary hover:bg-secondary hover:text-secondary-foreground bg-secondary text-secondary-foreground">
        Save
      </Button>
    </div>
  );
}
