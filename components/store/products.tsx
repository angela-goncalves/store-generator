import { capitalizeFirstLetter } from "@/lib/uppercase";
import React from "react";
import Link from "next/link";

interface IProductData {
  name: string;
  description: string;
  images: string[];
  price: string;
  id: string;
  url: string;
}
interface IProduct {
  productData: IProductData;
  storeId: string;
  nameStore: string;
  storeForUser?: boolean;
}
export default async function Products({
  productData,
  nameStore,
  storeForUser,
}: IProduct) {
  const { name, price, url, images } = productData;
  const link = storeForUser
    ? `/${nameStore}/products/${url}`
    : "#products-store";

  return (
    <Link href={link} id="products-store">
      <div className="flex justify-center">
        {images && (
          <img
            src={images[0]}
            alt="image of product"
            className="w-72 object-cover h-[425px]"
          />
        )}
      </div>
      <div className="p-6">
        <p className="text-lg">{capitalizeFirstLetter(name)}</p>
        <p>${price}</p>
      </div>
    </Link>
  );
}
