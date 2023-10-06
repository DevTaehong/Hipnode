import "../globals.css";
import { ReactNode } from "react";
import type { Metadata } from "next";
import { Source_Sans_3 as SourceSans3 } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import Nav from "@/components/Nav";
import { ThemeProvider } from "@/context/ThemeProvider";

const font = SourceSans3({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HipNode",
  description: "Social Media Platform",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={font.className}>
          <ThemeProvider>
            <Nav />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
