import "./globals.css";
import { ReactNode } from "react";
import type { Metadata } from "next";
// eslint-disable-next-line
import { Source_Sans_3 } from "next/font/google";
import Nav from "@/components/Nav";

const font = Source_Sans_3({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HipNode",
  description: "Social Media Platform"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Nav />
        {children}
      </body>
    </html>
  );
}
