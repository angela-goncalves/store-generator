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

interface IAttributeschildren {
  id: string;
  name: string;
  childrenValue: string[];
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

  const [messageToAddData, setMessageToAddData] = useState<boolean>(false);

  const [attributesChildrenCopy, setAttributesChildrenCopy] = useState<
    IAttributeschildren[]
  >([{ id: uuidv4(), name: "", childrenValue: [""] }]);

  const handleAttributeNameChange = (id: string, value: string) => {
    const newAttributesChildren = attributesChildrenCopy.map((attribute) => {
      if (attribute.id === id) {
        return { ...attribute, name: value === "other..." ? "" : value };
      }
      return attribute;
    });
    setAttributeParent(value);
    setAttributesChildrenCopy(newAttributesChildren);
  };

  const handleIfAttributeNameIsOther = (id: string, value: string) => {
    const newAttributesChildren = attributesChildrenCopy.map((attribute) => {
      if (attribute.id === id) {
        return { ...attribute, name: value };
      }
      return attribute;
    });
    setAttributesChildrenCopy(newAttributesChildren);
  };

  const handleAttributeChildChange = (
    attributeId: string,
    valueIndex: number,
    value: string
  ) => {
    const newAttributes = attributesChildrenCopy.map((attribute) => {
      if (attribute.id === attributeId) {
        const newValues = [...attribute.childrenValue];
        newValues[valueIndex] = value;
        return { ...attribute, childrenValue: newValues };
      }
      return attribute;
    });
    setAttributesChildrenCopy(newAttributes);
  };

  const handleAddAttributeChild = (attributeId: string) => {
    const newAttributes = attributesChildrenCopy.map((attribute) => {
      if (attribute.id === attributeId) {
        return {
          ...attribute,
          childrenValue: [...attribute.childrenValue, ""],
        };
      }
      return attribute;
    });
    setAttributesChildrenCopy(newAttributes);
  };

  const handleRemoveAttributeChild = (
    attributeId: string,
    valueIndex: number
  ) => {
    const newAttributes = attributesChildrenCopy.map((attribute) => {
      if (attribute.id === attributeId) {
        const newValues = [...attribute.childrenValue];
        newValues.splice(valueIndex, 1);
        return { ...attribute, childrenValue: newValues };
      }
      return attribute;
    });
    setAttributesChildrenCopy(newAttributes);
  };

  const handleSaveNewAttribute = () => {
    const findEmptyNameWithChildren = attributesChildrenCopy.some(
      (item) => item.name === "" && item.childrenValue.length > 1
    );
    if (findEmptyNameWithChildren) {
      setMessageToAddData(true);
    } else {
      setAttributesChildrenCopy([
        { id: uuidv4(), name: "", childrenValue: [""] },
      ]);
      setAttributesChildren([...attributesChildren, ...attributesChildrenCopy]);
      setMessageToAddData(false);
    }
  };

  const removeAttributeChild = (
    attributeId: string,
    attributeChildName: string
  ) => {
    const findParentId = attributesChildren.map((attribute) => {
      if (attribute.id === attributeId) {
        return {
          ...attribute,
          childrenValue: attribute.childrenValue.filter(
            (ele) => !ele.includes(attributeChildName)
          ),
        };
      } else {
        return attribute;
      }
    });
    setAttributesChildren(findParentId);
  };

  const handleRemoveAttribute = (attributeId: string) => {
    const removeAttribute = attributesChildren.filter(
      (item) => item.id !== attributeId
    );
    setAttributesChildren(removeAttribute);
  };

  return (
    <div className="flex flex-col">
      <h3 className="my-2">
        Choose an attribute to create variants for your product
      </h3>
      {attributesChildren.length > 0 &&
        attributesChildren.map((item) => (
          <div key={item.id} className="mb-4">
            <div className="flex items-center">
              <p>{item.name}</p>
              <Button
                variant="ghost"
                onClick={() => handleRemoveAttribute(item.id)}>
                <XIcon className="w-4 " />
              </Button>
            </div>
            <div className="flex">
              {item.childrenValue.map((value, index) => (
                <div
                  key={value + index}
                  className="border mx-2 rounded-md flex items-center">
                  <p className="ml-4">{value}</p>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      removeAttributeChild(item.id, value);
                    }}>
                    <XIcon className="w-4 p-0" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ))}
      {attributesChildrenCopy.map((attribute) => (
        <div key={attribute.id} className="flex-col flex gap-4 mt-4">
          <Select
            name="variantParent"
            onValueChange={(e) => handleAttributeNameChange(attribute.id, e)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an attribute" />
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
          {attribute.childrenValue.map((value, valueIndex: number) => (
            <div key={valueIndex} className="flex items-center">
              <Input
                type="text"
                value={value}
                onChange={(e) =>
                  handleAttributeChildChange(
                    attribute.id,
                    valueIndex,
                    e.target.value
                  )
                }
              />
              <Button
                variant="ghost"
                onClick={() =>
                  handleRemoveAttributeChild(attribute.id, valueIndex)
                }>
                <XIcon className="w-4 " />
              </Button>
            </div>
          ))}
          {messageToAddData && (
            <p className="text-destructive">Should fill all options</p>
          )}
          <Button
            onClick={() => handleAddAttributeChild(attribute.id)}
            className="self-start"
            variant="outline">
            <Plus className="w-4" />
          </Button>

          <Button
            onClick={handleSaveNewAttribute}
            disabled={
              attribute.name === "" && attribute.childrenValue[0] === ""
            }
            className="self-end hover:bg-secondary "
            variant="secondary">
            Save variant
          </Button>
        </div>
      ))}
    </div>
  );
}
