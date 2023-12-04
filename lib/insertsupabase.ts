"use server";
import { createClient } from "@/utils/supabase/server";
import { UUID } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const cookieStore = cookies();
const supabase = createClient(cookieStore);

let store_id: UUID;
let collection_id: UUID;

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

  if (data !== null) {
    store_id = data[0].id;
  }
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
  additionalName: string;
  additionalDescription: string;
}
export const handleInsertCollections = async (
  formData: FormDataData,
  storeId: UUID
) => {
  // user data
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // if (user) {
  // probbly not using this get
  const collectionName = formData.name;
  const collectionDescription = formData.description;
  const secondNameCollection = formData.additionalName;
  const secondDescription = formData.additionalDescription;

  const { data, error: collectionsErrors } = await supabase
    .from("collections")
    .insert([
      {
        name: collectionName,
        description: collectionDescription,
        // user_id: ,
        store_id: storeId,
      },
      {
        name: secondNameCollection,
        description: secondDescription,
        // user_id: ,
        store_id: storeId,
      },
    ])
    .select();

  if (data !== null) {
    collection_id = data[0].id;
  }

  if (collectionsErrors !== null) {
    redirect("add_collections&message=collections errors");
  }

  redirect("/collections");
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
