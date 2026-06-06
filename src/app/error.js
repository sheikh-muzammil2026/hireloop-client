'use client';
import React, { useEffect } from 'react';
import { Button } from '@heroui/react';
import { Gear } from '@gravity-ui/icons';
import { LuRefreshCw } from 'react-icons/lu';

export default function Error({ error, reset }) {
  useEffect(() => {
    // আপনি চাইলে এখানে Sentry বা অন্য কোনো টুলে এরর লগ করতে পারেন
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-950 via-green-950 to-zinc-950 flex flex-col items-center justify-center text-center px-4">
      <div className="space-y-6 max-w-md p-8 rounded-2xl bg-emerald-950/40 border border-emerald-500/10 backdrop-blur-md shadow-2xl">
        {/* Animated Icon */}
        <div className="inline-flex p-4 rounded-full bg-emerald-500/10 text-emerald-400 animate-spin [animation-duration:3s]">
          <Gear className="w-12 h-12" />
        </div>

        {/* Text Content */}
        <div className="space-y-2">
          <h1 className="text-5xl font-black text-emerald-400">500</h1>
          <h2 className="text-xl font-semibold text-zinc-200">
            কিছু একটা সমস্যা হয়েছে!
          </h2>
          <p className="text-xs text-emerald-200/60 leading-relaxed">
            `Hireloop` সার্ভারে সাময়িক ত্রুটি দেখা দিয়েছে। আমাদের টিম এটি ঠিক করার জন্য কাজ করছে।
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Button
            onPress={() => reset()}
            className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-semibold px-8 py-2 rounded-xl shadow-md transition-all"
            startContent={ <LuRefreshCw className="w-4 h-4" /> }
          >
            আবার চেষ্টা করুন
          </Button>
        </div>
      </div>
    </div>
  );
}