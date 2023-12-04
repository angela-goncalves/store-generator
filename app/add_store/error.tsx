"use client";

export default function ErrorAddStore({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col justify-center items-center">
      <h2>Something went wrong!</h2>
      {error.message}
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
