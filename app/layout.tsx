import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Metadata } from "next";
import vector from "./public/vector.png";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

let title = "Store Generator";
let description = "Build your own store";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(defaultUrl),
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="" suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <main className="min-h-screen">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </main>
      </body>
    </html>
  );
}
