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
  nameStore: string;
}
export default function Product({
  name,
  description,
  image,
  price,
  id,
  nameStore,
}: IProduct) {
  return (
    <Link href={`${nameStore}/${id}`}>
      {/* <Image src={image} alt="image of product" width={200} height={200} /> */}
      <p className="text-lg">{capitalizeFirstLetter(name)}</p>
      <p>${price}</p>
    </Link>
  );
}
