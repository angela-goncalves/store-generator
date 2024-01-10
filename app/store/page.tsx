import TemplateComponent from "@/components/store";

export default function Store({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  return (
    <div className="w-[calc(100%-180px)]">
      <TemplateComponent storeId={searchParams.id} storeForUser={false} />
    </div>
  );
}
