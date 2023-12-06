"use client";
import { handleDeleteCollection } from "@/lib/deleteSupabase";
import { UUID } from "crypto";
import React from "react";
import { Button } from "../ui/button";
import { XIcon } from "lucide-react";

export default function deleteCollection({
  collectionId,
  storeId,
}: {
  collectionId: UUID;
  storeId: UUID;
}) {
  return (
    <Button
      onClick={() => handleDeleteCollection(collectionId, storeId)}
      className="bg-transparent">
      <XIcon className="mr-2 h-4 w-4 text-destructive" />
    </Button>
  );
}
