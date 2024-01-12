import BackButton from "@/components/BackButton";
import AddStoreForm from "@/components/forms/addStoreForm";
import { getStore } from "@/lib/action/getData";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function AddStorePage({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const getStoreData = await getStore(searchParams.id);

  const storeData = {
    id: getStoreData[0].id,
    name: getStoreData[0].name,
    description: getStoreData[0].description,
    location: getStoreData[0].location,
  };

  return (
    <div className="mt-10 mx-2 w-full flex flex-col items-center ">
      <Link
        className="self-start py-2 px-4 ml-16 w-max rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
        href={
          searchParams.id
            ? { pathname: "/store", query: { id: searchParams.id } }
            : "/"
        }>
        <ChevronLeft />
        Back
      </Link>
      <h3 className="">Hi! Let's get started 💚 </h3>
      <AddStoreForm storeData={storeData} />
    </div>
  );
}
