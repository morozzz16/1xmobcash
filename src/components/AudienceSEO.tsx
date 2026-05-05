import React from 'react';

export default function AudienceSEO({ t }: { t: any }) {
  if (!t.audience) return null;

  const icons = [
    // 1. Webmasters
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>,
    // 2. Influencers
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>,
    // 3. Local Agents
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
  ];

  return (
    <section className="py-24 border-t border-white/5 relative overflow-hidden bg-[#070b14]">
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl lg:text-4xl font-black text-center text-white mb-20 tracking-tight">
          {t.audience.title}
        </h2>
        
        <div className="grid md:grid-cols-3 gap-12 lg:gap-8 max-w-6xl mx-auto">
          {t.audience.items.map((item: { title: string, desc: string }, index: number) => (
            <div key={index} className="flex flex-col items-start relative p-6 bg-[#0f172a]/30 rounded-3xl border border-white/5 group hover:bg-[#0f172a]/60 transition-colors">
              
              {/* Цифра */}
              <div className="absolute -top-10 -right-4 text-9xl font-black text-white/[0.03] select-none group-hover:text-blue-500/[0.05] transition-colors">
                {index + 1}
              </div>
              
              {/* Плашка с иконкой */}
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-700 text-white rounded-xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(16,185,129,0.3)] relative z-10 group-hover:scale-110 transition-transform">
                {icons[index % icons.length]}
              </div>
              
              <h3 className="text-xl font-bold text-white mb-4 relative z-10">
                {item.title}
              </h3>
              <p className="text-slate-400 leading-relaxed text-sm relative z-10">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}