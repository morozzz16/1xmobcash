'use client';

import React, { useState } from 'react';

export default function FAQ({ t }: { t: any }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": t.faq.items.map((item: { q: string, a: string }) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  return (
    <section className="py-20 border-t border-white/5 relative overflow-hidden bg-[#070b14]">
      
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} 
      />

      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <h2 className="text-3xl lg:text-4xl font-black text-center text-white mb-12 tracking-tight">
          {t.faq.title}
        </h2>
        
        <div className="space-y-4">
          {t.faq.items.map((item: { q: string, a: string }, index: number) => {
            const isOpen = openIndex === index;
            
            return (
              <div 
                key={index} 
                className={`border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'bg-[#0f172a]/80 shadow-[0_0_30px_rgba(37,99,235,0.1)]' : 'bg-[#0f172a]/40 hover:bg-[#0f172a]/60'}`}
              >
                <button 
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none"
                >
                  <span className={`font-bold pr-8 transition-colors ${isOpen ? 'text-blue-400' : 'text-slate-200'}`}>
                    {item.q}
                  </span>
                  <span className={`text-2xl text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-45 text-blue-400' : ''}`}>
                    +
                  </span>
                </button>
                
                <div 
                  id={`faq-answer-${index}`}
                  className={`px-6 overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-slate-400 leading-relaxed text-sm sm:text-base border-t border-white/5 pt-4">
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}