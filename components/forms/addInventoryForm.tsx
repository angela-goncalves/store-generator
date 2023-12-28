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
  attributes,
  setAttributes,
}: {
  setVariants: (variants: any[]) => void;
  variants: any[];
  attributes: any;
  setAttributes: (attributes: any) => void;
}) {
  const variantsobj = [
    { id: uuidv4(), name: "color" },
    { id: uuidv4(), name: "size" },
    { id: uuidv4(), name: "other..." },
  ];

  const handleAttributeNameChange = (index: number, name: string) => {
    const newAttributes = [...attributes];
    newAttributes[index].name = name;
    setAttributes(newAttributes);
  };

  const handleAttributeChildChange = (
    attributeIndex: number,
    valueIndex: number,
    value: string
  ) => {
    const newAttributes = [...attributes];
    newAttributes[attributeIndex].values[valueIndex] = value;
    setAttributes(newAttributes);
  };

  const handleAddAttributeChild = (attributeIndex: number) => {
    const newAttributes = [...attributes];
    newAttributes[attributeIndex].values.push("");
    setAttributes(newAttributes);
  };

  const handleRemoveAttributeChild = (
    attributeIndex: number,
    valueIndex: number
  ) => {
    const newAttributes = [...attributes];
    newAttributes[attributeIndex].values.splice(valueIndex, 1);
    setAttributes(newAttributes);
  };

  const generateVariants = () => {
    const combinations = attributes.reduce((acc: any, attribute: any) => {
      if (acc.length === 0)
        return attribute.values.map((value: any) => [value]);
      return acc.flatMap((combination: any) =>
        attribute.values.map((value: any) => [...combination, value])
      );
    }, [] as string[][]);

    const newVariants = combinations.map((combination: any) => ({
      combination: combination.join(", "),
      price: 0,
      stock: 0,
    }));
    setVariants(newVariants);
  };

  return (
    <div className="flex flex-col">
      <h3>Choose an attribute to create variants for your product</h3>
      {attributes.map((attribute: any, index: number) => (
        <div key={index} className="flex-col flex gap-4">
          <Select
            name="variantParent"
            onValueChange={(e) => handleAttributeNameChange(index, e)}>
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
          {attribute.values.map((value: any, valueIndex: any) => (
            <div key={valueIndex} className="flex items-center">
              <Input
                type="text"
                value={value}
                onChange={(e) =>
                  handleAttributeChildChange(index, valueIndex, e.target.value)
                }
              />
              <Button
                variant="ghost"
                onClick={() => handleRemoveAttributeChild(index, valueIndex)}>
                <XIcon className="w-4 " />
              </Button>
            </div>
          ))}
          <Button
            onClick={() => handleAddAttributeChild(index)}
            className="self-start">
            <Plus className="w-4" />
          </Button>
        </div>
      ))}
      {/* <button onClick={handleAddAttribute}>Add variant</button> */}
      {/* <Button>Generate Variants</Button> */}
      <Button
        type="button"
        onClick={generateVariants}
        className="self-end hover:shadow-md hover:shadow-secondary hover:bg-secondary hover:text-secondary-foreground bg-secondary text-secondary-foreground">
        Save
      </Button>
    </div>
  );
}
