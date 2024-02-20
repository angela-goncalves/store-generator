"use client";

import React from "react";
import Products from "@/components/store/products";

interface IProsuctsList {
  storeData: any;
  allProducts: any;
  collection?: boolean;
}

export default function ProductsList({
  storeData,
  allProducts,
  collection,
}: IProsuctsList) {
  return (
    <div className="flex justify-center w-full">
      {allProducts.length > 0 ? (
        <div className="w-full max-w-5xl grid grid-cols-3 auto-rows-auto grid-flow-row gap-8 m-10">
          {allProducts.map((item) => (
            <div
              key={item.id}
              className="bg-background dark:bg-secondary text-secondary dark:text-neutral-light shadow-xl w-72">
              <Products
                productData={item}
                storeId={storeData.id}
                storeForUser
                nameStore={storeData.name}
              />
            </div>
          ))}
        </div>
      ) : (
        <div>
          {collection && allProducts.length === 0 ? (
            <p>
              Currently, there are no products available in this collection.
              Please check back later or browse our other collections.
            </p>
          ) : (
            <p>
              We're all out of products at the moment! New stock is coming soon,
              so stay tuned.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
