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
  const collections = await getCollectionById(
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
      <h3>{`Edit and update ${collections[0].name}`}</h3>
      <UpdateCollections
        storeId={searchParams.id}
        collectionId={searchParams.collectionId}
        collectionTitle={collections[0].name}
        collectionDescription={collections[0].description}
      />
    </div>
  );
}
