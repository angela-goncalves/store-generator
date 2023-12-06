import UpdateCollections from "@/components/forms/updateCollectionForm";
import { UUID } from "crypto";

export default function EditCollection({
  searchParams,
}: {
  searchParams: {
    id: string;
    collectionid: string;
    collectiontitle: string;
    collectiondescription: string;
  };
}) {
  return (
    <div className="w-full flex flex-col items-center mt-10">
      <h3 className="">{`Edit and update ${searchParams.collectiontitle}`}</h3>
      <UpdateCollections
        collectionid={searchParams.collectionid as UUID}
        collectiontitle={searchParams.collectiontitle}
        collectiondescription={searchParams.collectiondescription}
      />
    </div>
  );
}
