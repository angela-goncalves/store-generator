"use server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const handleInsertStore = async (formData: FormData) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // user data
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const pageName = formData.get("pageName") as string;
    const pageDescription = formData.get("pageDescription") as string;

    const collectionName = formData.get("collectionName") as string;
    const collectionDescription = formData.get(
      "collectionDescription"
    ) as string;

    const { data, error: pageErrors } = await supabase
      .from("store")
      .insert([
        {
          name: pageName,
          description: pageDescription,
          user_id: user?.id,
        },
      ])
      .select();

    const { error: collectionsErrors } = await supabase
      .from("collections")
      .insert([
        {
          name: collectionName,
          description: collectionDescription,
          user_id: user?.id,
        },
      ])
      .select();

    console.log("insert pageErrors", pageErrors);
    console.log("page data", data);
    console.log("inseert collectionsErrors", collectionsErrors);
  } else {
    NextResponse.json("you need to be authenticated");
  }

  //form data
  //   if (pageErrors || collectionsErrors) throw new Error();
};

export async function handleInsertProduct(formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // user's data
  const {
    data: { user },
  } = await supabase.auth.getUser();

  //form data
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as File;
  const price = formData.get("price");
  const { data, error } = await supabase
    .from("products")
    .insert([
      {
        name,
        description,
        price,
        image: image.name,
        collection_id: "collectionId",
      },
    ])
    .select();
  console.log("insert data", data);
  console.log("insert error", error);
  // if (error) throw new Error();
}
