import { redirect } from "next/navigation";
import React from "react";
import Link from "next/link";
import { PencilLineIcon, Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import productImage from "@/app/public/product.png";
import { capitalizeFirstLetter } from "@/lib/uppercase";
import { getAllProductsOfStore } from "@/lib/action/getData";
import DeleteDialog from "@/components/DeleteDialog";
import { handleDeleteProduct } from "@/lib/deleteSupabase";

export default async function Products({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const dataProducts: Products[] = await getAllProductsOfStore(searchParams.id);

  if (dataProducts === null) {
    redirect(`store/products?id=${searchParams.id}&message=products-errors`);
  }

  return (
    <div className="w-full flex flex-col items-center mt-10">
      <div className="w-full max-w-[800px] flex flex-col h-full">
        <h1 className="text-secondary font-bold text-3xl">Products</h1>
        {dataProducts.length > 0 ? (
          <div className="flex flex-col">
            <Link
              href={{
                pathname: `/store/products/add-products`,
                query: { id: `${searchParams.id}` },
              }}
              className="flex self-end border items-center border-secondary rounded-lg text-sm p-2 mb-4 text-center gap-2">
              <Plus className="w-4 " />
              <p className="text-primary-foreground ">Add new product</p>
            </Link>
            <ul className="flex flex-col justify-center w-full gap-6">
              <div className="flex text-xl justify-between mt-8">
                <li className="w-[200px]">Title</li>
                <li className="w-[80px]">Price</li>
                <li></li>
              </div>
              {dataProducts.map((item) => (
                <div key={item.id}>
                  <li className="flex gap-4 items-center justify-between w-full">
                    <Link
                      href={{
                        pathname: "/store/products/add-products",
                        query: {
                          id: searchParams.id,
                          productId: item.id,
                        },
                      }}
                      className="w-full">
                      <div className="flex gap-2 items-center justify-between w-full">
                        <p className="w-[30%] font-semibold">
                          {capitalizeFirstLetter(item.name || "")}
                        </p>
                        <p className="w-[30%]">${item.price}</p>
                        <PencilLineIcon className="mr-2 h-4 w-4" />
                      </div>
                    </Link>
                    <DeleteDialog
                      id={item.id}
                      storeId={searchParams.id}
                      from="products"
                      deleteFunction={handleDeleteProduct}
                    />
                  </li>
                  <Separator className="bg-neutral-dark my-2" />
                </div>
              ))}
            </ul>
          </div>
        ) : (
          <div className="flex mt-20 justify-center">
            <div className="flex justify-center h-[300px] self-center bg-white p-6 rounded-lg gap-10">
              <div className="lg:w-[340px] relative">
                <Image
                  src={productImage}
                  fill
                  style={{ objectFit: "cover" }}
                  alt="image relate to edit products"
                />
              </div>
              <div className="flex flex-col gap-2 w-[240px]">
                <h3 className="font-bold text-lg">Your Showcase Awaits!"</h3>
                <h3 className="text-sm">
                  You haven't added any products yet. Get started and show the
                  world what you've got!
                </h3>
                <Link
                  href={{
                    pathname: `/store/products/add-products`,
                    query: { id: `${searchParams.id}` },
                  }}>
                  <p className="bg-primary text-primary-foreground rounded-lg font-semibold p-4 my-4 w-40 text-center">
                    Add Products
                  </p>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
