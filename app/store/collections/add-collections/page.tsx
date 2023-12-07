import AddCollectionsForm from "@/components/forms/addCollectionsForm";

export default function AddCollections({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  return (
    <div className="w-full flex flex-col items-center mt-10">
      <h3 className="">
        Let's add some categories or collections to your store
      </h3>
      <AddCollectionsForm storeId={searchParams.id} />
    </div>
  );
}
