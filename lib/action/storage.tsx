
"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const saveStorage = async (files: FormData, storeId: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();
  const { session } = sessionData;

  if (session === null || sessionError !== null) {
    redirect(`/login?signin=true`);
  }

  const imageFiles: File[] = [];
  files.forEach((value, key) => {
    if (value instanceof File) {
      imageFiles.push(value);
    }
  });

  const uploadPromises = imageFiles.map((file, index) => {
    const fileName = file.name.toLowerCase();
    const filePath = `${session.user.id}/${storeId}/${fileName}`;
    return supabase.storage.from("products").upload(filePath, file);
  });

  try {
    const results = await Promise.all(uploadPromises);
    const findErrors = results.find((item) => {
      return item.error?.message;
    });

    if (findErrors) {

     // console.error("something happen saving images", findErrors.error);
      
      redirect(`/store/products?id=${storeId}&message=${findErrors.error}`);
    }
    let images: any[] = [];
    if (results && results.length > 0) {
      images = results.map((item) => {
        return item.data?.path;
      });
    }
    const imagesUrl = await getSignedUrl(images);

    return imagesUrl;
  } catch (error) {
    console.error("Upload failed", error);
  }
};

export const getSignedUrl = async (images: string[]) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const imagesUploaded = images.map((item) =>
    supabase.storage.from("products").getPublicUrl(`${item}`)
  );
  
  try {
    const results = await Promise.all(imagesUploaded);
    return results;
  } catch (error) {
    console.error(error);
  }
};
