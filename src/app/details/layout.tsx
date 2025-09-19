"use client";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

interface Props {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />

      <main className="flex-1 mt-16">{children}</main>

      <Footer />
    </div>
  );
}
