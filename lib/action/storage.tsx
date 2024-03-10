"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { FileRejection } from "react-dropzone";

interface IImageFile {
  file: File;
  preview?: string;
  rejected: boolean;
  errors?: FileRejection["errors"];
}

interface IPreparedFile {
  base64: string;
  name: string;
  type: string;
}

export const saveStorage = async (files: any) => {
  console.log("server", files);
  // const cookieStore = cookies();
  // const supabase = createClient(cookieStore);

  // const uploadPromises = files.map((file, index) => {
  //   // Convert base64 string to Blob
  //   const blob = base64ToBlob(file.base64, file.type);
  //   const filePath = `uploads/${Date.now()}-${index}-${file.name}`;
  //   return supabase.storage.from("products").upload(filePath, blob);
  // });

  // console.log("uploadPromises", uploadPromises);

  // const base64ToBlob = (base64: string, type: string): Blob => {
  //   const binaryString = window.atob(base64.split(",")[1]);
  //   const bytes = new Uint8Array(binaryString.length);
  //   for (let i = 0; i < binaryString.length; i++) {
  //     bytes[i] = binaryString.charCodeAt(i);
  //   }
  //   return new Blob([bytes], { type: type });
  // };

  // // Use Promise.all to concurrently upload all files and wait for them to finish
  // const results = await Promise.all(uploadPromises);

  // // // Process results here (e.g., check for errors, extract URLs)
  // const uploadResults = results.map((result, index) => {
  //   if (result.error) {
  //     console.error(
  //       `Error uploading file ${files[index].name}:`,
  //       result.error.message
  //     );
  //     return { success: false, error: result.error };
  //   } else {
  //     return { success: true, data: result.data };
  //   }
  // });
  // console.log("uploadResults", uploadResults);
  // return uploadResults;
};
