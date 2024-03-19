"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const saveStorage = async (
  files: FormData,
  storeId: string,
  productId: string
) => {
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
    const filePath = `${storeId}/${productId}/${fileName}`;
    return supabase.storage.from("products").upload(filePath, file);
  });

  try {
    const results = await Promise.all(uploadPromises);
    const findErrors = results.find((item) => {
      return item.error?.message;
    });

    if (findErrors) {
      console.error(
        "something happen saving images",
        findErrors.error?.message
      );
      const errorMessage = findErrors.error?.message
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/ñ/g, "n")
        .replace(/ç/g, "c")
        .replace(/[^a-zA-Z0-9]/g, "-");
      redirect(
        `/store/products/add-products?id=${storeId}&message=something_went_wrong_saving_images:${errorMessage}`
      );
    }
    let images: any[] = [];
    if (results && results.length > 0) {
      images = results.map((item) => {
        return item.data?.path;
      });
    }
    const imagesUrl = await getPublicUrl(images, storeId);

    return imagesUrl;
  } catch (error) {
    console.error("Upload failed", error);
    redirect(
      `/store/products/add-products?id=${storeId}&message=something_went_wrong_saving_images:${error}`
    );
  }
};

export const getPublicUrl = async (images: string[], storeId: string) => {
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
    redirect(`/store/products/add-products?id=${storeId}&message=${error}`);
  }
};
