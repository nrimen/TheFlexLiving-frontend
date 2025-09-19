"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#284e4c] text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p className="text-sm">&copy; {new Date().getFullYear()} The Flex . All rights reserved.</p>
        </div>

        <div className="flex space-x-4">
          <Link href="/" className="hover:text-gray-300 text-sm">
            Home
          </Link>
          <Link href="/listings" className="hover:text-gray-300 text-sm">
            Listings
          </Link>
          <Link href="/reviews" className="hover:text-gray-300 text-sm">
            Reviews
          </Link>
          <Link href="/contact" className="hover:text-gray-300 text-sm">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
