'use client';

import { Plus } from "lucide-react";

export default function FloatingActionButton() {
  return (
    <button
      aria-label="Create new item"
      className="
        fixed bottom-6 right-6
        w-14 h-14
        rounded-full
        bg-violet-600 hover:bg-violet-700
        text-white
        flex items-center justify-center
        shadow-lg
        transition
        hover:scale-105
        active:scale-95
      "
    >
      <Plus size={22} />
    </button>
  );
}