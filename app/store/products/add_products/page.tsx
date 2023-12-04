import React from "react";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Add_products_form from "@/components/forms/Add_products_form";

export default async function FormAddProducts({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: dataCollections } = await supabase.from("collections").select();

  // console.log("dataCollections", dataCollections);

  return (
    <div className="my-10 mx-2 w-full flex flex-col items-center justify-center">
      <h3 className="">Let's add or edit your products!</h3>
      <h2 className="text-xl">
        But first, select the collection you want to be related to your products
      </h2>
      <Select required>
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
      </Select>
      <h3 className="mt-6">Now, add your product</h3>
      <Add_products_form />
    </div>
  );
}

// export default FormAddProducts;
