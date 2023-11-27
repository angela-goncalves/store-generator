import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UUID } from "crypto";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default async function FormAddProducts({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: dataCollections } = await supabase.from("collections").select();

  const handleInsertProduct = async (formData: FormData) => {
    "use server";
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price");

    const { data, error } = await supabase
      .from("products")
      .insert([
        {
          name,
          description,
          price,
          collection_id: searchParams.id,
          user_id: "2ac0d492-170b-4529-a523-21e53dd2eb0d",
        },
      ])
      .select();
    if (error !== null) {
      redirect("/add_products?message=products-error");
    }
    redirect("/store");
  };
  return (
    <div className="my-10 mx-2 max-w-[500px]">
      <h3 className="">Let's add or edit your products!</h3>
      {/* <h2 className="text-xl">
        But first, select the collection you want to be related to your products
      </h2> */}
      {/* <Select required>
        <SelectTrigger className="max-w-xs">
          <SelectValue placeholder="Collections created" />
        </SelectTrigger>
        <SelectContent>
          {dataCollections?.map((item) => {
            return (
              <SelectItem key={item.id} value={item.id}>
                {item.name}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select> */}
      <h3 className="mt-6">Now, add your product</h3>
      <form action={handleInsertProduct}>
        <div className="text-2xl">
          <label htmlFor="productName">Name</label>
          <Input
            type="text"
            name="name"
            className="mt-2"
            id="productName"
            placeholder="Name of the product"
          />
        </div>
        <div className="text-2xl mt-6">
          <label htmlFor="productDescription">Description</label>
          <Input
            type="text"
            name="description"
            className="mt-2"
            id="productDescription"
            placeholder="Description of the product"
          />
        </div>
        <div className="text-2xl mt-6">
          <label htmlFor="productPrice">Price</label>
          <Input
            type="number"
            id="productPrice"
            name="price"
            className="mt-2"
            placeholder="Price"
          />
        </div>
        <div className="text-2xl mt-6">
          <label htmlFor="productImage">URL of the image</label>
          <Input type="file" id="productImage" name="image" className="mt-2" />
        </div>
        <button
          type="submit"
          className="border border-emerald-300 rounded-lg px-6 py-4 my-6">
          submit
        </button>
      </form>
    </div>
  );
}

// export default FormAddProducts;
