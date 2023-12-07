import React from "react";
import Image from "next/image";
import heroImage from "@/app/public/heroImage.jpg";

interface IHero {
  name: string;
  description: string;
}

export default function Hero({ name, description }: IHero) {
  return (
    <div className="w-full mb-10">
      {name ? (
        <div className="flex flex-col items-center">
          <div className="relative flex flex-col items-center">
            <Image
              src={heroImage}
              alt="image hero"
              width={5000}
              height={3000}
              style={{ objectFit: "cover", maxHeight: "50vh" }}
            />
            <div className="absolute -bottom-14 border rounded-full w-max p-4 m-6 bg-primary">
              <h1 className="text-3xl">{name}</h1>
            </div>
          </div>
          <h3 className="text-2xl mt-12">{description}</h3>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="border rounded-full w-max p-4 m-6 bg-primary">
            <h1>Your store</h1>
          </div>
          <h3 className="text-2xl">Description of your store (optional)</h3>
        </div>
      )}
    </div>
  );
}
