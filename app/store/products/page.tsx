import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import React from "react";
import Link from "next/link";

export default async function Products() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: dataProducts, error } = await supabase
    .from("products")
    .select();

  if (dataProducts === null || error !== null) {
    redirect("/collections?message=collections errors");
  }

  return (
    <div className="w-full">
      {dataProducts.length > 0 ? (
        <div>
          <ul>
            {dataProducts.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      ) : (
        <h3>Don't have products yet</h3>
      )}
      <Link href="/store/products/add_collections" className="text-blue-400">
        Add Products
      </Link>
    </div>
  );
}
