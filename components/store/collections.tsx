import React from "react";
import { capitalizeFirstLetter } from "@/lib/uppercase";
import { getCollectionById } from "@/lib/action/getData";
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
  const collection = await getCollectionById(collectionId, storeId);

  return (
    <div className="w-96" id="collections-store">
      <Link href={"#collections-store"}>
        <div className="relative">
          <Image
            src={heroImage}
            alt="image hero"
            width={500}
            height={500}
            className="transition ease-in-out duration-500 hover:scale-105 rounded-lg"
          />
          <p className="text-lg absolute top-[20px] left-[20px]">
            {capitalizeFirstLetter(collection[0].name)}
          </p>
        </div>
      </Link>
    </div>
  );
}
