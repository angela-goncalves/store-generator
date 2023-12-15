import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import React from "react";
import Link from "next/link";
import { PencilLineIcon, Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import BackButton from "@/components/BackButton";
import Image from "next/image";
import productImage from "@/app/public/product.png";
import DeleteProduct from "@/components/DeleteProduct";

export default async function Products({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: dataProducts, error } = await supabase
    .from("products")
    .select()
    .eq("store_id", searchParams.id);

  if (dataProducts === null || error !== null) {
    redirect(`store/products?id=${searchParams.id}&message=products-errors`);
  }

  const collections = true;
  return (
    <div className="w-full flex flex-col items-center mt-10">
      <BackButton
        query={{
          pathname: "/store",
          query: { id: searchParams.id },
        }}
      />
      <div className="w-full max-w-[800px] flex flex-col gap-6 h-full">
        <div className="flex justify-between">
          <h1 className="text-secondary font-bold text-3xl">Products</h1>
          <Link
            href={{
              pathname: `/store/products/add-products`,
              query: { id: `${searchParams.id}` },
            }}
            className="flex border items-center border-secondary rounded-lg text-sm p-2 my-4 text-center gap-2">
            <Plus className="w-4 " />
            <p className="text-primary-foreground ">Add new product</p>
          </Link>
        </div>
        {dataProducts.length > 0 ? (
          <ul className="flex flex-col justify-center w-full gap-6">
            <div className="flex justify-between text-2xl mt-8">
              <li className="w-[200px]">Title</li>
              <li className="w-[80px]">Price</li>
              <li></li>
            </div>
            {dataProducts.map((item) => (
              <div key={item.id}>
                <li className="flex justify-between gap-4 items-center">
                  <p className="w-[250px]">{item.name}</p>
                  <p className="w-[50px]">${item.price}</p>
                  <div className="flex gap-2 items-center">
                    <Link
                      href={{
                        pathname: "/store/products/add-products",
                        query: {
                          id: searchParams.id,
                          productId: item.id,
                          productName: item.name,
                          productDescription: item.description,
                          productPrice: item.price,
                          image: item.image,
                          collectionId: item.collection_id,
                        },
                      }}>
                      <PencilLineIcon className="mr-2 h-4 w-4" />
                    </Link>
                    <DeleteProduct
                      productId={item.id}
                      storeId={searchParams.id}
                    />
                  </div>
                </li>
                <Separator className="bg-neutral-dark" />
              </div>
            ))}
          </ul>
        ) : (
          <div className="flex mt-20 justify-center">
            <div className="flex justify-center self-center bg-white p-6 rounded-lg gap-10">
              <Image
                src={productImage}
                width={400}
                height={400}
                alt="image relate to edit products"
              />
              {collections ? (
                <div className="flex flex-col gap-2">
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
              ) : (
                <div className="flex flex-col items-center">
                  <h3>Need to add some collections first</h3>
                  <Link
                    href={{
                      pathname: `/store/collections/add-collections`,
                      query: { id: `${searchParams.id}` },
                    }}>
                    <p className="bg-primary text-primary-foreground rounded-lg font-semibold p-4 my-4 w-40 text-center">
                      Add Collections
                    </p>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
