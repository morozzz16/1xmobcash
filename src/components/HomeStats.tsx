import React from 'react';

export default function HomeStats({ t }: { t: any }) {
  if (!t.homeNew) return null;
  
  return (
<section className="py-12 border-y border-white/5 bg-[#0a0f1c]/80 relative z-20">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/5">
          
          {/* Статистика 1 */}
          <div data-aos="fade-up" data-aos-delay="0">
            <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 mb-2">{t.homeNew.stat1}</div>
            <div className="text-sm text-slate-400 uppercase tracking-wider font-bold">{t.homeNew.stat1Lbl}</div>
          </div>
          
          {/* Статистика 2 */}
          <div data-aos="fade-up" data-aos-delay="100">
            <div className="text-4xl md:text-5xl font-black text-white mb-2">{t.homeNew.stat2}</div>
            <div className="text-sm text-slate-400 uppercase tracking-wider font-bold">{t.homeNew.stat2Lbl}</div>
          </div>
          
          {/* Статистика 3 */}
          <div data-aos="fade-up" data-aos-delay="200">
            <div className="text-4xl md:text-5xl font-black text-white mb-2">{t.homeNew.stat3}</div>
            <div className="text-sm text-slate-400 uppercase tracking-wider font-bold">{t.homeNew.stat3Lbl}</div>
          </div>
          
          {/* Статистика 4 */}
          <div data-aos="fade-up" data-aos-delay="300">
            <div className="text-4xl md:text-5xl font-black text-white mb-2">{t.homeNew.stat4}</div>
            <div className="text-sm text-slate-400 uppercase tracking-wider font-bold">{t.homeNew.stat4Lbl}</div>
          </div>
          
        </div>
      </div>
    </section>
  );
}