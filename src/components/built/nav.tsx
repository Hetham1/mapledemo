"use client";
import { useState } from "react";
import { HoveredLink, MenuItem } from "../ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbartop() {
  return (
    <div className="relative w-full flex items-center justify-center overflow-hidden">
      <Navbar className="top-1" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <motion.div
      className={cn(
        "fixed top-10 inset-x-0 max-w-2xl mx-auto z-50 overflow-visible hidden md:block",
        className
      )}
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ delay: 0, duration: 0.6, ease: "easeInOut" }}
      style={{ originX: 0.5 }}
    >
      <nav
        onMouseLeave={() => setActive(null)}
        className="relative rounded-full border border-white/[0.2] dark:bg-black dark:border-white/[0.2] bg-black shadow-input flex justify-center space-x-4 px-8 py-3"
      >
        {/* Direct Link to Home */}
        <Link href="/" className="text-white hover:opacity-90 cursor-pointer">
          Home
        </Link>
        <Link
          href="#pre-package"
          className="text-white hover:opacity-90 cursor-pointer"
        >
          Pre-Package
        </Link>{" "}
        <Link
          href="#custom-package"
          className="text-white hover:opacity-90 cursor-pointer"
        >
          Custom-Package
        </Link>{" "}
        <Link href="/#" className="text-white hover:opacity-90 cursor-pointer">
          Extra ...
        </Link>
      </nav>
    </motion.div>
  );
}
