import BackButton from "@/components/BackButton";
import UpdateCollections from "@/components/forms/updateCollectionForm";
import { getCollectionById } from "@/lib/action/getData";

export default async function EditCollection({
  searchParams,
}: {
  searchParams: {
    id: string;
    collectionId: string;
  };
}) {
  const collection: Collections[] = await getCollectionById(
    searchParams.collectionId,
    searchParams.id
  );

  return (
    <div className="w-full flex flex-col items-center mt-10">
      <BackButton
        query={{
          pathname: "/store/collections",
          query: { id: searchParams.id },
        }}
      />
      <h3>{`Edit and update ${collection[0].name}`}</h3>
      <UpdateCollections storeId={searchParams.id} collection={collection[0]} />
    </div>
  );
}
