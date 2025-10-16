"use client";
import Link from "next/link";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white">
      <div className="w-full max-w-6xl mx-auto py-2 px-5 flex items-center justify-between">
        <Link
          href="/"
          className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800"
        >
          Mathai
        </Link>

        <nav className="hidden md:flex gap-6 text-gray-800">
          <Link href="/" className="hover:text-blue-600 transition">
            Solving Problems
          </Link>
          <Link href="/history" className="hover:text-blue-600 transition">
            History
          </Link>
          <Link href="/settings" className="hover:text-blue-600 transition">
            Settings
          </Link>
        </nav>

        <div className="hidden md:block w-10 h-10 bg-gray-400 rounded-full"></div>

        <button
          className="md:hidden text-gray-800"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-gray-50 border-t border-gray-200 px-5 py-3 flex flex-col gap-3">
          <Link
            href="/"
            className="hover:text-blue-600 transition"
            onClick={() => setMenuOpen(false)}
          >
            Solving Problems
          </Link>
          <Link
            href="/history"
            className="hover:text-blue-600 transition"
            onClick={() => setMenuOpen(false)}
          >
            History
          </Link>
          <Link
            href="/settings"
            className="hover:text-blue-600 transition"
            onClick={() => setMenuOpen(false)}
          >
            Settings
          </Link>
        </div>
      )}
    </header>
  );
}
