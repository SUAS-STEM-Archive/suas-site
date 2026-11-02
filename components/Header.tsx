"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import SiteSearch from "@/components/SiteSearch";

type NavLink = { href: string; label: string };

const SITE_LINKS: NavLink[] = [
  { href: "/team", label: "Team" },
  { href: "/gallery", label: "Gallery" },
  { href: "/aircraft", label: "Aircraft" },
  { href: "/sponsor", label: "Contact" },
];

export default function Navbar(): React.ReactElement {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const links = SITE_LINKS;
  const mobileLinks = [{ href: "/", label: "Home" }, ...links];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 900);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <nav className="relative flex h-30 w-full items-center border-b border-gray-800 font-sans">
      {!isMobile && (
        <div className="fixed right-6 top-10 z-50">
          <SiteSearch />
        </div>
      )}
      <div className="mx-auto max-w-6xl px-4">
        {isMobile ? (
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold tracking-tight">
              <Image src="/logo.png" alt="SUAS Logo" width={150} height={68} />
            </Link>
            <button onClick={() => setIsMenuOpen((open) => !open)} className="text-white focus:outline-none" aria-label="Toggle menu">
              <div className="flex h-6 w-12 flex-col items-center justify-center">
                <span className={`block h-0.5 w-5 bg-white transition-transform duration-300 ${isMenuOpen ? "translate-y-0.5 rotate-45" : "-translate-y-1"}`} />
                <span className={`block h-0.5 w-5 bg-white transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100"}`} />
                <span className={`block h-0.5 w-5 bg-white transition-transform duration-300 ${isMenuOpen ? "-translate-y-0.5 -rotate-45" : "translate-y-1"}`} />
              </div>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-3 items-center py-4">
            <div className="flex items-center justify-start gap-10">
              {links.slice(0, 2).map((link) => <Link key={link.href} href={link.href} className="text-md font-medium hover:underline">{link.label}</Link>)}
            </div>
            <div className="mx-5 flex justify-center">
              <Link href="/" className="text-xl font-bold tracking-tight">
                <Image src="/logo.png" alt="SUAS Logo" width={200} height={90} />
              </Link>
            </div>
            <div className="flex items-center justify-end gap-10">
              {links.slice(2).map((link) => <Link key={link.href} href={link.href} className="text-md font-medium hover:underline">{link.label}</Link>)}
            </div>
          </div>
        )}
        {isMobile && isMenuOpen && (
          <div className="absolute left-0 top-full z-50 w-full border-b border-gray-800 bg-black px-4 py-4">
            <div className="flex flex-col gap-4">
              {mobileLinks.map((link) => <Link key={link.href} href={link.href} className="text-md font-medium hover:underline" onClick={() => setIsMenuOpen(false)}>{link.label}</Link>)}
              <SiteSearch />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
