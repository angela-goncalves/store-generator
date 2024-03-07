"use client";

import React from "react";
import { Button } from "./ui/button";
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

export default function DeleteDialog({
  id, //could be a collection id or product id
  storeId,
  from, // from where is called this Alert
  deleteFunction,
}: {
  id: string;
  deleteFunction: (storeId: string, id: string) => void;
  from: string;
  storeId: string;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className="hover:bg-transparent">
        <Button variant="outline" className="bg-transparent border-none ">
          <XIcon className="mr-2 h-4 w-4 text-destructive" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white p-8 max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-secondary text-bold text-xl mb-4">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600">
            {`This action cannot be undone. This will permanently delete your
            ${from} and remove that data from our servers.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-6 w-full flex justify-center items-center">
          <AlertDialogAction
            className="bg-destructive text-white font-semibold hover:bg-destructive w-full max-w-[200px]"
            onClick={() => deleteFunction(id, storeId)}>
            Yes, delete it
          </AlertDialogAction>
          <AlertDialogCancel className="bg-gray-200 hover:bg-btn-successBg-foreground w-full max-w-[200px]">
            No, keep it
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
