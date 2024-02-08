import { ReactNode } from "react";
import type { Metadata } from "next";
import { Source_Sans_3 as SourceSans3 } from "next/font/google";

import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/context/ThemeProvider";

const font = SourceSans3({
  subsets: ["latin"],
  variable: "--font-source-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hipnode-devtaehong.vercel.app/"),
  title: "Hipnode",
  description: "Social Media Platform",
  openGraph: {
    title: "Hipnode - Social Media Platform",
    description: "Social Media Platform",
    url: "https://hipnode-devtaehong.vercel.app/",
    siteName: "Hipnode",
    images: [
      {
        url: "/opengraph-image.png",
        width: 800,
        height: 600,
        alt: "Hipnode logo image",
      },
    ],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${font.className} bg-light-2_dark-2 overscroll-none`}>
        <ClerkProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
