'use client';
import React from 'react';
import { Spinner } from '@heroui/react';
import { Pulse } from '@gravity-ui/icons';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-950 via-green-950 to-zinc-950 flex flex-col items-center justify-center text-center">
      <div className="relative flex flex-col items-center justify-center space-y-4">
        
        {/* Glowing Background Effect */}
        <div className="absolute w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl animate-pulse -z-10" />

       {/* Loader Component */}
        <div className="relative p-6 flex items-center justify-center">
          
          {/* Spinner */}
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 rounded-full border-2 border-gray-700"></div>

            <div className="absolute inset-0 rounded-full border-2 border-t-emerald-400 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>

            <div className="absolute inset-0 rounded-full border-2 border-b-emerald-500 border-t-transparent border-l-transparent border-r-transparent animate-spin-slow"></div>
          </div>

          {/* Center Pulse Icon */}
          <div className="absolute flex items-center justify-center">
            <div className="w-6 h-6 text-emerald-400 animate-ping">
              ●
            </div>
          </div>
        </div>

        {/* Branding & Subtext */}
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-zinc-100">
            hireloop
          </h2>
          <p className="text-xs text-emerald-400/60 font-medium tracking-widest uppercase">
            Connecting Talent...
          </p>
        </div>

      </div>
    </div>
  );
}