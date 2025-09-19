"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LucideMenu, LucideX, LucideUser, LucideHome, LucideSettings } from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  const navItems = [
    { label: "Client App", icon: <LucideHome size={20} />, action: () => router.push("/client") },
    { label: "Settings", icon: <LucideSettings size={20} />, action: () => router.push("/admin/settings") },
  ];

  return (
    <div className="flex h-screen">
      <div
        className={`transition-all duration-300 flex flex-col h-full ${
          isOpen ? "w-64" : "w-16"
        } bg-[#284e4c] text-white shadow-lg`}
      >

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 m-2 rounded hover:bg-[#1f3b3a] focus:outline-none flex items-center justify-center"
          aria-label="Toggle sidebar"
        >
          {isOpen ? <LucideX size={20} /> : <LucideMenu size={20} />}
        </button>

        <div className="flex items-center justify-center mt-4 mb-6">
          {isOpen ? (
            <img src="/images/theflex.webp" alt="Logo" className="h-12 w-auto" />
          ) : (
            <img src="/images/theflex.png" alt="Logo" className="h-8 w-auto" />
          )}
        </div>

        <nav className="flex-1 px-2">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-md hover:bg-[#1f3b3a] transition-colors ${
                !isOpen && "justify-center"
              }`}
            >
              {item.icon}
              {isOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2 px-4 py-2 mt-auto mb-6">
          <LucideUser size={24} />
          {isOpen && <span className="font-semibold">Admin</span>}
        </div>
      </div>
    </div>
  );
}
