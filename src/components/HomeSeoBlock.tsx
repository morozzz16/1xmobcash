'use client';

import React, { useState } from 'react';

export default function HomeSeoBlock({ t }: { t: any }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const s = t.seoBlock;

  return (
    <section className="py-16 border-t border-white/5 bg-[#04070b] relative z-10">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" data-aos="fade-up">
        
        <div 
          className={`relative transition-all duration-700 ease-in-out ${
            isExpanded ? 'max-h-[3000px]' : 'max-h-[280px] overflow-hidden'
          }`}
        >
          <div className="prose prose-sm md:prose-base prose-invert max-w-none text-slate-400">
            <h2 className="text-2xl font-bold text-white mb-4">{s.title1}</h2>
            <p className="mb-4">{s.p1}</p>
            
            <h3 className="text-xl font-bold text-white mt-8 mb-3">{s.title2}</h3>
            <p className="mb-4">{s.p2}</p>
            <ul className="list-disc pl-5 mb-6 space-y-2 text-slate-400">
              <li>{s.li2_1}</li>
              <li>{s.li2_2}</li>
              <li>{s.li2_3}</li>
            </ul>

            <h3 className="text-xl font-bold text-white mt-8 mb-3">{s.title3}</h3>
            <p className="mb-4">{s.p3}</p>
            <ul className="list-disc pl-5 mb-6 space-y-2 text-slate-400">
              <li>{s.li3_1}</li>
              <li>{s.li3_2}</li>
              <li>{s.li3_3}</li>
            </ul>

            <p className="mt-8 text-[10px] sm:text-xs text-slate-600 leading-relaxed italic">
              {s.disclaimer}
            </p>
          </div>

          {!isExpanded && (
            <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#04070b] via-[#04070b]/90 to-transparent pointer-events-none"></div>
          )}
        </div>

        <div className="mt-8 text-center relative z-20">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border border-white/10 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold transition-all shadow-xl hover:-translate-y-0.5 active:scale-95"
          >
            {isExpanded ? (s.readLess || 'Read Less') : (s.readMore || 'Read More')}
            <svg
              className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}