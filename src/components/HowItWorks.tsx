import React from 'react';

export default function HowItWorks({ t }: { t: any }) {
  return (
    <section className="container mx-auto px-4 py-20 relative z-10 border-t border-white/5">
      <h2 className="text-3xl lg:text-4xl font-black text-center text-white mb-16 tracking-tight">
        {t.howItWorks.title}
      </h2>
      
      <div className="grid md:grid-cols-3 gap-8 relative">
        {/* Линия */}
        <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-blue-900 via-blue-500 to-emerald-900 opacity-40 -z-10"></div>

        {/* Шаг 1 */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[#0f172a] border border-blue-500/30 text-blue-400 flex items-center justify-center text-2xl font-black shadow-[0_0_30px_rgba(37,99,235,0.15)]">
            1
          </div>
          <h3 className="text-xl font-bold text-white">{t.howItWorks.step1Title}</h3>
          <p className="text-slate-400 leading-relaxed">{t.howItWorks.step1Desc}</p>
        </div>

        {/* Шаг 2 */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl font-black shadow-[0_0_30px_rgba(37,99,235,0.4)] border border-blue-400/50">
            2
          </div>
          <h3 className="text-xl font-bold text-white">{t.howItWorks.step2Title}</h3>
          <p className="text-slate-400 leading-relaxed">{t.howItWorks.step2Desc}</p>
        </div>

        {/* Шаг 3 */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500 text-slate-900 flex items-center justify-center text-2xl font-black shadow-[0_0_30px_rgba(16,185,129,0.3)] border border-emerald-400">
            3
          </div>
          <h3 className="text-xl font-bold text-white">{t.howItWorks.step3Title}</h3>
          <p className="text-slate-400 leading-relaxed">{t.howItWorks.step3Desc}</p>
        </div>
      </div>
    </section>
  );
}