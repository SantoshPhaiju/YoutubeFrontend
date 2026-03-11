import RootClientLayout from "@/components/root-client-layout";
import { inter, roboto, robotoCondensed } from "@/fonts";
import type { Metadata } from "next";
import React from "react";
import "./globals.css";
import { TanstackProvider } from "@/providers/TanstackProvider";
import {Toaster} from "sonner";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "(23) Youtube",
  description: "youtube.com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${robotoCondensed.variable} ${roboto.variable} ${roboto.className} antialiased`}
      >

      <TanstackProvider>
        <RootClientLayout>{children}</RootClientLayout>
          <Toaster />
      </TanstackProvider>
      </body>
    </html>
  );
}
