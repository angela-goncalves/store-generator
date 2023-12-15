"use client";
import { handleDeleteCollection } from "@/lib/deleteSupabase";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { XIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function deleteCollection({
  collectionId,
  storeId,
}: {
  collectionId: string;
  storeId: string;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className="hover:bg-transparent">
        <Button variant="outline" className="bg-transparent border-none ">
          <XIcon className="mr-2 h-4 w-4 text-destructive" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-destructive-foreground">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-secondary font-semibold">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-secondary">
            This action cannot be undone. This will permanently delete your
            collection and remove that data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-btn-successBorder hover:bg-btn-successBorder bg-transparent">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foregroundLight font-semibold hover:text-destructive"
            onClick={() => handleDeleteCollection(collectionId, storeId)}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
