"use client";

import BackButton from "@/components/BackButton";
import AddCollectionsForm from "@/components/forms/addCollectionsForm";

export default function AddCollections({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  return (
    <div className="w-full flex flex-col items-center mt-10">
      <BackButton
        query={{
          pathname: "/store/collections",
          query: { id: searchParams.id },
        }}
      />
      <h3 className="">Create and curate your unique collections here.</h3>
      <AddCollectionsForm storeId={searchParams.id} />
    </div>
  );
}
