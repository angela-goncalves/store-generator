"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { capitalizeFirstLetter } from "@/lib/uppercase";
import ShoppingBag from "./shoppingBag";

interface IProduct {
  id: string;
  created_at: string;
  description: string;
  image: string;
  name: string;
  price: string;
  store_id: string;
}

interface IProductComponent {
  productData: IProduct;
  attributes: any;
}

export default function Product({
  productData,
  attributes,
}: IProductComponent) {
  const [openCart, setOpenCart] = useState(false);
  return (
    <div className="flex w-full justify-around ">
      <div className="max-w-xs flex">
        <div className="flex flex-col self-end">
          <h3>Composition</h3>
          <p className="text-sm mt-3">
            We work with monitoring programs to guarantee compliance with the
            social, environmental, and health and safety standards of our
            products. To assess its compliance, we have developed an audit
            program and plans for continual improvement.
          </p>
        </div>
      </div>
      <div className="flex flex-col mt-10">
        <h2 className="text-3xl">{productData.name.toUpperCase()}</h2>
        <div className="flex gap-4 mt-14 bg-secondary p-4">
          <img
            className="max-w-[300px]"
            src={productData.image}
            alt={`${productData.name} image`}
          />
        </div>
      </div>
      <div className="flex flex-col justify-center gap-14">
        <div className="p-2 max-w-xs h-min">
          <p className="text-sm">
            {capitalizeFirstLetter(productData.description || "")}
          </p>
        </div>
        <p className="text-2xl">${productData.price}</p>
        <div>
          {attributes.map((item: any) => (
            <div key={item.id}>
              <p className="font-bold">{item.name}</p>
              <div className="flex gap-4">
                {item.children_values.map((ele: any) => (
                  <p key={ele}>{ele}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Button onClick={() => setOpenCart(true)}>
          <p className="p-4 text-center text-md">Add to shopping bag</p>
        </Button>
        {openCart && <ShoppingBag productData={productData} />}
      </div>
    </div>
  );
}
