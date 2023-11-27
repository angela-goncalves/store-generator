import Form_add_store from "@/components/forms/Form_add_store";
import Link from "next/link";

const AddStorePage: React.FC = () => {
  return (
    <div className="mt-10 mx-2 w-full flex flex-col items-center ">
      <Link
        href="/"
        className="py-2 px-4 self-start mt-6 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back
      </Link>
      <h3 className="">Hi! Let's get started 💚 </h3>
      <Form_add_store />
    </div>
  );
};

export default AddStorePage;
