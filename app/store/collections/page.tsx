import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import React from "react";
import Link from "next/link";

export default async function Collections({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: dataCollections, error } = await supabase
    .from("collections")
    .select();

  // console.log("dataCollections", dataCollections);

  if (dataCollections === null || error !== null) {
    redirect(
      `/store?id=${searchParams.id}/collections&message=collections errors`
    );
  }
  // console.log("id in collections", searchParams.id);
  // console.log("searchParams.id", searchParams.id);
  return (
    <div className="w-full">
      {dataCollections.length > 0 ? (
        <div>
          <ul>
            {dataCollections.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      ) : (
        <h3>Don't have collection yet</h3>
      )}
      <Link
        href={{
          pathname: "/store/collections/add_collections",
          query: { id: searchParams.id },
        }}
        className="text-blue-400">
        Add collections
      </Link>
    </div>
  );
}
