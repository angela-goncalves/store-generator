import Add_collections_Form from "@/components/forms/Add_collections_Form";

export default function AddCollections() {
  return (
    <div className="w-full flex flex-col items-center mt-10">
      <h3 className="">
        Now, let's add some categories or collections to your store
      </h3>
      <Add_collections_Form />
    </div>
  );
}
