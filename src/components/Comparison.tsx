import React from 'react';

// Добавляем onSelectRole в пропсы
export default function Comparison({ t, onSelectRole }: { t: any, onSelectRole: (role: string) => void }) {
  return (
    <section className="py-20 border-t border-white/5 relative overflow-hidden">
      
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-[rgb(20,160,255)]/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl lg:text-4xl font-black text-center text-white mb-16 tracking-tight">
          {t.comparison.title}
        </h2>
        
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          
          {/* Карточка 1: Агент (КЛИКАБЕЛЬНАЯ) */}
          <div 
            onClick={() => onSelectRole('agent')}
            className="group cursor-pointer bg-[#0f172a]/80 backdrop-blur-md border-2 border-emerald-500/40 rounded-3xl p-8 shadow-[0_0_40px_rgba(16,185,129,0.1)] relative transition-all duration-300 hover:shadow-[0_0_60px_rgba(16,185,129,0.3)] hover:-translate-y-2 active:scale-95"
          >
            <div className="absolute top-0 right-8 -translate-y-1/2 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white text-xs font-bold uppercase tracking-widest py-1.5 px-4 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.4)] group-hover:scale-105 transition-transform">
              Local / Cash
            </div>
            <div className="w-14 h-14 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-500/30 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h3 className="text-2xl font-black text-emerald-400 mb-4">{t.comparison.agentTitle}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3"><span className="text-emerald-500 font-bold mt-0.5">✓</span><span className="text-slate-200 font-medium">{t.comparison.agentRole}</span></li>
              <li className="flex items-start gap-3"><span className="text-emerald-500 font-bold mt-0.5">✓</span><span className="text-slate-200 font-medium">{t.comparison.agentComm}</span></li>
              <li className="flex items-start gap-3"><span className="text-emerald-500 font-bold mt-0.5">✓</span><span className="text-slate-200 font-medium">{t.comparison.agentTools}</span></li>
            </ul>
          </div>

          {/* Карточка 2: Партнер (КЛИКАБЕЛЬНАЯ) */}
          <div 
            onClick={() => onSelectRole('partner')}
            className="group cursor-pointer bg-[#0f172a]/80 backdrop-blur-md border-2 border-[rgb(20,160,255)]/40 rounded-3xl p-8 shadow-[0_0_40px_rgba(20,160,255,0.1)] relative transition-all duration-300 hover:shadow-[0_0_60px_rgba(20,160,255,0.3)] hover:-translate-y-2 active:scale-95"
          >
            <div className="absolute top-0 right-8 -translate-y-1/2 bg-[rgb(20,160,255)] text-white text-xs font-bold uppercase tracking-widest py-1.5 px-4 rounded-full shadow-[0_0_15px_rgba(20,160,255,0.4)] group-hover:scale-105 transition-transform">
              Online Traffic
            </div>
            <div className="w-14 h-14 bg-[rgb(20,160,255)]/20 border border-[rgb(20,160,255)]/30 text-[rgb(20,160,255)] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[rgb(20,160,255)]/30 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
            </div>
            <h3 className="text-2xl font-black text-[rgb(20,160,255)] mb-4">{t.comparison.partnerTitle}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3"><span className="text-[rgb(20,160,255)] font-bold mt-0.5">✓</span><span className="text-slate-200 font-medium">{t.comparison.partnerRole}</span></li>
              <li className="flex items-start gap-3"><span className="text-[rgb(20,160,255)] font-bold mt-0.5">✓</span><span className="text-slate-200 font-medium">{t.comparison.partnerComm}</span></li>
              <li className="flex items-start gap-3"><span className="text-[rgb(20,160,255)] font-bold mt-0.5">✓</span><span className="text-slate-200 font-medium">{t.comparison.partnerTools}</span></li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}