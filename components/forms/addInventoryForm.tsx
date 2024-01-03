"use client";
import React from "react";
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

interface IAttributeschildren {
  id: string;
  name: string;
  values: string[];
}
export default function AddInventory({
  attributesChildren,
  setAttributesChildren,
  attributeParent,
  setAttributeParent,
}: {
  attributesChildren: IAttributeschildren[];
  setAttributesChildren: (attributes: IAttributeschildren[]) => void;
  setAttributeParent: (attributeParent: string) => void;
  attributeParent: string;
}) {
  const variantsobj = [
    { id: uuidv4(), name: "color" },
    { id: uuidv4(), name: "size" },
    { id: uuidv4(), name: "other..." },
  ];

  const handleAttributeNameChange = (id: string, value: string) => {
    const newAttributesChildren = attributesChildren.map((attribute) => {
      if (attribute.id === id) {
        return { ...attribute, name: value === "other..." ? "" : value };
      }
      return attribute;
    });
    setAttributeParent(value);
    setAttributesChildren(newAttributesChildren);
  };

  const handleIfAttributeNameIsOther = (id: string, value: string) => {
    const newAttributesChildren = attributesChildren.map((attribute) => {
      if (attribute.id === id) {
        return { ...attribute, name: value };
      }
      return attribute;
    });
    setAttributesChildren(newAttributesChildren);
  };

  const handleAttributeChildChange = (
    attributeIndex: number,
    valueIndex: number,
    value: string
  ) => {
    const newAttributes = [...attributesChildren];
    newAttributes[attributeIndex].values[valueIndex] = value;
    setAttributesChildren(newAttributes);
  };

  const handleAddAttributeChild = (attributeIndex: number) => {
    const newAttributes = [...attributesChildren];
    newAttributes[attributeIndex].values.push("");
    setAttributesChildren(newAttributes);
  };

  const handleRemoveAttributeChild = (
    attributeIndex: number,
    valueIndex: number
  ) => {
    const newAttributes = [...attributesChildren];
    newAttributes[attributeIndex].values.splice(valueIndex, 1);
    setAttributesChildren(newAttributes);
  };

  return (
    <div className="flex flex-col">
      <h3>Choose an attribute to create variants for your product</h3>
      {attributesChildren.map((attribute, index: number) => (
        <div key={attribute.id} className="flex-col flex gap-4">
          <Select
            name="variantParent"
            onValueChange={(e) => handleAttributeNameChange(attribute.id, e)}>
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
          {attributeParent === "other..." ? (
            <Input
              type="text"
              value={attribute.name}
              onChange={(e) =>
                handleIfAttributeNameIsOther(attribute.id, e.target.value)
              }
            />
          ) : (
            <></>
          )}
          {attribute.values.map((value, valueIndex: number) => (
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
    </div>
  );
}
