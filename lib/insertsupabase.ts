"use server";
import { createClient } from "@/utils/supabase/server";
import { UUID } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const cookieStore = cookies();
const supabase = createClient(cookieStore);
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

  if (collectionsErrors !== null) {
    redirect("add_collections&message=collections errors");
  }

  redirect("/collections");
  // } else {
  //   redirect("/add_collections&message=You need to be authenticated");
  // }
};

interface IFormDataInsertProduct {
  name: string;
  description: string;
  price: string;
  image: string;
  collectionId: string;
}

export const handleInsertProduct = async (
  formData: IFormDataInsertProduct,
  storeid: string
) => {
  const name = formData.name;
  const description = formData.description;
  const price = formData.price;
  const image = formData.image;
  const collection_id = formData.collectionId;
  const productAdded = [
    {
      name,
      description,
      price: Number(price),
      image,
      collection_id,
    },
  ];

  const { data, error } = await supabase
    .from("products")
    .insert(productAdded)
    .select();

  if (data === null || error !== null) {
    redirect(
      "/store/products/add_products?id=${storeid}&message=products-error"
    );
  }

  redirect(`/store/products?id=${storeid}`);
};
