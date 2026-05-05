import React from 'react';

export default function HomeGeo({ t }: { t: any }) {
  if (!t.homeNew) return null;

  return (
    <section className="py-24 bg-[#0a0f1c] relative overflow-hidden border-t border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] opacity-5 bg-no-repeat bg-center bg-contain pointer-events-none"></div>
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">{t.homeNew.geoTitle}</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">{t.homeNew.geoSubtitle}</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-[#0f172a]/80 backdrop-blur-sm p-6 rounded-3xl border border-white/5 text-center group hover:border-blue-500/30 transition-all">
            <div className="text-4xl mb-4">🌍</div>
            <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{t.homeNew.geoAfrica}</h3>
          </div>
          <div className="bg-[#0f172a]/80 backdrop-blur-sm p-6 rounded-3xl border border-white/5 text-center group hover:border-emerald-500/30 transition-all">
            <div className="text-4xl mb-4">🌎</div>
            <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">{t.homeNew.geoLatam}</h3>
          </div>
          <div className="bg-[#0f172a]/80 backdrop-blur-sm p-6 rounded-3xl border border-white/5 text-center group hover:border-purple-500/30 transition-all">
            <div className="text-4xl mb-4">🌏</div>
            <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">{t.homeNew.geoAsia}</h3>
          </div>
          <div className="bg-[#0f172a]/80 backdrop-blur-sm p-6 rounded-3xl border border-white/5 text-center group hover:border-yellow-500/30 transition-all">
            <div className="text-4xl mb-4">🕌</div>
            <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">{t.homeNew.geoMena}</h3>
          </div>
        </div>
      </div>
    </section>
  );
}