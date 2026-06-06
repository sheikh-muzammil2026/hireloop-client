"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const { 
        data: session
    } = authClient.useSession() 
  
  const user = session?.user;


  const handleSignOut = async () => {
    await authClient.signOut();
    router.push('/auth/signin')
  };

 
  const navLinks = [
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Companies", href: "/companies" },
    { label: "Pricing", href: "/pricing" },
    { label: "Dashboard", href: "/dashboard/recruiter" }, 
    // apatotp dashboard mane recruiter dashboard
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0B0B0F]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* লোগো সেকশন */}
        <Link href="/" >
        <Image
        width={160}
        height={160}
        alt="logo image"
        src="/logo.png"
        
        />

        </Link>

        {/* ডানপাশ (ডেস্কটপ মেনু এবং মোবাইল টগল বাটন) */}
        <div className="flex items-center gap-4">
          
          {/* ডেস্কটপ মেনু (MD স্ক্রিন থেকে দেখাবে) */}
          <div className="hidden items-center gap-6 md:flex">
            
            {/* নেভ লিংকসমূহ */}
            <ul className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-2">
              {navLinks.map((link) => 
                
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="rounded-full px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                
              )}
            </ul>

            {/* ভার্টিকাল ডিভাইডার */}
            <div className="h-6 w-px bg-white/20" />

            {/* অথেনটিকেশন ও প্রোফাইল সেকশন */}
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-300">
                    Hi, <span className="text-white font-semibold">{user?.name}</span>
                    
                  </div>
                  <Button 
                    onClick={handleSignOut}
                    variant="ghost"
                    className="border-white/10 text-gray-300 hover:bg-white/5 hover:text-white"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/signin"
                    className="text-sm font-medium text-blue-500 transition hover:text-violet-300"
                  >
                    Sign In
                  </Link>
                  <Link href="/auth/signup">
                  <Button
                    as={Link}
                    radius="lg"
                    variant="primary"
                  
                  >
                    Get Started
                  </Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* মোবাইল মেনু বাটন (হ্যামবার্গার আইকন) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center justify-center rounded-lg p-2 text-white transition hover:bg-white/10 md:hidden"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

        </div>
      </div>

      {/* মোবাইল রেসপনসিভ ড্রপডাউন মেনু */}
      {isMenuOpen && (
        <div className="border-t border-white/10 bg-[#0B0B0F] md:hidden">
          <div className="space-y-3 px-4 py-6">
            
            {/* মোবাইল নেভ লিংকসমূহ */}
            <ul className="space-y-2">
              {navLinks.map((link) => 
                 (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="block rounded-xl px-4 py-3 text-base font-medium text-gray-300 transition hover:bg-white/5 hover:text-white"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              )}
            </ul>

            {/* মোবাইল অথেনটিকেশন অংশ */}
            <div className="border-t border-white/10 pt-4">
              <div className="flex flex-col gap-3">
                {user ? (
                  <>
                    <div className="px-4 py-2 text-gray-400 text-sm flex flex-col gap-1">
                      <span>Signed in as: <strong className="text-white">{user?.name}</strong></span>
                      <span className="self-start text-xs bg-violet-500/20 border border-violet-500/30 text-violet-400 px-2 py-0.5 rounded-full capitalize">
                        {user?.role.replace("_", " ")}
                      </span>
                    </div>
                    <Link href='/auth/signup'>
                    <Button 
                      onClick={handleSignOut} 
                      color="danger"
                      variant="flat"
                      className="w-full text-base font-medium py-6"
                    >
                      Sign Out
                    </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth/signin"
                      className="rounded-xl px-4 py-3 text-base font-medium text-violet-400 transition hover:bg-white/5"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Button
                      as={Link}
                      href="/auth/signup"
                      className="bg-white font-semibold text-black py-6 text-base"
                      radius="lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Get Started
                    </Button>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      )}
    </nav>
  );
}