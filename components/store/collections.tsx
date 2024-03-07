import React from "react";
import { capitalizeFirstLetter } from "@/lib/uppercase";
import { getCollectionById } from "@/lib/action/getData";
import Link from "next/link";
import heroImage from "@/app/public/heroImage.jpg";
import Image from "next/image";

export default async function Collections({
  collectionId,
  storeId,
  storeForUser,
  nameStore,
}: {
  collectionId: string;
  nameStore: string;
  storeId: string;
  storeForUser?: boolean;
}) {
  const collection = await getCollectionById(collectionId, storeId);

  return (
    <div className="w-96 h-full" id="collections-store">
      <Link
        href={
          storeForUser
            ? `/${nameStore}/collections/${collection[0].name}`
            : "#collections-store"
        }>
        <div className="relative h-full">
          <Image
            src={heroImage}
            alt="image hero"
            width={500}
            height={500}
            className=" h-full transition ease-in-out duration-500 hover:scale-105"
          />
          <p className="text-lg absolute top-[20px] left-[20px]">
            {capitalizeFirstLetter(collection[0].name)}
          </p>
        </div>
      </Link>
    </div>
  );
}
