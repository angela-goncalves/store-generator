import TemplateComponent from "@/components/store";

export default function Store({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  return (
    <div className="">
      <TemplateComponent storeId={searchParams.id} />
    </div>
  );
}
