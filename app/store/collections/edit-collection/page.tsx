import UpdateCollections from "@/components/forms/updateCollectionForm";

export default function EditCollection({
  searchParams,
}: {
  searchParams: {
    id: string;
    collectionId: string;
    collectionTitle: string;
    collectionDescription: string;
  };
}) {
  return (
    <div className="w-full flex flex-col items-center mt-10">
      <h3>{`Edit and update ${searchParams.collectionTitle}`}</h3>
      <UpdateCollections
        collectionId={searchParams.collectionId}
        collectionTitle={searchParams.collectionTitle}
        collectionDescription={searchParams.collectionDescription}
      />
    </div>
  );
}
