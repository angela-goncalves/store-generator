"use client";
import { handleDeleteProduct } from "@/lib/deleteSupabase";
import React from "react";
import DeleteDialog from "./DeleteDialog";

export default function DeleteCollection({
  productId,
  storeId,
}: {
  productId: string;
  storeId: string;
}) {
  return (
    <DeleteDialog
      id={productId}
      storeId={storeId}
      deleteFunction={handleDeleteProduct}
    />
  );
}
