"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { signIn, signUp } from "@/lib/auth";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/BackButton";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string; signin: string };
}) {
  const [viewPassword, setViewPassword] = useState(false);
  const [valueEmail, setValueEmail] = useState("");

  return (
    <div className="flex-1 flex flex-col w-full mx-8 justify-center h-full">
      <BackButton href="/" />

      {searchParams.signin !== "true" ? (
        <div className="flex gap-1 self-center mt-20 mb-10">
          <h3>If you already have an account</h3>
          <Link
            href="/login?signin=true"
            className="underline underline-offset-4">
            sign in
          </Link>
        </div>
      ) : (
        <div className="flex gap-1 self-center mt-20 mb-10">
          <h3>If you don't have an account yet</h3>
          <Link
            href="/login?signin=false"
            className="underline underline-offset-4">
            sign up
          </Link>
        </div>
      )}
      <form
        className="opacity-0 animate-in bg-white p-6 rounded-lg max-w-[500px] mb-10 flex flex-col w-full self-center justify-center text-foreground"
        action={signIn}>
        <div className="mb-6">
          <label className="text-md" htmlFor="email">
            Email
          </label>
          <Input
            type="email"
            required
            name="email"
            className="mt-2 bg-secondary"
            placeholder="you@example.com"
          />
        </div>
        <div className="relative mb-10">
          <Button
            onClick={() => setViewPassword(!viewPassword)}
            type="button"
            className="absolute right-0 bottom-0 bg-transparent hover:bg-transparent">
            {viewPassword ? (
              <EyeIcon className="stroke-accent" />
            ) : (
              <EyeOffIcon className="stroke-accent" />
            )}
          </Button>
          <label className="text-md" htmlFor="password">
            Password
          </label>
          <Input
            type={viewPassword ? "text" : "password"}
            name="password"
            required
            value={valueEmail}
            className="mt-2 bg-secondary"
            placeholder="••••••••"
            onChange={(e) => setValueEmail(e.target.value)}
          />
        </div>

        {searchParams.signin === "true" ? (
          <button className="border border-primary rounded-md px-4 py-2 text-primary-foreground mb-2">
            Sign In
          </button>
        ) : (
          <button
            formAction={signUp}
            className="border border-primary rounded-md px-4 py-2 text-foreground mb-2">
            Sign Up
          </button>
        )}

        {searchParams?.message && (
          <p className="mt-4 p-4 text-red-600 text-center">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  );
}
