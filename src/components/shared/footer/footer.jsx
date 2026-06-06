"use client";

import { LogoFacebook, LogoLinkedin } from "@gravity-ui/icons";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/react";

export default function Footer() {
  
  const productLinks = [
    { label: "Job discovery", href: "/jobs", show: true },
    { label: "Worker AI", href: "/worker-ai", show: true },
    { label: "Companies", href: "/companies", show: true },
    { label: "Salary data", href: "/salary", show: true },
  ];

  const navigationLinks = [
    { label: "Help center", href: "/help", show: true },
    { label: "Career library", href: "/career-library", show: true },
    { label: "Contact", href: "/contact", show: true },
  ];

  const resourceLinks = [
    { label: "Brand Guideline", href: "/brand", show: true },
    { label: "Newsroom", href: "/newsroom", show: true },
  ];

  return (
    <div className="w-full bg-[#0B0B0F] text-gray-400 font-sans">
      
      {/* ================= 1. UPPER CTA SECTION (WITH BG IMAGE) ================= */}
      <section className="relative w-full pt-28 pb-20 overflow-hidden px-4 text-center">
        
        {/* BACKGROUND IMAGE WITH PURPLE GLOW */}
        <div className="absolute inset-x-0 top-0 flex justify-center opacity-90 mix-blend-screen pointer-events-none z-0">
          <div className="relative h-[450px] w-full max-w-6xl sm:h-[600px]">
            {/* ইমেজের ব্যাকগ্রাউন্ড গ্লো */}
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/20 via-transparent to-transparent blur-[120px]" />
            
            <Image
              src="/cta-bg.png" 
              alt="Grid Globe Background"
              fill
              priority
              className="object-contain object-top scale-110 sm:scale-125"
            />
          </div>
        </div>

        {/* CTA CONTENT AREA */}
        <div className="relative z-10 mx-auto max-w-3xl space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-5xl leading-tight">
            Your next role is <br /> already looking for you
          </h2>
          <p className="mx-auto max-w-xl text-xs sm:text-sm text-gray-400/80 font-normal leading-relaxed">
            Build a profile in three minutes. The matches start arriving tomorrow morning.
          </p>

          {/* CTA BUTTONS */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button
              radius="full"
              className="bg-white text-black font-semibold text-xs px-6 h-10 hover:bg-gray-200 transition-colors shadow-lg"
            >
              Create a free account
            </Button>
            <Button
              radius="full"
              variant="bordered"
              className="border-white/10 bg-[#12121A]/40 text-white font-medium text-xs px-6 h-10 backdrop-blur-md hover:bg-white/5 transition-colors"
            >
              View pricing
            </Button>
          </div>
        </div>
      </section>


      {/* ================= 2. ACTUAL FOOTER SECTION ================= */}
      <footer className="relative border-t border-white/5 bg-[#0B0B0F] z-10">
        <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
          
          {/* UPPER SECTION: LOGO & LINKS */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
            
            {/* BRANDING COL */}
            <div className="md:col-span-5 lg:col-span-6 space-y-4">
              <Link href="/">
                <Image
                  width={120}
                  height={32}
                  alt="hireloop logo"
                  src="/logo.png"
                  className="object-contain"
                />
              </Link>
              <p className="max-w-xs text-xs sm:text-sm leading-relaxed text-gray-600">
                The AI-native career platform. Built for people who take their work seriously.
              </p>
            </div>

            {/* LINKS COLUMNS */}
            <div className="grid grid-cols-3 gap-4 md:col-span-7 lg:col-span-6">
              
              {/* PRODUCT */}
              <div>
                <h3 className="text-xs sm:text-sm font-semibold tracking-wider text-indigo-500/90">Product</h3>
                <ul className="mt-4 space-y-2.5">
                  {productLinks.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-xs sm:text-sm text-gray-500 transition hover:text-gray-300">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* NAVIGATIONS */}
              <div>
                <h3 className="text-xs sm:text-sm font-semibold tracking-wider text-indigo-500/90">Navigations</h3>
                <ul className="mt-4 space-y-2.5">
                  {navigationLinks.map((link) => 
                    link.show && (
                      <li key={link.label}>
                        <Link href={link.href} className="text-xs sm:text-sm text-gray-500 transition hover:text-gray-300">
                          {link.label}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* RESOURCES */}
              <div>
                <h3 className="text-xs sm:text-sm font-semibold tracking-wider text-indigo-500/90">Resources</h3>
                <ul className="mt-4 space-y-2.5">
                  {resourceLinks.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-xs sm:text-sm text-gray-500 transition hover:text-gray-300">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

          {/* BOTTOM SECTION: SOCIALS & COPYRIGHT */}
          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 sm:flex-row text-[11px] sm:text-xs text-gray-600">
            
            {/* SOCIAL ICONS (H0BUHU SCREENSHOT) */}
            <div className="flex items-center gap-2">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex h-7 w-7 items-center justify-center rounded bg-white/5 text-gray-500 transition hover:bg-white/10 hover:text-white"
              >
                <LogoFacebook className="h-3.5 w-3.5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex h-7 w-7 items-center justify-center rounded bg-indigo-600 text-white transition hover:bg-indigo-700"
              >
                <LogoLinkedin className="h-3.5 w-3.5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex h-7 w-7 items-center justify-center rounded bg-white/5 text-gray-500 transition hover:bg-white/10 hover:text-white"
              >
                <LogoLinkedin className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* COPYRIGHT & PRIVACY LINKS */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 sm:justify-end">
              <p>Copyright © 2026 — Programming Hero</p>
              <Link href="/terms" className="hover:text-gray-400 transition">Terms & Policy</Link>
              <Link href="/privacy" className="hover:text-gray-400 transition">Privacy Guideline</Link>
            </div>

          </div>

        </div>
      </footer>

    </div>
  );
}