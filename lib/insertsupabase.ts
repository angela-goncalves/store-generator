"use server";
import { createClient } from "@/utils/supabase/server";
import { UUID } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const cookieStore = cookies();
const supabase = createClient(cookieStore);

let collection_id: UUID;
const user_id = "34fd397d-fd61-4653-8b6b-309d381aa8e2";
export const handleInsertStore = async (formData: FormData) => {
  // user data
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();
  // if (user) {
  const siteName = formData.get("siteName") as string;
  const siteDescription = formData.get("siteDescription") as string;
  const siteLocation = formData.get("siteLocation") as string;

  const { data, error: pageErrors } = await supabase
    .from("store")
    .insert([
      {
        name: siteName,
        description: siteDescription,
        location: siteLocation,
        // user_id: user.id,
      },
    ])
    .select();

  if (pageErrors !== null) {
    redirect("/add_store?message=store error");
  }

  redirect(`/store?id=${data[0].id}`);
  // } else {
  //   redirect("/add_store?message=You-need-to-be-authenticated");
  // }
};

interface FormDataData {
  name: string;
  description: string;
  id: UUID;
}
export const handleInsertCollections = async (
  formData: FormDataData[],
  storeId: UUID
) => {
  console.log("formData", formData);
  // user data
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();
  const collections = formData.map((item) => {
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      store_id: storeId,
      user_id: user_id,
    };
  });

  console.log("collections", collections);
  // if (user) {
  const { data, error: collectionsErrors } = await supabase
    .from("collections")
    .insert(collections)
    .select();

  if (data !== null) {
    collection_id = data[0].id;
  }

  if (collectionsErrors !== null) {
    redirect("store/collections/add_collections&message=collections errors");
  }

  redirect(`/store?id=${storeId}`);
  // } else {
  //   redirect("/add_collections&message=You need to be authenticated");
  // }
};

export const handleInsertProduct = async (formData: FormData) => {
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
        // collection_id: searchParams.id,
        // user_id: ,
      },
    ])
    .select();
  if (error !== null) {
    redirect("add_products&message=products-error");
  }
  redirect("/products");
};
