export default function Header({ usermail }: { usermail: string }) {
  return (
    <div className="flex flex-col gap-16 items-center max-w-[500px]">
      <div className="flex flex-col gap-4 justify-center items-center">
        <h3 className="text-2xl"> Welcome to </h3>
        {usermail ? <p>{usermail}</p> : <></>}
        <h1 className="text-4xl">Store Generator</h1>
        <p className="text-2xl !leading-tight mx-auto max-w-xl text-center">
          The easiest way to build web sites with AI
        </p>
      </div>
    </div>
  );
}
