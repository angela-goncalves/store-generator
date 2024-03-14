"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { capitalizeFirstLetter } from "@/lib/uppercase";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { onSubmitProductToShoppingBag } from "@/lib/action/cookies";
import Link from "next/link";

interface IAttributes {
  id: string;
  name: string;
  children_values: string[];
}
interface IProductComponent {
  productData: Products;
  attributes: any[];
  storeName: string;
}

export default function ProductDetails({
  productData,
  attributes,
  storeName,
}: IProductComponent) {
  const [attributesForm, setAttributesForm] = useState<IAttributes[]>(
    attributes ? attributes : [{ id: "", name: "", child: [""] }]
  );

  const onChange = (value: string, parent: string) => {
    const newAttributes = attributesForm.map((attribute) => {
      if (attribute.name === parent) {
        return { ...attribute, children_values: [value] };
      }
      return attribute;
    });
    setAttributesForm(newAttributes);
  };

  return (
    <form
      className="flex w-full justify-around"
      action={() =>
        onSubmitProductToShoppingBag(attributesForm, productData, 1, storeName)
      }>
      <div>
        <div className="max-w-xs flex">
          <div className="flex flex-col self-end ml-16">
            <h3>Composition</h3>
            <p className="text-sm mt-3">
              We work with monitoring programs to guarantee compliance with the
              social, environmental, and health and safety standards of our
              products. To assess its compliance, we have developed an audit
              program and plans for continual improvement.
            </p>
          </div>
        </div>
        <div className="flex flex-col mt-6">
          <h2 className="text-3xl">{productData.name?.toUpperCase()}</h2>
          <div className="flex gap-4 mt-14 bg-secondary p-4">
            {productData.images?.map((item) => (
              <img
                className="max-w-[300px]"
                src={typeof item === "string" ? item : "#"}
                alt={`${productData.name} image`}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-center gap-14">
          <div className="p-2 max-w-xs h-min">
            <p className="text-sm">
              {capitalizeFirstLetter(productData.description || "")}
            </p>
          </div>
          <p className="text-2xl">${productData.price}</p>
          {attributes.map((item: IAttributes) => (
            <div key={item.id}>
              <RadioGroup
                name={item.name}
                onValueChange={(e) => onChange(e, item.name)}>
                <p className="font-bold">{item.name}</p>
                <div className="flex gap-4">
                  {item.children_values.map((ele: any) => (
                    <label
                      key={ele}
                      htmlFor={ele}
                      className="flex gap-2 items-center">
                      <RadioGroupItem value={ele} id={ele} required />
                      <p>{ele}</p>
                    </label>
                  ))}
                </div>
              </RadioGroup>
            </div>
          ))}
          <Button variant="outline" type="submit">
            Add to Bag
          </Button>
        </div>
      </div>
    </form>
  );
}
