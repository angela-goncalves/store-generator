import AddStoreForm from "@/components/forms/addStoreForm";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function AddStorePage({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  return (
    <div className="mt-10 mx-2 w-full flex flex-col items-center ">
      <Link
        className="self-start py-2 px-4 ml-16 w-max rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
        href={
          searchParams.id !== undefined
            ? {
                pathname: "/store",
                query: { id: searchParams.id },
              }
            : "/"
        }>
        <ChevronLeft />
        Back
      </Link>
      <h3 className="">Hi! Let's get started 💚 </h3>
      <AddStoreForm />
    </div>
  );
}
