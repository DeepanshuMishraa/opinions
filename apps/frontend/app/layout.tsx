import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Appbar from "@/components/Appbar";
import { Toaster } from "sonner";
import QueryProvider from "./query-provider";

const OpenSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
})
export const metadata: Metadata = {
  title: "Opinion",
  description: "Opinion is a platform for sharing your opinions with the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${OpenSans.className} antialiased`}
      >
        <QueryProvider>
          <Toaster />
          <Appbar />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
