import { capitalizeFirstLetter } from "@/lib/uppercase";
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface IProduct {
  name: string;
  description: string;
  image: string;
  price: string;
  id: string;
  storeId: string;
  nameStore: string;
  storeForUser: boolean;
}
export default function Product({
  name,
  description,
  image,
  price,
  id,
  storeId,
  nameStore,
  storeForUser,
}: IProduct) {
  const link = storeForUser
    ? `${nameStore}/${id}`
    : {
        pathname: `/store`,
        query: { id: storeId, productId: id },
      };

  return (
    <Link href={link}>
      <div className="flex justify-center">
        <img src={image} alt="image of product" className="w-60" />
      </div>
      <div className="p-6">
        <p className="text-lg">{capitalizeFirstLetter(name)}</p>
        <p>${price}</p>
      </div>
    </Link>
  );
}
