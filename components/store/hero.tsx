import React from "react";

interface IHero {
  name: string;
  description: string;
}

export default function Hero({ name, description }: IHero) {
  return (
    <div className="w-full mb-10">
      {name ? (
        <div className="flex flex-col items-center">
          <h1 className="text-5xl text-purple-600">{name}</h1>
        </div>
      ) : (
        <div className="border rounded-full w-max p-4 m-6 bg-primary">
          <h1>Your store</h1>
        </div>
      )}
    </div>
  );
}
