import TemplateComponent from "@/components/store";

export default function Store({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  return (
    <div>
      <TemplateComponent storeId={searchParams.id} />
    </div>
  );
}
