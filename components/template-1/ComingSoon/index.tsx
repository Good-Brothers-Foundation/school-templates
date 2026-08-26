"use client";

import { Compass, Sparkles } from "lucide-react";
import AppButton from "../AppButton";

export default function ComingSoon() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#FFF9EA] px-6 py-24 font-quicksand relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-orange-100 rounded-full blur-xl opacity-70 animate-pulse" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-100 rounded-full blur-xl opacity-70 animate-pulse" />

      <div className="max-w-md w-full text-center relative z-10">
        {/* Playful Icon container */}
        <div className="mx-auto w-24 h-24 bg-gradient-warm rounded-[2rem] flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300 mb-8">
          <Compass className="h-12 w-12 text-white animate-spin-slow" />
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles size={12} /> Under Construction
        </span>

        <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight leading-tight mb-4">
          Sprouting Soon!
        </h1>

        <p className="text-slate-600 text-base leading-relaxed mb-10 max-w-sm mx-auto">
          Our teachers and little helpers are busy building this page. We&apos;ll be ready to share this adventure very soon!
        </p>

        <div className="flex justify-center">
          <AppButton type="primary" icon href="/template-1">
            Back to Home
          </AppButton>
        </div>
      </div>
    </div>
  );
}
