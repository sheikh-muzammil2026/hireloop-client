import { Loader2 } from 'lucide-react';
import React from 'react';

const loading = () => {
    return (
        <div className="min-h-screen bg-[#0b0f19] flex flex-col items-center justify-center p-6">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
        <span className="text-sm text-slate-400 mt-3 font-medium animate-pulse">
          Decrypting job specifications...
        </span>
      </div>
    );
};

export default loading;