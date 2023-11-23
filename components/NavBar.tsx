import React from "react";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function NavBar() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: dataCollections, error } = await supabase
    .from("collections")
    .select();
  if (dataCollections === null || error !== null) {
    redirect("/store?message=something went wrong with stores in navbar");
  }
  return (
    <nav className="bg-gray-600 p-8 h-screen">
      <ul>
        <li>
          <Link href="/collections">Collections</Link>
        </li>
        <li>
          <Link href={"/products"}>Products</Link>
        </li>
        <li>
          {dataCollections?.map((item) => (
            <Link key={item.id} href="/store">
              {item.name}
            </Link>
          ))}
        </li>
      </ul>
    </nav>
  );
}
