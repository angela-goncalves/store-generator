import BackButton from "@/components/BackButton";
import AddStoreForm from "@/components/forms/addStoreForm";

export default function AddStorePage() {
  return (
    <div className="mt-10 mx-2 w-full flex flex-col items-center ">
      <BackButton href="/" />
      <h3 className="">Hi! Let's get started 💚 </h3>
      <AddStoreForm />
    </div>
  );
}
