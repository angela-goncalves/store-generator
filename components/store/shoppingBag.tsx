"use client";

import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { ShoppingBagIcon, TrashIcon } from "lucide-react";
import ShoppingBagForm from "../forms/shoppingBagForm";
import {
  updateProductInCookies,
  saveProductsFromShoppingBag,
} from "@/lib/action/cookies";
import { Separator } from "../ui/separator";
import { capitalizeFirstLetter } from "@/lib/uppercase";

interface IAttributes {
  id: string;
  name: string;
  children_values: string[];
}

interface IProduct {
  productName: string;
  productId: string;
  productPrice: number;
  attributes: IAttributes[];
  noItems: number;
}
interface IShoppingBag {
  productsData: IProduct[];
  storeName: string;
  storeWhatsapp: string;
}

export default function ShoppingBag({
  productsData,
  storeName,
  storeWhatsapp,
}: IShoppingBag) {
  const [productsToBuy, setproductsToBuy] = useState<IProduct[]>(
    productsData ? productsData : []
  );

  const total = productsToBuy.reduce((acc, product) => {
    return acc + product.productPrice * product.noItems;
  }, 0);

  const count = productsToBuy.reduce((acc, product) => {
    return acc + product.noItems;
  }, 0);

  const handleDeleteProduct = (productName: string) => {
    const filterProductCounterZero = productsToBuy.filter(
      (item) => item.productName !== productName
    );

    setproductsToBuy(filterProductCounterZero);
    updateProductInCookies(filterProductCounterZero);
  };

  const handleSaveAndSendMessage = async () => {
    await saveProductsFromShoppingBag(productsToBuy);
    const text = productsToBuy
      .reduce(
        (message, product) =>
          message.concat(
            `* ${capitalizeFirstLetter(product.productName || "")} - $${
              product.productPrice * product.noItems
            }\nTotal: $${total}`
          ),
        ""
      )
      .concat(`\nHi! How are you? I would like to buy this products \n`);
    window.location.href = `https://wa.me/${storeWhatsapp}?text=${encodeURIComponent(
      text
    )}`;
  };

  useEffect(() => {
    if (productsData) {
      setproductsToBuy(productsData);
    }
  }, [productsData]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="relative">
          {count > 0 && (
            <div className="absolute top-0 right-2 bg-secondary text-primary rounded-full px-1 p-0">
              {count}
            </div>
          )}
          <ShoppingBagIcon className="justify-self-end" />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-white dark:bg-gray-800 rounded-lg shadow-md w-full max-w-2xl p-6 pb-0">
        <SheetHeader>
          <SheetTitle className="text-2xl">Shopping bag</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col h-[87vh] justify-between overflow-y-scroll">
          <div className="flex-col flex-1 flex justify-between">
            <div>
              {productsToBuy.map((item, index) =>
                item.noItems === 0 ? (
                  <div key={index + 2} />
                ) : (
                  <div key={index} className="">
                    <div className="flex items-center">
                      <ShoppingBagForm
                        productData={item}
                        setproductsToBuy={setproductsToBuy}
                        productsToBuy={productsToBuy}
                        storeName={storeName}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => handleDeleteProduct(item.productName)}>
                        <TrashIcon className="w-5" />
                      </Button>
                    </div>
                    <Separator className="w-full border-black" />
                  </div>
                )
              )}
            </div>
            <div className="pt-6 my-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-medium">Total</span>
                <span className="text-lg font-medium">{total}</span>
              </div>
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="button" onClick={handleSaveAndSendMessage}>
                Proceed to buy!
              </Button>
            </SheetClose>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
