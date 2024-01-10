import React from "react";
import Product from "./product";
import { capitalizeFirstLetter } from "@/lib/uppercase";
import { getCollectionsById } from "@/lib/action/getData";
import Link from "next/link";
import heroImage from "@/app/public/heroImage.jpg";
import Image from "next/image";

export default async function Collections({
  collectionId,
  nameStore,
  storeId,
  storeForUser,
}: {
  collectionId: string;
  nameStore: string;
  storeId: string;
  storeForUser: boolean;
}) {
  const collection = await getCollectionsById(collectionId);

  return (
    <Link
      href={
        storeForUser
          ? {
              pathname: `/${nameStore}`,
              query: { collectionId: collectionId },
            }
          : {
              pathname: "/store",
              query: { id: storeId, collectionId: collectionId },
            }
      }>
      <div className="relative">
        <Image
          src={heroImage}
          alt="image hero"
          width={300}
          height={300}
          className="object-cover transition ease-in-out duration-500 hover:scale-105"
        />
        <p className="text-lg absolute top-[50%] left-[40%]">
          {capitalizeFirstLetter(collection[0].name)}
        </p>
      </div>
    </Link>
  );
}
