import { ReactNode } from "react";
import Nav from "@/components/Nav";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav />
      {children}
    </>
  );
}
