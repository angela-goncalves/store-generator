import NextLogo from "./NextLogo";
import SupabaseLogo from "./SupabaseLogo";

export default function Header() {
  return (
    <div className="flex flex-col gap-16 items-center max-w-[500px]">
      <div className="flex flex-col gap-4 justify-center items-center">
        <h3 className="text-2xl"> Welcome to </h3>
        <h1 className="text-4xl">Store Generator</h1>
        <p className="text-2xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
          The easiest way to build web sites with AI
        </p>
      </div>
      <div className="w-full p-[2px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
