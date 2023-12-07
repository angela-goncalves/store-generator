"use client";
import { useSearchParams } from "next/navigation";

// Error components must be Client Components

export default function ErrorCollectionsPage({
  error,
  reset,
}: {
  searchparams: { message: string };
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("message");
  return (
    <div className="flex flex-col justify-center items-center">
      <h1>Something went wrong!</h1>
      <h2>{errorMessage}</h2>
      <h3>{error.message}</h3>

      <button
        className="m-4 p-4 border rounded-lg border-gray-300"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }>
        Try again
      </button>
    </div>
  );
}
