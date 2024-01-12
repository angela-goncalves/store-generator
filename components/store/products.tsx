import { capitalizeFirstLetter, changeNameToLink } from "@/lib/uppercase";
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface IProductData {
  name: string;
  description: string;
  image: string;
  price: string;
  id: string;
  url: string;
}
interface IProduct {
  productData: IProductData;
  storeId: string;
  nameStore: string;
  storeForUser: boolean;
}
export default function Products({
  productData,
  storeId,
  nameStore,
  storeForUser,
}: IProduct) {
  const { id, name, description, image, price, url } = productData;

  const link = storeForUser
    ? `${nameStore}/products/${url}`
    : "#products-store";

  return (
    <Link href={link} id="products-store">
      <div className="flex justify-center">
        <img src={image} alt="image of product" className="w-72 rounded-t-lg" />
      </div>
      <div className="p-6">
        <p className="text-lg">{capitalizeFirstLetter(name)}</p>
        <p>${price}</p>
      </div>
    </Link>
  );
}
