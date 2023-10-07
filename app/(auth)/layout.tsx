import React from "react";

import "../globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";
import { Source_Sans_3 as SourceSans3 } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeProvider";

const font = SourceSans3({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HipNode",
  description: "Social Media Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${font.className} flex overscroll-none`}>
          <ThemeProvider>{children}</ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
