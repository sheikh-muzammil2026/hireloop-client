'use client';
import React from 'react';
import { Button } from '@heroui/react';
import { CircleQuestion } from '@gravity-ui/icons';
import { ArrowLeft } from '@gravity-ui/icons';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-950 via-green-950 to-zinc-950 flex flex-col items-center justify-center text-center px-4 selection:bg-emerald-500 selection:text-white">
      <div className="space-y-6 max-w-md">
        {/* Icon & Brand */}
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <CircleQuestion className="w-20 h-20 text-emerald-400 opacity-80" />
          <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase">
            Hireloop Security
          </span>
        </div>

        {/* Text Content */}
        <div className="space-y-2">
          <h1 className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-green-500">
            404
          </h1>
          <h2 className="text-2xl font-bold text-zinc-100">
            লুপের বাইরে চলে গেছেন!
          </h2>
          <p className="text-sm text-emerald-200/70">
            দুঃখিত, আপনি যে পেজটি খুঁজছেন তা আমাদের `Hireloop` নেটওয়ার্কে খুঁজে পাওয়া যায়নি। সম্ভবত এটি সরিয়ে ফেলা হয়েছে।
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <Button
            onPress={() => router.push('/')}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium shadow-lg shadow-emerald-900/40 px-6 py-2 rounded-xl transition-all duration-300"
            startContent={<ArrowLeft className="w-4 h-4" />}
          >
            হোম পেজে ফিরে যান
          </Button>
        </div>
      </div>
    </div>
  );
}