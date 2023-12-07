import AddCollectionsForm from "@/components/forms/addCollectionsForm";
import Link from "next/link";

export default function AddCollections({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  return (
    <div className="w-full flex flex-col items-center mt-10">
      <Link
        href={{
          pathname: "/store/collections",
          query: { id: searchParams.id },
        }}
        className="self-start">
        Back
      </Link>
      <h3 className="">
        Let's add some categories or collections to your store
      </h3>
      <AddCollectionsForm storeId={searchParams.id} />
    </div>
  );
}
